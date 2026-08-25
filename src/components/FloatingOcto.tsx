"use client";

import { useState } from "react";
import Image from "next/image";
import OctoRunner from "./OctoRunner";

export default function FloatingOcto() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <button
        type="button"
        className="floating-brand-mark"
        aria-label="Open the coordination runner"
        onClick={() => setPlaying(true)}
      >
        <Image
          src="/favicon.svg"
          alt=""
          width={44}
          height={44}
          unoptimized
          style={{ objectFit: "contain" }}
        />
      </button>
      {playing && <OctoRunner onClose={() => setPlaying(false)} />}
    </>
  );
}
