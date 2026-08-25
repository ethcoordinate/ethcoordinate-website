'use client'

import { useState } from "react";
import { preMergeEL, preMergeCL, mergeFork, postMerge, historyBase, type PreMergeFork } from "@/data/upgrades";
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
];

const tipAlign = (x: number) => (x < 500 ? "tip-left" : x > CW - 500 ? "tip-right" : "");

function Tip({ title, sub, detail }: { title: string; sub: string; detail?: string }) {
  return (
    <span className="pm-tip" role="tooltip">
      <b>{title}</b>
      <small>{sub}</small>
      {detail && <em>{detail}</em>}
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

      <div className="timeline" role="img" aria-label="Interactive timeline of Ethereum upgrades from Frontier in 2015 to Hegota">
          {/* the loop (source artwork sprite) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/upgrades/loop.png" alt="" className="loop-sprite"
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/upgrades/el-${i + 1}.png`} alt="" />
                <Tip title={f.name} sub={f.date} />
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/upgrades/cl-${i + 1}.png`} alt="" />
                <Tip title={f.name} sub={f.date} />
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
            <img src="/upgrades/merge-pill.png" alt="" />
            <span className="merge-date-label" aria-hidden="true">15 SEP</span>
            <Tip title={mergeFork.name} sub={`${mergeFork.fullName} · ${mergeFork.date}`} />
          </button>
          <button className={`badge-sprite merge-sprite tip-left ${selected === 0 ? "selected" : ""}`}
            style={{ left: px(MERGE_L.x), top: py(MERGE_L.y), width: px(MERGE_L.w) }}
            onClick={() => toggle(0)}
            aria-label={`${mergeFork.name}, ${mergeFork.date}`}
            aria-expanded={selected === 0}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/upgrades/merge-pill-left.png" alt="" />
            <span className="merge-date-label" aria-hidden="true">15 SEP</span>
            <Tip title={mergeFork.name} sub={`${mergeFork.fullName} · ${mergeFork.date}`} />
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/upgrades/post-${i + 1}.png`} alt="" />
                <span className="fork-nickname">{f.nickname}</span>
                <span className="fork-date">{f.date}</span>
                <Tip title={f.nickname} sub={`${f.fullName} · ${f.date}`} />
              </button>
            );
          })}
        </div>

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
                <span>{active.fullName} · {active.date} · {eipCountText(active.eipCount, active.scheduled)}</span>
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

      <p className="timeline-note">
        Artwork geometry preserved from the original illustration. Hover any badge
        for its full name; click through to the primary record from the detail card.
      </p>
    </div>
  );
}
