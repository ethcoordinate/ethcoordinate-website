'use client'

import { useEffect, useState } from "react";
import { preMergeEL, preMergeCL, mergeFork, postMerge, historyBase, type PreMergeFork } from "@/data/upgrades";
import { badgeSheet } from "@/data/badge-sprites";
import "./upgrades.css";

/* Faithful interactive rebuild of the upgrades illustration.
   All geometry measured from the source image (PNG pixel space).
   Badges/pills/loop are sprite crops of the original artwork;
   tracks are dotted lines through the source dot positions. */

const CW = 4700;      // canvas width (px in source)
const CY0 = 680;      // canvas top in source px
const CH = 1320;      // canvas height (content y 680-2000)

const px = (x: number) => `${(x / CW) * 100}%`;
const py = (y: number) => `${((y - CY0) / CH) * 100}%`;

// --- sprite geometry (source px) ---
const EL_BADGES = [
  { x: 352, y: 942, w: 90, h: 88 }, { x: 433, y: 942, w: 90, h: 88 },
  { x: 699, y: 940, w: 90, h: 89 }, { x: 874, y: 940, w: 91, h: 89 },
  { x: 1008, y: 924, w: 91, h: 89 }, { x: 1035, y: 975, w: 109, h: 95 },
  { x: 1527, y: 942, w: 91, h: 88 }, { x: 2231, y: 940, w: 91, h: 89 },
  { x: 2679, y: 924, w: 91, h: 89 }, { x: 2705, y: 975, w: 110, h: 95 },
  { x: 3376, y: 940, w: 91, h: 89 }, { x: 3552, y: 941, w: 90, h: 89 },
  { x: 3729, y: 937, w: 90, h: 88 }, { x: 3988, y: 937, w: 91, h: 88 },
];
const CL_BADGES = [
  { x: 3205, y: 772, w: 90, h: 88 }, { x: 3636, y: 772, w: 91, h: 88 },
];
const MERGE_R = { x: 4171, y: 832, w: 235, h: 123 };
const MERGE_L = { x: 401, y: 1753, w: 235, h: 124 };
const POST_BADGES = [
  { x: 1029, y: 1752, w: 131, h: 130 }, { x: 1800, y: 1752, w: 131, h: 130 },
  { x: 2775, y: 1752, w: 131, h: 130 }, { x: 3170, y: 1752, w: 129, h: 130 },
  { x: 3770, y: 1752, w: 130, h: 130 }, { x: 4316, y: 1752, w: 129, h: 130 },
];
const LOOP = { x: 100, y: 800, w: 4600, h: 1100 };

// Dot tracks: identical spacing on every track — they all represent time.
// Positions stay where the source put the tracks; dots skip badge boxes.
const DOT_GAP = 43;
const SKIP_EL = EL_BADGES.map((b) => [b.x - 12, b.x + b.w + 12]);
const SKIP_CL = CL_BADGES.map((b) => [b.x - 12, b.x + b.w + 12]);
const SKIP_POST = [
  [MERGE_L.x - 12, MERGE_L.x + MERGE_L.w + 12],
  ...POST_BADGES.map((b) => [b.x - 12, b.x + b.w + 12]),
];

function dotRow(x0: number, x1: number, skip: number[][]) {
  const dots = [];
  for (let x = Math.ceil(x0 / DOT_GAP) * DOT_GAP; x <= x1; x += DOT_GAP) {
    if (!skip.some(([a, b]) => x >= a && x <= b)) dots.push(x);
  }
  return dots;
}

const EL_TRACK_DOTS = dotRow(530, 4040, SKIP_EL);
const CL_TRACK_DOTS = dotRow(3300, 4040, SKIP_CL);
const POST_TRACK_DOTS = dotRow(660, 4500, SKIP_POST);

const EL_YEARS = [
  { year: "2016", x: 720 }, { year: "2017", x: 1240 }, { year: "2018", x: 1765 },
  { year: "2019", x: 2275 }, { year: "2020", x: 2750 }, { year: "2021", x: 3415 }, { year: "2022", x: 3925 },
];
const POST_YEARS = [
  { year: "2023", x: 1100 }, { year: "2024", x: 1860 }, { year: "2025", x: 2700 },
  // Jan 1 2026: least-squares fit of the four shipped post-merge fork dates to
  // their badge-center x positions (2.2376 px/day, residuals <= ~18 days),
  // evaluated at 2026-01-01. Lands just right of Fusaka (3 Dec 2025).
  { year: "2026", x: 3334 },
];

