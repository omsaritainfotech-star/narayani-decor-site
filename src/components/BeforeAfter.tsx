
"use client";

import React from "react";

export default function BeforeAfter({ before, after }:{ before: string; after: string; }) {
  const [pos, setPos] = React.useState(50);
  return (
    <div className="relative w-full overflow-hidden rounded-xl border">
      <img src={after} alt="After" className="block w-full" />
      <img src={before} alt="Before" className="absolute top:0 left-0 h-full" style={{ width: `${pos}%`, objectFit: "cover", top: 0 }} />
      <input
        type="range"
        min={0} max={100} value={pos}
        onChange={(e)=>setPos(parseInt(e.target.value))}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/2"
        aria-label="Before After Slider"
      />
    </div>
  );
}
