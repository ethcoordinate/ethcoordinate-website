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
  { x: 357, y: 947, w: 80, h: 77 }, { x: 438, y: 947, w: 80, h: 77 },
  { x: 704, y: 945, w: 80, h: 78 }, { x: 879, y: 945, w: 81, h: 78 },
  { x: 1013, y: 929, w: 87, h: 83 }, { x: 1058, y: 992, w: 81, h: 72 },
  { x: 1532, y: 947, w: 81, h: 77 }, { x: 2236, y: 945, w: 81, h: 78 },
  { x: 2684, y: 929, w: 88, h: 83 }, { x: 2732, y: 992, w: 78, h: 72 },
  { x: 3381, y: 945, w: 81, h: 78 }, { x: 3556, y: 946, w: 81, h: 78 },
  { x: 3733, y: 942, w: 81, h: 77 }, { x: 3993, y: 942, w: 81, h: 77 },
];
const CL_BADGES = [
  { x: 3210, y: 777, w: 80, h: 78 }, { x: 3641, y: 777, w: 81, h: 78 },
];
const MERGE_R = { x: 4171, y: 832, w: 235, h: 123 };
const MERGE_L = { x: 401, y: 1753, w: 235, h: 124 };
const POST_BADGES = [
  { x: 1040, y: 1750, w: 105, h: 105 }, { x: 1810, y: 1750, w: 105, h: 105 },
  { x: 2795, y: 1750, w: 105, h: 105 }, { x: 3175, y: 1750, w: 120, h: 105 },
  { x: 3775, y: 1750, w: 120, h: 105 }, { x: 4318, y: 1750, w: 124, h: 105 },
];
const LOOP = { x: 100, y: 800, w: 4600, h: 1100 };

