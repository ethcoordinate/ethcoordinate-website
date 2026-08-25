"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const chars = "01アイウエオカキクケコサシスセソタチツテト";
    const columns = Math.floor(window.innerWidth / 30);

    for (let i = 0; i < columns; i++) {
      const col = document.createElement("div");
      col.className = "rain-column";
      col.style.left = `${i * 30 + Math.random() * 15}px`;
      col.style.animationDuration = `${8 + Math.random() * 12}s`;
      col.style.animationDelay = `${Math.random() * 10}s`;
      col.style.color = Math.random() > 0.7 ? "var(--color-purple)" : "var(--color-blue)";
      col.style.opacity = `${0.1 + Math.random() * 0.2}`;

      let text = "";
      for (let j = 0; j < 30; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + "\n";
      }
      col.textContent = text;
      container.appendChild(col);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={ref} className="matrix-rain" aria-hidden="true" />;
}
