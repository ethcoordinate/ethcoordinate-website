import { initiatives } from "@/data/site";

const CX = 350;
const CY = 275;
const ARM_R = 200;
const HUB_R = 66;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export default function InitiativesDiagram() {
  const step = 360 / initiatives.length;
  const arms = initiatives.map((initiative, i) => {
    const angle = -90 + i * step;
    const rad = toRad(angle);
    const end = {
      x: Math.round(CX + ARM_R * Math.cos(rad)),
      y: Math.round(CY + ARM_R * Math.sin(rad)),
    };
    // Bow each arm sideways from its midpoint, alternating direction, for the tentacle curl.
    const mid = ARM_R * 0.5;
    const perp = (i % 2 === 0 ? 1 : -1) * 45;
    const ctrl = {
      x: Math.round(CX + mid * Math.cos(rad) + perp * Math.cos(rad + Math.PI / 2)),
      y: Math.round(CY + mid * Math.sin(rad) + perp * Math.sin(rad + Math.PI / 2)),
    };
    const norm = ((angle % 360) + 360) % 360;
    const isTopBottom = (norm > 250 && norm < 290) || (norm > 70 && norm < 110);
    const isLeft = norm > 110 && norm < 250;
    const anchor: "middle" | "end" | "start" = isTopBottom ? "middle" : isLeft ? "end" : "start";
    const offset = isTopBottom ? 26 : 18;
    const label = { x: end.x + offset * Math.cos(rad), y: end.y + offset * Math.sin(rad) };
    const [first, ...rest] = initiative.title.split(" ");
    const lines = rest.length ? [first, rest.join(" ")] : [first];
    return { initiative, end, ctrl, anchor, label, lines };
  });

  return (
    <div className="coord-diagram" style={{ maxWidth: 700, margin: "0 auto" }}>
      <svg viewBox="0 0 700 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="initiatives-diagram-title initiatives-diagram-desc">
        <title id="initiatives-diagram-title">EthCoordinate initiatives</title>
        <desc id="initiatives-diagram-desc">An octopus diagram showing the {initiatives.length} initiatives EthCoordinate works on: {initiatives.map((i) => i.title).join(", ")}.</desc>

        {/* Tentacle paths */}
        {arms.map(({ initiative, end, ctrl }) => (
          <path key={initiative.id} className="tentacle" d={`M${CX} ${CY} Q${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`} style={{ stroke: initiative.color }} strokeWidth="2.5" opacity="0.6" aria-hidden="true" />
        ))}

        {/* Pulse ring */}
        <circle cx={CX} cy={CY} r={HUB_R + 6} className="coord-pulse" style={{ stroke: "var(--coord-cyan)" }} strokeWidth="1" aria-hidden="true" />

        {/* Central octopus body */}
        <circle cx={CX} cy={CY} r={HUB_R} className="coord-node-bg" style={{ stroke: "var(--coord-cyan)" }} strokeWidth="1.5" aria-hidden="true" />
        {/* Octopus face */}
        <circle cx={CX - 11} cy={CY - 20} r="3.5" style={{ fill: "var(--coord-cyan)" }} opacity="0.9" aria-hidden="true" />
        <circle cx={CX + 11} cy={CY - 20} r="3.5" style={{ fill: "var(--coord-cyan)" }} opacity="0.9" aria-hidden="true" />
        <circle cx={CX - 11} cy={CY - 20} r="1.4" style={{ fill: "var(--color-bg-deep, #0a0a14)" }} aria-hidden="true" />
        <circle cx={CX + 11} cy={CY - 20} r="1.4" style={{ fill: "var(--color-bg-deep, #0a0a14)" }} aria-hidden="true" />
        <text x={CX} y={CY + 12} textAnchor="middle" style={{ fill: "var(--coord-cyan)" }} fontSize="13" fontWeight="700" letterSpacing="0.04em" aria-hidden="true">EthCoordinate</text>

        {/* Endpoint dots + labels (linked when the initiative has a page) */}
        {arms.map(({ initiative, end, anchor, label, lines }) => {
          const labelEls = (
            <>
              <circle cx={end.x} cy={end.y} r="5" style={{ fill: initiative.color }} opacity="0.8" />
              {lines.length === 1 ? (
                <text className="coord-arm-label" x={label.x} y={label.y + 4} textAnchor={anchor} style={{ fill: initiative.color }} fontSize="13" fontWeight="600">{lines[0]}</text>
              ) : (
                <>
                  <text className="coord-arm-label" x={label.x} y={label.y - 5} textAnchor={anchor} style={{ fill: initiative.color }} fontSize="13" fontWeight="600">{lines[0]}</text>
                  <text className="coord-arm-label" x={label.x} y={label.y + 9} textAnchor={anchor} style={{ fill: initiative.color }} fontSize="13" fontWeight="600">{lines[1]}</text>
                </>
              )}
            </>
          );
          return initiative.href ? (
            <a key={initiative.id} href={initiative.href} className="coord-arm-link"
              {...(initiative.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <g>{labelEls}</g>
            </a>
          ) : (
            <g key={initiative.id} aria-hidden="true">{labelEls}</g>
          );
        })}
      </svg>

      {/* Readable legend for small screens, which replaces the in-diagram labels */}
      <ul className="coord-mobile-list">
        {initiatives.map((initiative) => (
          <li key={initiative.id} style={{ "--initiative-color": initiative.color } as React.CSSProperties}>
            {initiative.href ? (
              <a href={initiative.href} {...(initiative.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {initiative.title}
              </a>
            ) : initiative.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
