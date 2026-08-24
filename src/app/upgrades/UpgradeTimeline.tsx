'use client'

import { preMergeEL, preMergeCL, mergeFork, postMerge, historyBase, type PreMergeFork } from "@/data/upgrades";
import "./upgrades.css";

/* Fixed internal coordinate space (960x460). The SVG draws tracks and
   curves; interactive nodes are HTML overlays at matching % positions.
   Schematic layout: even spacing, exact dates live in tooltips. */

const W = 960;
const H = 460;

const EL_Y = 170;
const EL_X0 = 40;
const EL_X1 = 660;
const CL_Y = 80;
const CL_X0 = 420;
const CL_X1 = 660;
const MERGE = { x: 745, y: 125 };
const POST_Y = 310;
const POST_XS = [80, 240, 400, 560, 720, 880];

const px = (x: number) => `${(x / W) * 100}%`;
const py = (y: number) => `${(y / H) * 100}%`;

const tipAlign = (x: number) => (x < 120 ? "tip-left" : x > W - 120 ? "tip-right" : "");

function PreMergeDot({ fork, x, y, n }: { fork: PreMergeFork; x: number; y: number; n: number }) {
  return (
    <a
      className={`pm-dot ${tipAlign(x)}`}
      style={{ left: px(x), top: py(y) }}
      href={`${historyBase}#${fork.anchor}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${fork.name}, ${fork.date}`}
    >
      <span className="pm-dot-circle" aria-hidden="true" />
      <span className="pm-tip" role="tooltip">
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
        Legend — fork names &amp; numbers
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
  const elStep = (EL_X1 - EL_X0) / (preMergeEL.length - 1);
  const clStep = (CL_X1 - CL_X0) / (preMergeCL.length - 1);

  return (
    <div className="upgrades-root">
      <Legend />

      <div className="timeline-scroll">
        <div className="timeline" role="img" aria-label="Interactive timeline of Ethereum upgrades from Frontier in 2015 to Hegota">
          {/* tracks + merge loop */}
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            {/* execution layer track */}
            <line x1={EL_X0} y1={EL_Y} x2={EL_X1} y2={EL_Y} className="track" />
            {/* consensus layer track */}
            <line x1={CL_X0} y1={CL_Y} x2={CL_X1} y2={CL_Y} className="track" />
            {/* convergence curves into the merge */}
            <path d={`M ${EL_X1} ${EL_Y} C ${EL_X1 + 40} ${EL_Y}, ${MERGE.x - 55} ${MERGE.y + 25}, ${MERGE.x - 34} ${MERGE.y + 12}`} className="track curve" />
            <path d={`M ${CL_X1} ${CL_Y} C ${CL_X1 + 40} ${CL_Y}, ${MERGE.x - 55} ${MERGE.y - 25}, ${MERGE.x - 34} ${MERGE.y - 12}`} className="track curve" />
            {/* the loop back to the post-merge row */}
            <path d={`M ${MERGE.x} ${MERGE.y + 34} C ${MERGE.x + 70} ${MERGE.y + 90}, ${POST_XS[0] - 30} 210, ${POST_XS[0] - 30} ${POST_Y}`} className="track curve loop" />
            {/* post-merge track */}
            <line x1={POST_XS[0]} y1={POST_Y} x2={POST_XS[POST_XS.length - 1] + 30} y2={POST_Y} className="track" />
          </svg>

          {/* track labels */}
          <span className="track-label" style={{ left: px(CL_X0), top: py(CL_Y - 28) }}>consensus layer</span>
          <span className="track-label" style={{ left: px(EL_X0), top: py(EL_Y - 28) }}>execution layer</span>
          <span className="range-label" style={{ left: px(EL_X0), top: py(EL_Y + 18) }}>2015</span>
          <span className="range-label" style={{ left: px(CL_X0), top: py(CL_Y + 18) }}>2020</span>
          <span className="range-label" style={{ left: px(EL_X1 - 8), top: py(EL_Y + 18) }}>2022</span>

          {/* pre-merge dots */}
          {preMergeEL.map((f, i) => (
            <PreMergeDot key={f.name} fork={f} n={i + 1} x={EL_X0 + i * elStep} y={EL_Y} />
          ))}
          {preMergeCL.map((f, i) => (
            <PreMergeDot key={f.name} fork={f} n={i + 1} x={CL_X0 + i * clStep} y={CL_Y} />
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
            <img src={mergeFork.mascot} alt="" className="mascot" />
            <span className="merge-label">merge</span>
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
              className={`post-node status-${f.status} ${tipAlign(POST_XS[i])}`}
              style={{ left: px(POST_XS[i]), top: py(POST_Y) }}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${f.nickname} (${f.fullName}), ${f.date}`}
            >
              <span className="post-card">
                {f.mascot ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={f.mascot} alt="" className="mascot" />
                ) : (
                  <span className="mascot mascot-placeholder" aria-hidden="true">{f.mascotEmoji ?? "?"}</span>
                )}
                <b>{f.nickname}</b>
                <small>{f.date}</small>
              </span>
              <span className="pm-tip post-tip" role="tooltip">
                <b>{f.nickname}</b>
                <small>{f.fullName} · {f.date}</small>
                <em>{f.blurb}</em>
              </span>
            </a>
          ))}
        </div>
      </div>

      <p className="timeline-note">
        Schematic view — even spacing, not to time scale. Hover any point for its
        name and date; click through to the primary record. Post-merge nicknames
        are primary; full layer names (e.g. “Gloas/Amsterdam”) appear on hover.
      </p>
    </div>
  );
}
