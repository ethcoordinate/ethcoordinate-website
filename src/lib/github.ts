import { unstable_cache } from "next/cache";

const GITHUB_API_BASE = "https://api.github.com";
const PM_REPO_OWNER = "ethereum";
const PM_REPO_NAME = "pm";

interface GitHubFile {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
  html_url: string;
}

interface GitHubContent {
  content: string;
  encoding: string;
  html_url: string;
}

async function fetchFromGitHub<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "EthCoordinate-Website",
  };

  // Add auth token if available (for higher rate limits)
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Fetch and cache the PM repo README
export const getPMRepoReadme = unstable_cache(
  async (): Promise<string> => {
    try {
      const data = await fetchFromGitHub<GitHubContent>(
        `/repos/${PM_REPO_OWNER}/${PM_REPO_NAME}/readme`
      );

      // Decode base64 content
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      return content;
    } catch (error) {
      console.error("Failed to fetch PM repo README:", error);
      return "";
    }
  },
  ["pm-repo-readme"],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ["github", "pm-repo"],
  }
);

// Active breakout series parsed from the markdown table
export interface ActiveBreakout {
  name: string;
  facilitator: string;
  latestDate: string;
  issueUrl: string;
}

// Fetch and cache active breakout series from the markdown file
export const getActiveBreakouts = unstable_cache(
  async (): Promise<ActiveBreakout[]> => {
    try {
      const content = await getMarkdownFile(
        "Breakout-Room-Meetings/active-breakout-series.md"
      );
      if (!content) return [];

      const breakouts: ActiveBreakout[] = [];
      const lines = content.split("\n");
      let inTable = false;

      for (const line of lines) {
        const trimmed = line.trim();
        // Skip header row and separator
        if (trimmed.startsWith("| Call Series")) { inTable = true; continue; }
        if (trimmed.startsWith("|---")) continue;
        // Stop at Inactive section
        if (trimmed.startsWith("## Inactive")) break;
        if (!inTable || !trimmed.startsWith("|")) continue;

        const cells = trimmed.split("|").map(c => c.trim()).filter(Boolean);
        if (cells.length < 4) continue;

        const nameMatch = cells[0];
        const facilitatorMatch = cells[1].match(/@(\w[\w-]*)/);
        const latestDate = cells[2];
        const issueMatch = cells[3].match(/\(([^)]+)\)/);

        if (nameMatch && issueMatch) {
          breakouts.push({
            name: nameMatch,
            facilitator: facilitatorMatch?.[1] ?? "",
            latestDate,
            issueUrl: issueMatch[1],
          });
        }
      }

      return breakouts;
    } catch (error) {
      console.error("Failed to fetch active breakouts:", error);
      return [];
    }
  },
  ["active-breakouts"],
  {
    revalidate: 3600,
    tags: ["github", "breakouts"],
  }
);

// Fetch a specific markdown file from the repo
export const getMarkdownFile = unstable_cache(
  async (path: string): Promise<string> => {
    try {
      // Validate path to prevent traversal
      if (path.includes("..") || path.startsWith("/")) {
        throw new Error("Invalid path");
      }

      const data = await fetchFromGitHub<GitHubContent>(
        `/repos/${PM_REPO_OWNER}/${PM_REPO_NAME}/contents/${path}`
      );

      const content = Buffer.from(data.content, "base64").toString("utf-8");
      return content;
    } catch (error) {
      console.error(`Failed to fetch file ${path}:`, error);
      return "";
    }
  },
  ["markdown-file"],
  {
    revalidate: 3600,
    tags: ["github"],
  }
);

// Fetch upgrade data from ethereum/forkcast
export interface ForkcastUpgrade {
  id: string;
  name: string;
  status: "done" | "active" | "planned";
  activationDate: string;
}

const FORKCAST_UPGRADES_URL =
  "https://raw.githubusercontent.com/ethereum/forkcast/main/src/data/upgrades.ts";