const tipAlign = (x: number) => (x < 500 ? "tip-left" : x > CW - 500 ? "tip-right" : "");

/* --- mobile "timeline view": one long horizontal strip -------------------
   EL + CL rows converge into the merge pill, then post-merge continues
   rightward on the merged line. No loop artwork, no second merge pill.
   Pre-merge keeps source coordinates (shifted by XOFF/YOFF); post-merge
   badges keep their desktop relative spacing, re-anchored so Shapella
   (12 Apr 2023) sits 209 days x 2.2376 px/day right of the merge pill. */
const LW = 7970, LH = 480, XOFF = 280, YOFF = 640;
const lpx = (x: number) => `${((x - XOFF) / LW) * 100}%`;
const lpw = (w: number) => `${(w / LW) * 100}%`;
const lpy = (y: number) => `${((y - YOFF) / LH) * 100}%`;
const POST_SCALE = 2.2376; // px/day, from the shipped-fork date fit (see POST_YEARS)
const MERGE_CX = MERGE_R.x + MERGE_R.w / 2;
const LINEAR_SHIFT = MERGE_CX + 209 * POST_SCALE - (POST_BADGES[0].x + POST_BADGES[0].w / 2);
const POST_LINEAR = POST_BADGES.map((b) => {
  const cx = b.x + b.w / 2 + LINEAR_SHIFT;
  return { x: Math.round(cx - 65), w: b.w };
});
const POST_LINEAR_YEARS = POST_YEARS.map(({ year, x }) => ({ year, x: Math.round(x + LINEAR_SHIFT) }));
const POST_TRACK_Y = 890; // merged line height = merge pill center
const POST_LINEAR_DOTS = dotRow(MERGE_R.x + MERGE_R.w + 12, 8120, POST_LINEAR.map((b) => [b.x - 12, b.x + b.w + 12]));

/* All badges/pills come from one sprite sheet (single request); the
   background-size/position percentage math keeps crops sharp at any scale. */
function BadgeBg({ id }: { id: string }) {
  const s = badgeSheet.sprites[id as keyof typeof badgeSheet.sprites];
  return (
    <span
      aria-hidden="true"
      className="badge-bg"
      style={{
        aspectRatio: `${s.w} / ${s.h}`,
        backgroundSize: `${((badgeSheet.width / s.w) * 100).toFixed(3)}% ${((badgeSheet.height / s.h) * 100).toFixed(3)}%`,
        backgroundPosition: `${((s.x / (badgeSheet.width - s.w)) * 100).toFixed(3)}% ${((s.y / (badgeSheet.height - s.h)) * 100).toFixed(3)}%`,
      }}
    />
  );
}

function Tip({ title, sub, date }: { title: string; sub?: string; date?: string }) {
  return (
    <span className="pm-tip" role="tooltip">
      <b>{title}</b>
      {sub && <small>{sub}</small>}
      {date && <small className="tip-date">{date}</small>}
    </span>
  );
}

function LegendDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="legend-backdrop" onClick={onClose} aria-hidden="true" />}
      <aside className={`legend-panel ${open ? "open" : ""}`} aria-hidden={!open} aria-label="Legend">
        <div className="legend-panel-head">
          <span>legend</span>
          <button onClick={onClose} aria-label="Close legend">×</button>
        </div>
        <div className="legend-body">
          <div className="legend-col">
            <p className="legend-heading">Execution layer (pre-merge)</p>
            <ol>
              {preMergeEL.map((f, i) => (
                <li key={f.name}><span>{i + 1}</span>{f.name}<small>{f.date}</small></li>
              ))}
            </ol>
          </div>
          <div className="legend-col">
            <p className="legend-heading">Consensus layer (pre-merge)</p>
            <ol>
              {preMergeCL.map((f, i) => (
                <li key={f.name}><span>{i + 1}</span>{f.name}<small>{f.date}</small></li>
              ))}
              <li><span>m</span>{mergeFork.fullName} “The Merge”<small>{mergeFork.date}</small></li>
            </ol>
          </div>
          <div className="legend-col">
            <p className="legend-heading">Post-merge (combined forks)</p>
            <ol>
              {postMerge.map((f) => (
                <li key={f.n}><span>{f.n}</span>{f.fullName} “{f.nickname}”<small>{f.date}</small></li>
              ))}
            </ol>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function UpgradeTimeline() {
  const [legendOpen, setLegendOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "timeline">("list");
  const [scrollAtEnd, setScrollAtEnd] = useState(false);

  // initial mobile view: ?view= param wins, then the saved choice
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("view");
    const saved = localStorage.getItem("upgrades-mobile-view");
    const initial = fromUrl === "timeline" || fromUrl === "list" ? fromUrl : saved;
    if (initial === "list" || initial === "timeline") setMobileView(initial);
  }, []);
  const switchView = (v: "list" | "timeline") => {
    setMobileView(v);
    try { localStorage.setItem("upgrades-mobile-view", v); } catch { /* private mode */ }
  };

  // detail items: 0 = merge, 1..6 = post-merge forks, 7..20 = pre-merge EL, 21..22 = pre-merge CL
  const detailItems = [
    { mascot: mergeFork.mascot as string | null, name: mergeFork.name, fullName: mergeFork.fullName, date: mergeFork.date, blurb: mergeFork.blurb, href: mergeFork.href, emoji: undefined as string | undefined, eipCount: mergeFork.eipCount as number | null, scheduled: false },
    ...postMerge.map((p) => ({ mascot: p.mascot, name: p.nickname, fullName: p.fullName, date: p.date, blurb: p.blurb, href: p.href, emoji: p.mascotEmoji, eipCount: p.eipCount, scheduled: p.status === "upcoming" })),
    ...preMergeEL.map((p) => ({ mascot: null, name: p.name, fullName: "Execution layer upgrade", date: p.date, blurb: p.blurb, href: `${historyBase}#${p.anchor}`, emoji: undefined, eipCount: p.eipCount as number | null, scheduled: false })),
    ...preMergeCL.map((p) => ({ mascot: null, name: p.name, fullName: "Consensus layer upgrade", date: p.date, blurb: p.blurb, href: `${historyBase}#${p.anchor}`, emoji: undefined, eipCount: p.eipCount as number | null, scheduled: false })),
  ];

  const eipCountText = (count: number | null, scheduled: boolean) => {
    if (count === null) return "scope TBD";
    if (count === 0) return "no EIPs";
    return `${count} EIP${count === 1 ? "" : "s"}${scheduled ? " scheduled" : ""}`;
  };
  const toggle = (i: number) => setSelected((cur) => (cur === i ? null : i));
  const active = selected !== null ? detailItems[selected] : null;

  return (
    <div className="upgrades-root">
      <button className="legend-toggle" onClick={() => setLegendOpen(true)}>
        legend
      </button>
      <LegendDrawer open={legendOpen} onClose={() => setLegendOpen(false)} />

      {/* mobile view switch (hidden on desktop) */}
      <div className="mobile-view-toggle" role="group" aria-label="Choose how to browse forks">
        <button className={mobileView === "list" ? "active" : ""} aria-pressed={mobileView === "list"} onClick={() => switchView("list")}>List</button>
        <button className={mobileView === "timeline" ? "active" : ""} aria-pressed={mobileView === "timeline"} onClick={() => switchView("timeline")}>Timeline</button>
      </div>

      <div className="timeline" role="img" aria-label="Interactive timeline of Ethereum upgrades from Frontier in 2015 to Hegota">
          {/* the loop (source artwork sprite) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/upgrades/loop.webp" alt="" className="loop-sprite"
            style={{ left: px(LOOP.x), top: py(LOOP.y), width: px(LOOP.w) }} />

          {/* dotted tracks */}
          <svg viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none" aria-hidden="true">
            {/* CL track: dots, then curve down into the merge */}
            {CL_TRACK_DOTS.map((x) => (
              <rect key={`cl-${x}`} x={x - 7} y={816 - 9 - CY0} width="14" height="18" rx="7" className="track-dot" />
            ))}
            <path d={`M 4040 ${816 - CY0} C 4100 ${816 - CY0}, 4130 ${845 - CY0}, 4165 ${902 - CY0}`} className="track-dotted" />
            {/* EL track: dots, then curve up into the merge — both join at the pill's left edge */}
            {EL_TRACK_DOTS.map((x) => (
              <rect key={`el-${x}`} x={x - 7} y={975 - 9 - CY0} width="14" height="18" rx="7" className="track-dot" />
            ))}
            <path d={`M 4040 ${975 - CY0} C 4100 ${975 - CY0}, 4130 ${950 - CY0}, 4165 ${908 - CY0}`} className="track-dotted" />
            {/* post-merge track */}
            {POST_TRACK_DOTS.map((x) => (
              <rect key={`post-${x}`} x={x - 7} y={1816 - 9 - CY0} width="14" height="18" rx="7" className="track-dot" />
            ))}
          </svg>

          {/* labels */}
          <span className="layer-label layer-label-cl" style={{ left: px(3808), top: py(674) }}>consensus layer</span>
          <span className="layer-label layer-label-el" style={{ left: px(1700), top: py(1080) }}>execution layer</span>
          {EL_YEARS.map(({ year, x }) => (
            <span key={year} className="year-label" style={{ left: px(x), top: py(870) }}>{year}</span>
          ))}
          {POST_YEARS.map(({ year, x }) => (
            <span key={year} className="year-label" style={{ left: px(x), top: py(1645) }}>{year}</span>
          ))}

          {/* pre-merge EL badges (source sprites) */}
          {preMergeEL.map((f, i) => {
            const b = EL_BADGES[i];
            return (
              <button key={f.name} className={`badge-sprite ${tipAlign(b.x)} ${selected === 7 + i ? "selected" : ""}`}
                style={{ left: px(b.x), top: py(b.y), width: px(b.w) }}
                onClick={() => toggle(7 + i)}
                aria-label={`${f.name}, ${f.date}`}
                aria-expanded={selected === 7 + i}>
                <BadgeBg id={`el-${i + 1}`} />
                <Tip title={f.name} date={f.date} />
              </button>
            );
          })}

          {/* pre-merge CL badges */}
          {preMergeCL.map((f, i) => {
            const b = CL_BADGES[i];
            return (
              <button key={f.name} className={`badge-sprite ${tipAlign(b.x)} ${selected === 21 + i ? "selected" : ""}`}
                style={{ left: px(b.x), top: py(b.y), width: px(b.w) }}
                onClick={() => toggle(21 + i)}
                aria-label={`${f.name}, ${f.date}`}
                aria-expanded={selected === 21 + i}>
                <BadgeBg id={`cl-${i + 1}`} />
                <Tip title={f.name} date={f.date} />
              </button>
            );
          })}

          {/* merge pills (toggle the detail panel) */}
          <button className={`badge-sprite merge-sprite tip-right ${selected === 0 ? "selected" : ""}`}
            style={{ left: px(MERGE_R.x), top: py(MERGE_R.y), width: px(MERGE_R.w) }}
            onClick={() => toggle(0)}
            aria-label={`${mergeFork.name}, ${mergeFork.date}`}
            aria-expanded={selected === 0}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <BadgeBg id="merge-pill" />
            <Tip title={mergeFork.name} sub={mergeFork.fullName} date={mergeFork.date} />
          </button>
          <button className={`badge-sprite merge-sprite tip-left ${selected === 0 ? "selected" : ""}`}
            style={{ left: px(MERGE_L.x), top: py(MERGE_L.y), width: px(MERGE_L.w) }}
            onClick={() => toggle(0)}
            aria-label={`${mergeFork.name}, ${mergeFork.date}`}
            aria-expanded={selected === 0}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <BadgeBg id="merge-pill-left" />
            <Tip title={mergeFork.name} sub={mergeFork.fullName} date={mergeFork.date} />
          </button>

          {/* post-merge badges (toggle the detail panel) */}
          {postMerge.map((f, i) => {
            const b = POST_BADGES[i];
            return (
              <button key={f.n} className={`badge-sprite fork-sprite ${tipAlign(b.x + b.w / 2)} ${selected === i + 1 ? "selected" : ""}`}
                style={{ left: px(b.x), top: py(b.y), width: px(b.w) }}
                onClick={() => toggle(i + 1)}
                aria-label={`${f.nickname} (${f.fullName}), ${f.date}`}
                aria-expanded={selected === i + 1}>
                <BadgeBg id={`post-${i + 1}`} />
                <span className="fork-nickname">{f.nickname}</span>
                <Tip title={f.nickname} sub={f.fullName} date={f.date} />
              </button>
            );
          })}
        </div>

      {/* mobile: vertical list (default) or horizontally scrolling timeline */}
      {mobileView === "timeline" ? (
        <div className={`timeline-scroll-wrap ${scrollAtEnd ? "at-end" : ""}`}>
          <div className="timeline-scroll"
            onScroll={(e) => {
              const el = e.currentTarget;
              setScrollAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 30);
            }}>
            <div className="timeline-linear" role="img" aria-label="Scrollable timeline of Ethereum upgrades from Frontier in 2015 to Hegota">
              <svg viewBox={`0 0 ${LW} ${LH}`} preserveAspectRatio="none" aria-hidden="true">
                {CL_TRACK_DOTS.map((x) => (
                  <rect key={`lcl-${x}`} x={x - XOFF - 7} y={816 - YOFF - 9} width="14" height="18" rx="7" className="track-dot" />
                ))}
                <path d={`M ${4040 - XOFF} ${816 - YOFF} C ${4100 - XOFF} ${816 - YOFF}, ${4130 - XOFF} ${845 - YOFF}, ${4165 - XOFF} ${902 - YOFF}`} className="track-dotted" />
                {EL_TRACK_DOTS.map((x) => (
                  <rect key={`lel-${x}`} x={x - XOFF - 7} y={975 - YOFF - 9} width="14" height="18" rx="7" className="track-dot" />
                ))}
                <path d={`M ${4040 - XOFF} ${975 - YOFF} C ${4100 - XOFF} ${975 - YOFF}, ${4130 - XOFF} ${950 - YOFF}, ${4165 - XOFF} ${908 - YOFF}`} className="track-dotted" />
                {POST_LINEAR_DOTS.map((x) => (
                  <rect key={`lpost-${x}`} x={x - XOFF - 7} y={POST_TRACK_Y - YOFF - 9} width="14" height="18" rx="7" className="track-dot" />
                ))}
              </svg>

              <span className="layer-label layer-label-cl" style={{ left: lpx(3808), top: lpy(674) }}>consensus layer</span>
              <span className="layer-label layer-label-el" style={{ left: lpx(1700), top: lpy(1080) }}>execution layer</span>
              {EL_YEARS.map(({ year, x }) => (
                <span key={`ly-${year}`} className="year-label" style={{ left: lpx(x), top: lpy(870) }}>{year}</span>
              ))}
              {POST_LINEAR_YEARS.map(({ year, x }) => (
                <span key={`lpy-${year}`} className="year-label" style={{ left: lpx(x), top: lpy(760) }}>{year}</span>
              ))}

              {preMergeEL.map((f, i) => {
                const b = EL_BADGES[i];
                return (
                  <button key={`lin-${f.name}`} className={`badge-sprite ${selected === 7 + i ? "selected" : ""}`}
                    style={{ left: lpx(b.x), top: lpy(b.y), width: lpw(b.w) }}
                    onClick={() => toggle(7 + i)}
                    aria-label={`${f.name}, ${f.date}`}
                    aria-expanded={selected === 7 + i}>
                    <BadgeBg id={`el-${i + 1}`} />
                  </button>
                );
              })}
              {preMergeCL.map((f, i) => {
                const b = CL_BADGES[i];
                return (
                  <button key={`lin-${f.name}`} className={`badge-sprite ${selected === 21 + i ? "selected" : ""}`}
                    style={{ left: lpx(b.x), top: lpy(b.y), width: lpw(b.w) }}
                    onClick={() => toggle(21 + i)}
                    aria-label={`${f.name}, ${f.date}`}
                    aria-expanded={selected === 21 + i}>
                    <BadgeBg id={`cl-${i + 1}`} />
                  </button>
                );
              })}

              {/* the single merge pill: both tracks converge here, post-merge continues right */}
              <button className={`badge-sprite merge-sprite ${selected === 0 ? "selected" : ""}`}
                style={{ left: lpx(MERGE_R.x), top: lpy(MERGE_R.y), width: lpw(MERGE_R.w) }}
                onClick={() => toggle(0)}
                aria-label={`${mergeFork.name}, ${mergeFork.date}`}
                aria-expanded={selected === 0}>
                <BadgeBg id="merge-pill" />
              </button>

              {postMerge.map((f, i) => {
                const b = POST_LINEAR[i];
                return (
                  <button key={`lin-${f.n}`} className={`badge-sprite fork-sprite ${selected === i + 1 ? "selected" : ""}`}
                    style={{ left: lpx(b.x), top: lpy(825), width: lpw(b.w) }}
                    onClick={() => toggle(i + 1)}
                    aria-label={`${f.nickname} (${f.fullName}), ${f.date}`}
                    aria-expanded={selected === i + 1}>
                    <BadgeBg id={`post-${i + 1}`} />
                    <span className="fork-nickname">{f.nickname}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
      <div className="timeline-mobile">
        <p className="legend-heading">Pre-merge — execution layer</p>
        {preMergeEL.map((f, i) => (
          <button key={f.name} className={`tm-row ${selected === 7 + i ? "selected" : ""}`} onClick={() => toggle(7 + i)}>
            <span className="tm-num tm-num-el">{i + 1}</span>
            <b>{f.name}</b>
            <small>{f.date}</small>
          </button>
        ))}
        <p className="legend-heading">Pre-merge — consensus layer</p>
        {preMergeCL.map((f, i) => (
          <button key={f.name} className={`tm-row ${selected === 21 + i ? "selected" : ""}`} onClick={() => toggle(21 + i)}>
            <span className="tm-num tm-num-cl">{i + 1}</span>
            <b>{f.name}</b>
            <small>{f.date}</small>
          </button>
        ))}
        <button className={`tm-row ${selected === 0 ? "selected" : ""}`} onClick={() => toggle(0)}>
          <span className="tm-num tm-num-merge">m</span>
          <b>{mergeFork.name}</b>
          <small>{mergeFork.date}</small>
        </button>
        <p className="legend-heading">Post-merge</p>
        {postMerge.map((f, i) => (
          <button key={f.n} className={`tm-row ${selected === i + 1 ? "selected" : ""}`} onClick={() => toggle(i + 1)}>
            <span className="tm-num tm-num-post">{f.n}</span>
            <b>{f.nickname}</b>
            <small>{f.date}</small>
          </button>
        ))}
      </div>
      )}

      <p className="timeline-hint">Hover over any fork for its name and date — click for more info.</p>
      <p className="timeline-export">
        Print-quality image:{" "}
        <a href="/upgrades/fork-history-dark.png" download>dark</a>
        {" · "}
        <a href="/upgrades/fork-history-light.png" download>light</a>
      </p>

      {/* detail panel: always open; defaults to instructions until a fork is clicked */}
      <div className="fork-detail open">
        {active ? (
          <div className="fork-detail-inner">
            {active.mascot ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={active.mascot} alt="" className="fork-detail-mascot" />
            ) : (
              <span className="fork-detail-mascot fork-detail-placeholder" aria-hidden="true">{active.emoji ?? "⎇"}</span>
            )}
            <div className="fork-detail-body">
              <div className="fork-detail-head">
                <b>{active.name}</b>
                <span className="fork-detail-layer">{active.fullName}</span>
                <span className="fork-detail-meta">{active.date} · {eipCountText(active.eipCount, active.scheduled)}</span>
              </div>
              <p className="fork-detail-caption">major feature shipped</p>
              <p>{active.blurb}</p>
              <a href={active.href} target="_blank" rel="noopener noreferrer" className="link-blue">
                {active.href.includes("forkcast.org") ? "Open on Forkcast ↗" : "Open on ethereum.org ↗"}
              </a>
            </div>
            <button className="fork-detail-close" onClick={() => setSelected(null)} aria-label="Back to instructions">×</button>
          </div>
        ) : (
          <div className="fork-detail-inner fork-detail-default">
            <span className="fork-detail-mascot fork-detail-placeholder" aria-hidden="true">⎇</span>
            <div className="fork-detail-body">
              <p>Click on any fork to see the major feature that it shipped, and a link to more info.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
