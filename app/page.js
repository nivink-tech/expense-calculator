"use client";
import { useState } from "react";

const CX = 100;
const CY = 88;

function Gauge({ value, min, max }) {
  const valid = Number.isFinite(value) && Number.isFinite(min) && Number.isFinite(max) && max > min;
  const fraction = valid ? Math.min(Math.max((value - min) / (max - min), 0), 1) : 0;
  // 0 -> needle points left (-180°), 1 -> needle points right (0°)
  const rotation = -180 * (1 - fraction);
  const label = Number.isFinite(value) ? value.toLocaleString("en-US") : "–";

  return (
    <svg viewBox="0 0 200 125" width="400" height="250" role="img" aria-label={`Gauge showing ${label}`}>
      <defs>
        <linearGradient id="gauge-gradient" gradientUnits="userSpaceOnUse" x1="26" y1="0" x2="174" y2="0">
          <stop offset="0" stopColor="#d1301d" />
          <stop offset="0.35" stopColor="#e8741a" />
          <stop offset="0.5" stopColor="#f0a21c" />
          <stop offset="0.75" stopColor="#7fb04a" />
          <stop offset="1" stopColor="#1f8a4c" />
        </linearGradient>
      </defs>
      <path d="M26 88 A74 74 0 0 1 174 88" fill="none" stroke="url(#gauge-gradient)" strokeWidth="22" />
      <line
        x1={CX + 52}
        y1={CY}
        x2={CX + 90}
        y2={CY}
        stroke="#222"
        strokeWidth="4"
        strokeLinecap="round"
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${CX}px ${CY}px`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <text x="100" y="112" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="34" fontWeight="700" fill="#222">
        {label}
      </text>
    </svg>
  );
}

export default function Home() {
  // kept as strings so the fields can be empty or partly typed (e.g. "-")
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("2000");
  const [value, setValue] = useState("1490");

  const minN = min.trim() === "" ? NaN : Number(min);
  const maxN = max.trim() === "" ? NaN : Number(max);
  const valueN = value.trim() === "" ? NaN : Number(value);

  const rangeValid = Number.isFinite(minN) && Number.isFinite(maxN) && maxN > minN;
  const outOfRange = rangeValid && Number.isFinite(valueN) && (valueN < minN || valueN > maxN);

  return (
    <main>
      <h1>Gauge</h1>
      <Gauge value={valueN} min={minN} max={maxN} />

      <div className="fields">
        <label>
          Min
          <input type="number" value={min} onChange={(e) => setMin(e.target.value)} />
        </label>
        <label>
          Value
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
        <label>
          Max
          <input type="number" value={max} onChange={(e) => setMax(e.target.value)} />
        </label>
      </div>

      {rangeValid && (
        <input
          className="slider"
          type="range"
          min={minN}
          max={maxN}
          step="any"
          value={Number.isFinite(valueN) ? Math.min(Math.max(valueN, minN), maxN) : minN}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Value"
        />
      )}

      {!rangeValid && <p className="warn">Enter numbers where Max is greater than Min.</p>}
      {outOfRange && <p className="warn">Value is outside the range, so the needle is stopped at the end.</p>}
    </main>
  );
}
