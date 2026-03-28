import { ImageResponse } from "next/og";

import { siteContent } from "@/lib/content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "linear-gradient(135deg, #07111a 0%, #0f1f33 45%, #102d2a 100%)",
          color: "#edf5ff",
          padding: 64,
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(83, 201, 187, 0.28), transparent 34%), radial-gradient(circle at 80% 20%, rgba(215, 185, 131, 0.22), transparent 26%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}>
          <div
            style={{
              display: "flex",
              height: 72,
              width: 72,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              background: "#edf5ff",
              color: "#07111a",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            BS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 18, letterSpacing: 6, textTransform: "uppercase", color: "#99aec5" }}>
              Senior Backend Engineer / Tech Lead
            </div>
            <div style={{ fontSize: 24, fontWeight: 600 }}>{siteContent.profile.name}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 900, position: "relative" }}>
          <div style={{ fontSize: 62, lineHeight: 1.05, fontWeight: 600 }}>
            Payments, fintech, cloud architecture, and backend systems that need to stay reliable under pressure.
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.5, color: "#c7d7e8" }}>
            Java / Spring Boot / AWS / Microservices / Distributed Systems / Technical Leadership
          </div>
        </div>
      </div>
    ),
    size,
  );
}
