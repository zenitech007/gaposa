import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1D1D52",
          padding: "60px",
          color: "#FFFFFF",
          fontFamily: "serif",
        }}
      >
        {/* 3 Rings SVG Representation */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <circle
              cx="36"
              cy="44"
              r="24"
              stroke="#B01E2E"
              strokeWidth="5"
              strokeDasharray="6 4"
            />
            <circle
              cx="62"
              cy="32"
              r="20"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeDasharray="6 4"
            />
            <circle
              cx="50"
              cy="62"
              r="22"
              stroke="#2E9E3F"
              strokeWidth="5"
              strokeDasharray="6 4"
            />
          </svg>
        </div>

        {/* Institution Title */}
        <h1
          style={{
            fontSize: "52px",
            fontWeight: 600,
            margin: "0 0 12px 0",
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          {site.name}
        </h1>

        {/* Location & Descriptor */}
        <p
          style={{
            fontSize: "26px",
            color: "#DDE4DC",
            margin: "0 0 28px 0",
            fontFamily: "sans-serif",
            fontWeight: 400,
          }}
        >
          Practical Technical & Vocational Education in Ogun State, Nigeria
        </p>

        {/* Tagline Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 24px",
            borderRadius: "4px",
            border: "1.5px solid #2E9E3F",
            color: "#2E9E3F",
            fontSize: "18px",
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          National Diploma (ND) & Higher National Diploma (HND)
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
