'use client'

import { useMemo, useState } from "react";
import { preMergeEL, preMergeCL, mergeFork, postMerge, historyBase } from "@/data/upgrades";
import "./upgrades.css";

type ForkRow = {
  id: string;
  name: string;
  fullName: string | null;
  track: string;
  date: string;
  sortKey: number;
  href: string;
  eipCount: number | null;
  scheduled: boolean;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* Dates are written for people ("30 Jul 2015"), so parse them here rather than
   with Date.parse: a fork that is only scheduled reads "2026", and one that is
   not scheduled at all reads "TBD" and belongs after every dated fork. */
function dateKey(date: string) {
  const full = /^(\d{1,2}) (\w{3}) (\d{4})$/.exec(date);
  if (full) return Date.UTC(Number(full[3]), MONTHS.indexOf(full[2]), Number(full[1]));
  const year = /^(\d{4})$/.exec(date);
  if (year) return Date.UTC(Number(year[1]), 0, 1);
  return Number.POSITIVE_INFINITY;
}

const forkRows: ForkRow[] = [
  ...preMergeEL.map((f) => ({
    id: `el-${f.anchor}`,
    name: f.name,
    fullName: null,
    track: "Execution layer",
    date: f.date,
    sortKey: dateKey(f.date),
    href: `${historyBase}#${f.anchor}`,
    eipCount: f.eipCount as number | null,
    scheduled: false,
  })),
  ...preMergeCL.map((f) => ({
    id: `cl-${f.anchor}`,
    name: f.name,
    fullName: null,
    track: "Consensus layer",
    date: f.date,
    sortKey: dateKey(f.date),
    href: `${historyBase}#${f.anchor}`,
    eipCount: f.eipCount as number | null,
    scheduled: false,
  })),
  {
    id: "merge",
    name: mergeFork.name,
    fullName: mergeFork.fullName,
    track: "The Merge",
    date: mergeFork.date,
    sortKey: dateKey(mergeFork.date),
    href: mergeFork.href,
    eipCount: mergeFork.eipCount as number | null,
    scheduled: false,
  },
  ...postMerge.map((f) => ({
    id: `post-${f.n}`,
    name: f.nickname,
    fullName: f.fullName,
    track: "Post-merge",
    date: f.date,
    sortKey: dateKey(f.date),
    href: f.href,
    eipCount: f.eipCount,
    scheduled: f.status === "upcoming",
  })),
];

// Never subtract the keys: "TBD" is Infinity, and Infinity - Infinity is NaN.
const byDate = (a: ForkRow, b: ForkRow) => (a.sortKey === b.sortKey ? 0 : a.sortKey < b.sortKey ? -1 : 1);

const isForkcast = (href: string) => href.includes("forkcast.org");

function eipCountText(count: number | null, scheduled: boolean) {
  if (count === null) return "scope TBD";
  if (count === 0) return "no EIPs";
  return `${count} EIP${count === 1 ? "" : "s"}${scheduled ? " scheduled" : ""}`;
}

export default function UpgradeTimeline() {
  const [order, setOrder] = useState<"desc" | "asc">("desc");

  const rows = useMemo(
    () => [...forkRows].sort((a, b) => (order === "desc" ? byDate(b, a) : byDate(a, b))),
    [order],
  );

  return (
    <div className="upgrades-root">
      <p className="timeline-export">
        Print-quality image:{" "}
        <a href="/upgrades/fork-history-dark.png" download>dark</a>
        {" · "}
        <a href="/upgrades/fork-history-light.png" download>light</a>
      </p>

      <table className="fork-table">
        <caption className="sr-only">
          Every Ethereum network upgrade, sorted by date, {order === "desc" ? "newest first" : "oldest first"}.
        </caption>
        <thead>
          <tr>
            <th scope="col">Fork</th>
            <th scope="col" className="fork-col-track">Track</th>
            <th scope="col" className="fork-col-date" aria-sort={order === "desc" ? "descending" : "ascending"}>
              <button
                type="button"
                className="fork-sort"
                onClick={() => setOrder((cur) => (cur === "desc" ? "asc" : "desc"))}
                aria-label={`Date, sorted ${order === "desc" ? "newest first" : "oldest first"}. Reverse the order.`}
              >
                Date <span aria-hidden="true">{order === "desc" ? "↓" : "↑"}</span>
              </button>
            </th>
            <th scope="col" className="fork-col-eips">EIPs</th>
            <th scope="col" className="fork-col-link">Forkcast</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((f) => (
            <tr key={f.id}>
              <th scope="row" className="fork-name">
                <b>{f.name}</b>
                {f.fullName && <small>{f.fullName}</small>}
              </th>
              <td className="fork-col-track">{f.track}</td>
              <td className="fork-col-date">{f.date}</td>
              <td className="fork-col-eips">{eipCountText(f.eipCount, f.scheduled)}</td>
              <td className="fork-col-link">
                {isForkcast(f.href) && (
                  <a href={f.href} target="_blank" rel="noopener noreferrer">
                    Forkcast <span aria-hidden="true">↗</span>
                    <span className="sr-only">, opens in a new tab</span>
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