// exact dot positions from the source (EL track)
const EL_DOTS = [526,569,612,656,698,791,832,874,967,1006,1100,1140,1183,1228,1272,1316,1361,1404,1448,1492,1529,1624,1668,1710,1756,1800,1845,1888,1932,1976,2021,2064,2108,2152,2196,2232,2328,2372,2416,2460,2505,2548,2592,2636,2678,2771,2812,2856,2900,2944,2988,3032,3076,3120,3164,3208,3252,3292,3340,3378,3472,3516,3554,3648,3692,3731,3823,3868,3912,3956,4081,4117,4214,4241,4294,4325,4357];
const EL_DOT_Y = 975;
// dots rising into the merge pill (from source)
const EL_RISE_DOTS = [[4081, 950], [4131, 900], [4171, 860], [4211, 830]];

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

  // detail items: 0 = the merge, 1..6 = post-merge forks
  const detailItems = [
    { mascot: mergeFork.mascot as string | null, name: mergeFork.name, fullName: mergeFork.fullName, date: mergeFork.date, blurb: mergeFork.blurb, href: mergeFork.href, emoji: undefined as string | undefined },
    ...postMerge.map((p) => ({ mascot: p.mascot, name: p.nickname, fullName: p.fullName, date: p.date, blurb: p.blurb, href: p.href, emoji: p.mascotEmoji })),
  ];
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
            {/* CL track */}
            <line x1={CL_BADGES[0].x - 60} y1={816 - CY0} x2={4080} y2={816 - CY0} className="track" />
            <path d={`M 4080 ${816 - CY0} Q 4145 ${828 - CY0} 4190 ${885 - CY0}`} className="track" />
            {/* EL dots at exact source positions */}
            {EL_DOTS.map((x) => (
              <rect key={x} x={x - 6} y={EL_DOT_Y - 9 - CY0} width="12" height="18" rx="6" className="track-dot" />
            ))}
            {EL_RISE_DOTS.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x - 6} y={y - 9 - CY0} width="12" height="18" rx="6" className="track-dot" />
            ))}
            {/* post-merge track */}
            <line x1={660} y1={1802 - CY0} x2={4500} y2={1802 - CY0} className="track" />
          </svg>

          {/* labels */}
          <span className="layer-label layer-label-cl" style={{ left: px(3980), top: py(745) }}>consensus layer</span>
          <span className="layer-label layer-label-el" style={{ left: px(1700), top: py(1080) }}>execution layer</span>
          {EL_YEARS.map(({ year, x }) => (
            <span key={year} className="year-label" style={{ left: px(x), top: py(862) }}>{year}</span>
          ))}
          {POST_YEARS.map(({ year, x }) => (
            <span key={year} className="year-label" style={{ left: px(x), top: py(1645) }}>{year}</span>
          ))}

          {/* pre-merge EL badges (source sprites) */}
          {preMergeEL.map((f, i) => {
            const b = EL_BADGES[i];
            return (
              <a key={f.name} className={`badge-sprite ${tipAlign(b.x)}`}
                style={{ left: px(b.x), top: py(b.y), width: px(b.w) }}
                href={`${historyBase}#${f.anchor}`} target="_blank" rel="noopener noreferrer"
                aria-label={`${f.name}, ${f.date}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/upgrades/el-${i + 1}.png`} alt="" />
                <Tip title={f.name} sub={f.date} />
              </a>
            );
          })}

          {/* pre-merge CL badges */}
          {preMergeCL.map((f, i) => {
            const b = CL_BADGES[i];
            return (
              <a key={f.name} className={`badge-sprite ${tipAlign(b.x)}`}
                style={{ left: px(b.x), top: py(b.y), width: px(b.w) }}
                href={`${historyBase}#${f.anchor}`} target="_blank" rel="noopener noreferrer"
                aria-label={`${f.name}, ${f.date}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/upgrades/cl-${i + 1}.png`} alt="" />
                <Tip title={f.name} sub={f.date} />
              </a>
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
            <Tip title={mergeFork.name} sub={`${mergeFork.fullName} · ${mergeFork.date}`} detail={mergeFork.blurb} />
          </button>
          <button className={`badge-sprite merge-sprite tip-left ${selected === 0 ? "selected" : ""}`}
            style={{ left: px(MERGE_L.x), top: py(MERGE_L.y), width: px(MERGE_L.w) }}
            onClick={() => toggle(0)}
            aria-label={`${mergeFork.name}, ${mergeFork.date}`}
            aria-expanded={selected === 0}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/upgrades/merge-pill-left.png" alt="" />
            <span className="merge-date-label" aria-hidden="true">15 SEP</span>
            <Tip title={mergeFork.name} sub={`${mergeFork.fullName} · ${mergeFork.date}`} detail={mergeFork.blurb} />
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
                <Tip title={f.nickname} sub={`${f.fullName} · ${f.date}`} detail={f.blurb} />
              </button>
            );
          })}
        </div>

      {/* detail dropdown: opens when a post-merge item is clicked */}
      <div className={`fork-detail ${active ? "open" : ""}`} aria-hidden={!active}>
        {active && (
          <div className="fork-detail-inner">
            {active.mascot ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={active.mascot} alt="" className="fork-detail-mascot" />
            ) : (
              <span className="fork-detail-mascot fork-detail-placeholder" aria-hidden="true">{active.emoji ?? "?"}</span>
            )}
            <div className="fork-detail-body">
              <div className="fork-detail-head">
                <b>{active.name}</b>
                <span>{active.fullName} · {active.date}</span>
              </div>
              <p>{active.blurb}</p>
              <a href={active.href} target="_blank" rel="noopener noreferrer" className="link-blue">
                Open the primary record ↗
              </a>
            </div>
            <button className="fork-detail-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
          </div>
        )}
      </div>

      <p className="timeline-note">
        Artwork geometry preserved from the original illustration. Hover any badge
        for its full name; click a post-merge badge for the feature it shipped.
      </p>
    </div>
  );
}
