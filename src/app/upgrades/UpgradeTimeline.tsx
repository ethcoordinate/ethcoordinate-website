'use client'

import { preMergeEL, preMergeCL, mergeFork, postMerge, historyBase, type PreMergeFork } from "@/data/upgrades";
import "./upgrades.css";

/* Faithful interactive rebuild of the upgrades illustration:
   dotted tracks, numbered badges, rotated dates, the merge loop,
   mascots on the timeline. Schematic spacing; full names on hover.
   Fixed internal coordinate space (1100x600), SVG tracks + HTML nodes. */

const W = 1100;
const H = 600;

const EL_Y = 200;
const EL_X0 = 60;
const EL_X1 = 820;
const CL_Y = 95;
const CL_X0 = 570;
const CL_X1 = 800;
const MERGE = { x: 895, y: 150 };
const POST_Y = 360;
const POST_XS = [100, 280, 460, 640, 820, 1000];

const YEAR_LABELS = [
  { year: "2016", i: 2 },
  { year: "2017", i: 6 },
  { year: "2018", i: 6.55 },
  { year: "2019", i: 7 },
  { year: "2020", i: 9 },
  { year: "2021", i: 10 },
  { year: "2022", i: 13 },
];

const px = (x: number) => `${(x / W) * 100}%`;
const py = (y: number) => `${(y / H) * 100}%`;
const elX = (i: number) => EL_X0 + i * ((EL_X1 - EL_X0) / (preMergeEL.length - 1));
const tipAlign = (x: number) => (x < 140 ? "tip-left" : x > W - 140 ? "tip-right" : "");

function PreMergeBadge({ fork, x, y, n, layer }: { fork: PreMergeFork; x: number; y: number; n: number; layer: "el" | "cl" }) {
  return (
    <a
      className={`pm-badge pm-badge-${layer} ${tipAlign(x)}`}
      style={{ left: px(x), top: py(y) }}
      href={`${historyBase}#${fork.anchor}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${fork.name}, ${fork.date}`}
    >
      <span className="pm-badge-num">{n}</span>
      <span className="pm-date" aria-hidden="true">{fork.date}</span>
      <span className={`pm-tip ${layer === "cl" ? "tip-below" : ""}`} role="tooltip">
        <b>{fork.name}</b>
        <small>{fork.date}</small>
      </span>
    </a>
  );
}

function Legend() {
  return (
    <details className="legend-drawer">
      <summary>
        legend
        <span className="legend-chevron" aria-hidden="true">⌄</span>
      </summary>
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
    </details>
  );
}

export default function UpgradeTimeline() {
  return (
    <div className="upgrades-root">
      <Legend />

      <div className="timeline-scroll">
        <div className="timeline" role="img" aria-label="Interactive timeline of Ethereum upgrades from Frontier in 2015 to Hegota">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="var(--color-border-hover)" strokeWidth="1.6" />
              </marker>
            </defs>
            {/* execution layer track */}
            <line x1={EL_X0} y1={EL_Y} x2={EL_X1} y2={EL_Y} className="track" />
            {/* consensus layer track */}
            <line x1={CL_X0} y1={CL_Y} x2={CL_X1} y2={CL_Y} className="track" />
            {/* convergence into the merge */}
            <path d={`M ${EL_X1} ${EL_Y} C 855 ${EL_Y}, 858 182, 866 166`} className="track curve" />
            <path d={`M ${CL_X1} ${CL_Y} C 845 ${CL_Y}, 858 118, 866 134`} className="track curve" />
            {/* the loop back to the post-merge row */}
            <path d={`M ${MERGE.x} 176 C 975 235, 985 305, 915 325 C 800 352, 220 352, 76 358`} className="track curve loop" markerEnd="url(#loop-arrow)" />
            {/* post-merge track */}
            <line x1={POST_XS[0]} y1={POST_Y} x2={1060} y2={POST_Y} className="track" />
          </svg>

          {/* track + year labels */}
          <span className="layer-label layer-label-cl" style={{ left: px(CL_X1 + 12), top: py(CL_Y - 30) }}>consensus layer</span>
          <span className="layer-label layer-label-el" style={{ left: px(430), top: py(EL_Y + 30) }}>execution layer</span>
          {YEAR_LABELS.map(({ year, i }) => (
            <span key={year} className="year-label" style={{ left: px(elX(i)), top: py(EL_Y - 32) }}>{year}</span>
          ))}

          {/* pre-merge badges */}
          {preMergeEL.map((f, i) => (
            <PreMergeBadge key={f.name} fork={f} n={i + 1} x={elX(i)} y={EL_Y} layer="el" />
          ))}
          {preMergeCL.map((f, i) => (
            <PreMergeBadge key={f.name} fork={f} n={i + 1} x={620 + i * 140} y={CL_Y} layer="cl" />
          ))}

          {/* merge node */}
          <a
            className="merge-node"
            style={{ left: px(MERGE.x), top: py(MERGE.y) }}
            href={mergeFork.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${mergeFork.name}, ${mergeFork.date}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mergeFork.mascot} alt="" className="merge-mascot" />
            <span className="merge-pill">merge</span>
            <span className="merge-date">15 SEP</span>
            <span className="pm-tip merge-tip" role="tooltip">
              <b>{mergeFork.name}</b>
              <small>{mergeFork.fullName} · {mergeFork.date}</small>
              <em>{mergeFork.blurb}</em>
            </span>
          </a>

          {/* post-merge nodes */}
          {postMerge.map((f, i) => (
            <a
              key={f.n}
              className={`fork-node ${tipAlign(POST_XS[i])}`}
              style={{ left: px(POST_XS[i]), top: py(POST_Y) }}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${f.nickname} (${f.fullName}), ${f.date}`}
            >
              <span className="fork-badge">{f.n}</span>
              <span className="fork-nickname">{f.nickname}</span>
              <span className="fork-date">{f.date}</span>
              {f.mascot ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={f.mascot} alt="" className="fork-mascot" />
              ) : (
                <span className="fork-mascot fork-mascot-placeholder" aria-hidden="true">{f.mascotEmoji ?? "?"}</span>
              )}
              <span className="fork-blurb">{f.blurb}</span>
              <span className="pm-tip fork-tip" role="tooltip">
                <b>{f.nickname}</b>
                <small>{f.fullName} · {f.date}</small>
                <em>{f.blurb}</em>
              </span>
            </a>
          ))}

          <span className="feature-label" style={{ left: px(18), top: py(470) }}>major feature shipped →</span>
        </div>
      </div>

      <p className="timeline-note">
        Schematic view — even spacing, not to time scale. Post-merge nicknames
        are primary; full layer names (e.g. “Gloas/Amsterdam”) appear on hover.
        Click anything to open its primary record.
      </p>
    </div>
  );
}
