import { ImageResponse } from "next/og";

export const alt =
  "Bruno Salgado. Tech Lead and Senior Backend Engineer. Java, Spring Boot and AWS.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        color: "#edf2ec",
        background: "linear-gradient(120deg, #0c171c, #183930)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 62,
            height: 62,
            border: "1px solid #89d1b7",
            borderRadius: 40,
            fontSize: 24,
          }}
        >
          BS
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#a7b9bd" }}>
          brunosalgado.dev
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          Bruno Salgado
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 14 }}>
          Tech Lead & Senior Backend Engineer
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          borderTop: "1px solid #476269",
          paddingTop: 28,
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#89d1b7" }}>
          Java / Spring Boot / AWS
        </div>
        <div style={{ display: "flex", fontSize: 23, color: "#a7b9bd" }}>
          Payments, fintech & distributed systems
        </div>
      </div>
    </div>,
    size,
  );
}