const FORKCAST_FALLBACK: ForkcastUpgrade[] = [
  { id: "pectra", name: "Pectra", status: "done", activationDate: "May 7, 2025" },
  { id: "fusaka", name: "Fusaka", status: "done", activationDate: "Dec 3, 2025" },
  { id: "glamsterdam", name: "Glamsterdam", status: "active", activationDate: "2026" },
  { id: "hegota", name: "Hegota", status: "planned", activationDate: "TBD" },
];

export const getForkcastUpgrades = unstable_cache(
  async (): Promise<ForkcastUpgrade[]> => {
    try {
      const res = await fetch(FORKCAST_UPGRADES_URL);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const text = await res.text();

      const upgrades: ForkcastUpgrade[] = [];
      let cur: Partial<ForkcastUpgrade & { disabled: boolean }> = {};
      // Brace depth. Each upgrade is a depth-1 object; deeper objects (client team
      // perspectives, for example) belong to it but carry none of its fields. Without the
      // depth check a nested "{" started a new entry and dropped the upgrade around it.
      let depth = 0;

      for (const line of text.split("\n")) {
        const trimmed = line.trim();
        const opens = (trimmed.match(/\{/g) ?? []).length;
        const closes = (trimmed.match(/\}/g) ?? []).length;
        if (depth === 0 && opens > closes) cur = {};
        if (depth === 1) {
          const m = trimmed.match(/^(\w+):\s*'([^']*)'/);
          if (m) {
            const [, key, val] = m;
            if (key === "id" || key === "name" || key === "status" || key === "activationDate") {
              (cur as Record<string, string>)[key] = val;
            }
          }
          if (trimmed.startsWith("disabled:")) {
            cur.disabled = trimmed.includes("true");
          }
        }
        depth = Math.max(0, depth + opens - closes);
        if (depth === 0 && closes > opens) {
          if (cur.id && cur.name && !cur.disabled) {
            const statusMap: Record<string, ForkcastUpgrade["status"]> = {
              Live: "done", Upcoming: "active", Planning: "planned", Research: "planned",
            };
            upgrades.push({
              id: cur.id,
              name: cur.name.replace(/ Upgrade$/, ""),
              status: statusMap[cur.status as string] ?? "planned",
              activationDate: cur.activationDate ?? "TBD",
            });
          }
          cur = {};
        }
      }

      if (!upgrades.some(u => u.status === "active" || u.status === "planned")) {
        console.warn("getForkcastUpgrades: no active/planned upgrades found, using fallback");
        return FORKCAST_FALLBACK;
      }
      return upgrades;
    } catch (error) {
      console.error("Failed to fetch forkcast upgrades:", error);
      return FORKCAST_FALLBACK;
    }
  },
  ["forkcast-upgrades"],
  { revalidate: 3600, tags: ["github", "forkcast"] }
);

// Get latest call summary from forkcast artifacts
export const getLatestCallSummary = unstable_cache(
  async (): Promise<string | null> => {
    try {
      const [acde, acdc] = await Promise.all([
        fetchFromGitHub<GitHubFile[]>("/repos/ethereum/forkcast/contents/public/artifacts/acde").catch(() => []),
        fetchFromGitHub<GitHubFile[]>("/repos/ethereum/forkcast/contents/public/artifacts/acdc").catch(() => []),
      ]);
      // Call folders are named <date>_<number>. The same directory holds a "plan" folder,
      // which would otherwise sort last and win.
      const isCall = (f: GitHubFile) => f.type === "dir" && /^\d{4}-\d{2}-\d{2}_\d+$/.test(f.name);
      const all = [
        ...acde.filter(isCall).map(f => ({ name: f.name, type: "ACDE" })),
        ...acdc.filter(isCall).map(f => ({ name: f.name, type: "ACDC" })),
      ].sort((a, b) => b.name.localeCompare(a.name));
      if (all.length === 0) return null;
      const latest = all[0];
      const num = latest.name.split("_")[1];
      return `${latest.type} #${num} call summary published`;
    } catch {
      return null;
    }
  },
  ["latest-call-summary"],
  { revalidate: 3600, tags: ["github", "forkcast"] }
);

// Get latest EIP stage change from forkcast API
interface EipStageChange {
  id: number;
  title: string;
  prefix: string;
  currentStage: string;
  lastStageChange: string;
  lastStageChangeFork: string;
}

