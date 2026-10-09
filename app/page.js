function Gauge({ value, max = 1700 }) {
  // needle sweeps from 180° (left, value 0) to 0° (right, value max)
  const angle = Math.PI * (1 - Math.min(value / max, 1));
  const point = (r) => [100 + r * Math.cos(angle), 88 - r * Math.sin(angle)];
  const [x1, y1] = point(52);
  const [x2, y2] = point(90);

  return (
    <svg viewBox="0 0 200 125" width="400" height="250" role="img" aria-label={`Gauge showing ${value.toLocaleString("en-US")}`}>
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
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#222" strokeWidth="4" strokeLinecap="round" />
      <text x="100" y="112" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="34" fontWeight="700" fill="#222">
        {value.toLocaleString("en-US")}
      </text>
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <h1>Hello, Next.js</h1>
      <Gauge value={1490} />
    </main>
  );
}
