import type { CSSProperties } from "react";

export type ConsoleLine = { tag: string; text: string };

interface StatusConsoleProps {
  lines: readonly ConsoleLine[];
  title?: string;
  command?: string;
  style?: CSSProperties;
}

// The console reads as a live log of the coordination work. The tag names the stream a line
// came from, so a reader can tell a call summary from an EIP decision at a glance.
export default function StatusConsole({
  lines,
  title = "ethcoordinate — status",
  command = "coordinate status --live",
  style,
}: StatusConsoleProps) {
  return (
    <div className="terminal" style={style}>
      <div className="terminal-bar">
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        <div className="t-line"><span className="t-prompt">&rarr;</span><span className="t-cmd">{command}</span></div>
        {lines.map((line) => (
          <div key={`${line.tag}:${line.text}`} className="t-out"><span className="t-tag">{line.tag}</span><span>{line.text}</span></div>
        ))}
        <div className="t-line"><span className="t-prompt">&rarr;</span><span className="cursor" /></div>
      </div>
    </div>
  );
}
