// app/api/og/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

function cleanTitle(input: string) {
  // Quita saltos de línea y recorta espacios; límite duro 80 chars
  return input.replace(/[\r\n]+/g, " ").trim().slice(0, 80);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get("title") || "Òrbita Events";
    const title = cleanTitle(raw);

    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px",
            background: "#0a0a0b",
            color: "white"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(60% 40% at 50% 60%, rgba(215,184,110,0.18), transparent 70%)",
              filter: "blur(60px)"
            }}
          />
          <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 9999,
                background: "#d7b86e"
              }}
            />
            <div style={{ fontSize: 28, opacity: 0.85 }}>Òrbita Events</div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (err) {
    // En OG conviene no romper: devuelve imagen de fallback
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0b",
            color: "white",
            fontSize: 42,
            fontWeight: 800
          }}
        >
          Òrbita Events
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
