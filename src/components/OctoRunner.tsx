"use client";

import { useEffect, useRef, useCallback } from "react";

const W = 800;
const H = 250;
const GROUND = 200;
const GRAVITY = 0.55;
const JUMP = -11;
const SIZE = 44;

const PITFALLS = [
  "You're on mute",
  "EOF again",
  "One more EIP",
  "3hr ACD call",
  "Verkle soon\u2122",
  "Needs more devnets",
  "Wrong spec",
  "Interop fail",
  "Geth supermajority",
  "Blob spam",
  "Who wrote this EIP?",
  "Let's take it offline",
  "Missing tests",
  "SSZ when",
];

const COLORS = ["#00D4FF", "#A855F7", "#34D399", "#FBBF24", "#F472B6"];

interface Obstacle {
  x: number;
  w: number;
  h: number;
  label: string;
  color: string;
  passed: boolean;
}

type GameState = "idle" | "running" | "over";

interface State {
  game: GameState;
  y: number;
  vy: number;
  obstacles: Obstacle[];
  score: number;
  hi: number;
  speed: number;
  spawnIn: number;
  frame: number;
  killedBy: string;
}

export default function OctoRunner({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number>(0);
  const s = useRef<State>({
    game: "idle",
    y: GROUND - SIZE,
    vy: 0,
    obstacles: [],
    score: 0,
    hi: 0,
    speed: 4,
    spawnIn: 200,
    frame: 0,
    killedBy: "",
  });

  useEffect(() => {
    const img = new Image();
    img.src = "/favicon.svg";
    img.onload = () => {
      imgRef.current = img;
    };
    try {
      const stored = localStorage.getItem("octo-hs");
      if (stored) s.current.hi = parseInt(stored, 10);
    } catch {}
  }, []);

  const jump = useCallback(() => {
    const st = s.current;
    if (st.game === "idle" || st.game === "over") {
      st.game = "running";
      st.y = GROUND - SIZE;
      st.vy = JUMP;
      st.obstacles = [];
      st.score = 0;
      st.speed = 4;
      st.spawnIn = 150;
      st.frame = 0;
    } else if (st.game === "running" && st.y >= GROUND - SIZE - 1) {
      st.vy = JUMP;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump, onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const spawn = () => {
      const h = 30 + Math.random() * 40;
      const w = 20 + Math.random() * 15;
      s.current.obstacles.push({
        x: W + 20,
        w, h,
        label: PITFALLS[Math.floor(Math.random() * PITFALLS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        passed: false,
      });
    };

    const update = () => {
      const st = s.current;
      if (st.game !== "running") return;

      st.frame++;
      st.vy += GRAVITY;
      st.y += st.vy;
      if (st.y >= GROUND - SIZE) { st.y = GROUND - SIZE; st.vy = 0; }

      st.speed = 4 + st.score * 0.02;
      if (st.speed > 12) st.speed = 12;

      for (const o of st.obstacles) {
        o.x -= st.speed;
        if (!o.passed && o.x + o.w < 50) { o.passed = true; st.score++; }
      }

      st.obstacles = st.obstacles.filter(o => o.x + o.w > -20);

      st.spawnIn -= st.speed;
      if (st.spawnIn <= 0) {
        spawn();
        st.spawnIn = 200 + Math.random() * 300 - st.score * 2;
        if (st.spawnIn < 120) st.spawnIn = 120;
      }

      // collision (shrunk hitbox for fairness)
      const ox = 50 + 8, oy = st.y + 8, ow = SIZE - 16, oh = SIZE - 16;
      for (const o of st.obstacles) {
        if (ox < o.x + o.w && ox + ow > o.x && oy + oh > GROUND - o.h) {
          st.game = "over";
          st.killedBy = o.label;
          if (st.score > st.hi) {
            st.hi = st.score;
            try { localStorage.setItem("octo-hs", String(st.score)); } catch {}
          }
        }
      }
    };

    const draw = () => {
      const st = s.current;

      ctx.fillStyle = "#000004";
      ctx.fillRect(0, 0, W, H);

      // ground
      ctx.strokeStyle = "#1E3A5F";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, GROUND);
      ctx.lineTo(W, GROUND);
      ctx.stroke();
      ctx.setLineDash([]);

      // ground particles
      if (st.game === "running") {
        ctx.fillStyle = "#1E3A5F";
        for (let i = 0; i < 12; i++) {
          const x = ((i * 70 - st.frame * st.speed * 0.3) % (W + 70) + W + 70) % (W + 70);
          ctx.fillRect(x, GROUND + 8, 16, 1);
        }
      }

      // EthCoordinate mark
      const bobble = st.game === "running" && st.y >= GROUND - SIZE
        ? Math.sin(st.frame * 0.15) * 2 : 0;
      if (imgRef.current) {
        ctx.drawImage(imgRef.current, 50, st.y + bobble, SIZE, SIZE);
      } else {
        ctx.fillStyle = "#00D4FF";
        ctx.beginPath();
        ctx.arc(50 + SIZE / 2, st.y + bobble + SIZE / 2, SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // obstacles
      for (const o of st.obstacles) {
        const oy = GROUND - o.h;
        ctx.strokeStyle = o.color;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(o.x, oy, o.w, o.h);
        ctx.fillStyle = o.color + "18";
        ctx.fillRect(o.x, oy, o.w, o.h);
        // top accent line
        ctx.fillStyle = o.color;
        ctx.fillRect(o.x, oy, o.w, 2);
      }

      // score
      ctx.font = "bold 14px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#00D4FF";
      ctx.textAlign = "right";
      ctx.fillText(String(st.score), W - 20, 30);
      if (st.hi > 0) {
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#1E3A5F";
        ctx.fillText(`HI ${st.hi}`, W - 20, 46);
      }

      // state text
      if (st.game === "idle") {
        ctx.textAlign = "center";
        ctx.font = "bold 16px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#F0F6FF";
        ctx.fillText("PRESS SPACE TO START", W / 2, H / 2 - 10);
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#9C9C9C";
        ctx.fillText("dodge the protocol pitfalls", W / 2, H / 2 + 14);
      }
      if (st.game === "over") {
        ctx.textAlign = "center";
        ctx.font = "bold 16px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#F0F6FF";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 20);
        ctx.font = "12px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#A855F7";
        ctx.fillText(`taken out by: ${st.killedBy}`, W / 2, H / 2 + 4);
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#9C9C9C";
        ctx.fillText("press space to retry", W / 2, H / 2 + 24);
      }
    };

    const loop = () => {
      update();
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: "1rem",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={jump}
        style={{
          maxWidth: "min(800px, calc(100vw - 2rem))",
          width: "100%",
          height: "auto",
          borderRadius: 6,
          border: "1px solid #1E3A5F",
          cursor: "pointer",
        }}
      />
      <button
        onClick={onClose}
        style={{
          background: "none", border: "1px solid #1E3A5F",
          color: "#9C9C9C", fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem", padding: "0.4rem 1rem",
          borderRadius: 4, cursor: "pointer",
        }}
      >
        ESC to close
      </button>
    </div>
  );
}