export const getLatestEipChange = unstable_cache(
  async (): Promise<string | null> => {
    try {
      const res = await fetch("https://forkcast.org/api/eip-stage-changes.json");
      if (!res.ok) return null;
      const data = await res.json();
      const eips: EipStageChange[] = data.eips ?? [];
      if (eips.length === 0) return null;
      const latest = eips.sort((a, b) => b.lastStageChange.localeCompare(a.lastStageChange))[0];
      return `${latest.prefix}-${latest.id} → ${latest.currentStage} for ${latest.lastStageChangeFork}`;
    } catch {
      return null;
    }
  },
  ["latest-eip-change"],
  { revalidate: 3600, tags: ["forkcast"] }
);

// Get AllCoreDevs meeting notes (most recent) - legacy, from ethereum/pm markdown files
export const getRecentMeetings = unstable_cache(
  async (layer: "execution" | "consensus", limit = 5): Promise<GitHubFile[]> => {
    try {
      const folder =
        layer === "execution"
          ? "AllCoreDevs-EL-Meetings"
          : "AllCoreDevs-CL-Meetings";

      const data = await fetchFromGitHub<GitHubFile[]>(
        `/repos/${PM_REPO_OWNER}/${PM_REPO_NAME}/contents/${folder}`
      );

      // Filter markdown files and sort by name (which includes the meeting number)
      const meetings = data
        .filter((item) => item.type === "file" && item.name.endsWith(".md"))
        .sort((a, b) => b.name.localeCompare(a.name))
        .slice(0, limit);

      return meetings;
    } catch (error) {
      console.error(`Failed to fetch ${layer} meetings:`, error);
      return [];
    }
  },
  ["recent-meetings"],
  {
    revalidate: 3600,
    tags: ["github", "meetings"],
  }
);

// Forkcast artifact-based call data (current system)
export type AcdCallType = "acde" | "acdc" | "acdt";

export interface ArtifactCall {
  type: AcdCallType;
  date: string;
  number: string;
  issueUrl: string | null;
  videoUrl: string | null;
}

interface ArtifactConfig {
  issue?: number;
  videoUrl?: string;
}

const FORKCAST_REPO = "ethereum/forkcast";

// Fetch recent calls from forkcast artifacts for a given ACD call type
export const getRecentArtifactCalls = unstable_cache(
  async (type: AcdCallType, limit = 3): Promise<ArtifactCall[]> => {
    try {
      const dirs = await fetchFromGitHub<GitHubFile[]>(
        `/repos/${FORKCAST_REPO}/contents/public/artifacts/${type}`
      );

      // Each dir is named like "2026-02-12_230" (date_number)
      const sorted = dirs
        .filter((d) => d.type === "dir" && /^\d{4}-\d{2}-\d{2}_\d+$/.test(d.name))
        .sort((a, b) => b.name.localeCompare(a.name))
        .slice(0, limit);

      const calls: ArtifactCall[] = await Promise.all(
        sorted.map(async (dir) => {
          const [date, number] = dir.name.split("_");

          // Fetch config.json (manifest) for video URL and issue link
          let config: ArtifactConfig = {};
          try {
            const configData = await fetchFromGitHub<GitHubContent>(
              `/repos/${FORKCAST_REPO}/contents/public/artifacts/${type}/${dir.name}/config.json`
            );
            config = JSON.parse(
              Buffer.from(configData.content, "base64").toString("utf-8")
            );
          } catch {
            // config.json may not exist for all calls
          }

          return {
            type,
            date,
            number: number ?? "",
            issueUrl: config.issue
              ? `https://github.com/ethereum/pm/issues/${config.issue}`
              : null,
            videoUrl: config.videoUrl ?? null,
          };
        })
      );

      return calls;
    } catch (error) {
      console.error(`Failed to fetch ${type} artifact calls:`, error);
      return [];
    }
  },
  ["artifact-calls"],
  {
    revalidate: 3600,
    tags: ["github", "forkcast", "artifacts"],
  }
);
