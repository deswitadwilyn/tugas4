import { useState, useEffect, useRef } from "react";

const palettes = [
  { bg: "#fdf6ff", ac: "#7F77DD" },
  { bg: "#f0fdf8", ac: "#1D9E75" },
  { bg: "#fff8f0", ac: "#D85A30" },
  { bg: "#f0f8ff", ac: "#378ADD" },
  { bg: "#fff0f6", ac: "#D4537E" },
  { bg: "#fffbf0", ac: "#BA7517" },
  { bg: "#f5f4f0", ac: "#5F5E5A" },
  { bg: "#f2fae8", ac: "#639922" },
  { bg: "#fff0ee", ac: "#993C1D" },
  { bg: "#f0eeff", ac: "#534AB7" },
];

const SCORE = 30;
const MAX = 100;
const RADIUS = 50;
const CIRC = 2 * Math.PI * RADIUS;

const Chip = ({ label, color }: { label: string; color: string }) => (
  <span
    style={{
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "4px 12px",
      borderRadius: 99,
      background: color === "purple" ? "#EEEDFE"
        : color === "teal" ? "#E1F5EE"
        : color === "amber" ? "#FAEEDA"
        : "#FBEAF0",
      color: color === "purple" ? "#534AB7"
        : color === "teal" ? "#0F6E56"
        : color === "amber" ? "#854F0B"
        : "#993556",
    }}
  >
    {label}
  </span>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      padding: "1.5rem 1.25rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      border: "0.5px solid #e8e0f8",
    }}
  >
    {children}
  </div>
);

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [paletteIdx, setPaletteIdx] = useState(0);
  const [bump, setBump] = useState(false);
  const [arcOffset, setArcOffset] = useState(CIRC);

  const palette = palettes[paletteIdx];

  useEffect(() => {
    const t = setTimeout(() => setArcOffset(CIRC * (1 - SCORE / MAX)), 300);
    return () => clearTimeout(t);
  }, []);

  const updateCount = (n: number) => {
    setCount(n);
    setBump(true);
    setTimeout(() => setBump(false), 160);
  };

  return (
    <div
      style={{
        background: palette.bg,
        minHeight: "100vh",
        padding: "1.5rem",
        fontFamily: "sans-serif",
        transition: "background 0.3s ease",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: 500,
          color: "#3C3489",
          marginBottom: "1.5rem",
        }}
      >
        Dashboard Interaktif
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {/* Counter */}
        <Card>
          <Chip label="Counter" color="purple" />
          <div
            style={{
              fontSize: 64,
              fontWeight: 500,
              color: "#534AB7",
              lineHeight: 1,
              transition: "transform 0.15s",
              transform: bump ? "scale(1.15)" : "scale(1)",
            }}
          >
            {count}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {["-", "+"].map((sym, i) => (
              <button
                key={sym}
                disabled={i === 0 && count <= 0}
                onClick={() => i === 0 ? updateCount(count - 1) : updateCount(count + 1)}
                style={{
                  width: 48, height: 48, borderRadius: "50%",
                  border: "1.5px solid #AFA9EC",
                  background: "#EEEDFE", fontSize: 22, fontWeight: 500,
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "#534AB7",
                  opacity: i === 0 && count <= 0 ? 0.3 : 1,
                }}
              >
                {sym}
              </button>
            ))}
          </div>
          <span
            style={{
              fontSize: 12,
              color: "#993556",
              minHeight: 16,
              visibility: count <= 0 ? "visible" : "hidden",
            }}
          >
            Tidak boleh minus!
          </span>
        </Card>

        {/* Greeting */}
        <Card>
          <Chip label="Greeting" color="pink" />
          <p
            style={{
              fontSize: 20, fontWeight: 500,
              textAlign: "center", minHeight: 28, color: "#3C3489",
            }}
          >
            {name ? (
              <>Halo, <span style={{ color: "#D4537E" }}>{name}</span>!</>
            ) : (
              <span style={{ color: "#AFA9EC", fontWeight: 400, fontSize: 16 }}>
                Siapa namamu?
              </span>
            )}
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            placeholder="Ketik nama kamu..."
            style={{
              width: "100%", border: "1.5px solid #CECBF6",
              borderRadius: 10, padding: "10px 14px", fontSize: 15,
              background: "#EEEDFE", color: "#3C3489", outline: "none",
              fontFamily: "sans-serif",
            }}
          />
        </Card>

        {/* Score */}
        <Card>
          <Chip label="Skor kamu" color="teal" />
          <div style={{ position: "relative", width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#E1F5EE" strokeWidth="12" />
              <circle
                cx="60" cy="60" r={RADIUS} fill="none"
                stroke="#1D9E75" strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={arcOffset}
                transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>
            <div
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)", textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 500, color: "#0F6E56" }}>{SCORE}</div>
              <div style={{ fontSize: 13, color: "#5DCAA5" }}>/ {MAX}</div>
            </div>
          </div>
          <div
            style={{
              width: "100%", background: "#E1F5EE",
              borderRadius: 99, height: 10, overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%", borderRadius: 99,
                background: "#1D9E75", width: `${SCORE}%`,
                transition: "width 0.8s ease",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "Logika baik", bg: "#E1F5EE", color: "#0F6E56" },
              { label: "Perlu latihan", bg: "#FAEEDA", color: "#854F0B" },
              { label: "Tingkatkan terus", bg: "#FBEAF0", color: "#993556" },
            ].map((b) => (
              <span
                key={b.label}
                style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 99,
                  fontWeight: 500, background: b.bg, color: b.color,
                }}
              >
                {b.label}
              </span>
            ))}
          </div>
        </Card>

        {/* Palette */}
        <Card>
          <Chip label="Tema warna" color="amber" />
          <div
            style={{
              width: "100%", height: 8, borderRadius: 99,
              background: palette.ac, transition: "background 0.3s",
            }}
          />
          <div
            style={{
              display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8, width: "100%",
            }}
          >
            {palettes.map((p, i) => (
              <div
                key={i}
                onClick={() => setPaletteIdx(i)}
                style={{
                  height: 34, borderRadius: 8, background: p.ac, cursor: "pointer",
                  border: `2.5px solid ${i === paletteIdx ? "#3C3489" : "transparent"}`,
                  transition: "transform 0.12s, border 0.12s",
                  transform: i === paletteIdx ? "scale(1.08)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}