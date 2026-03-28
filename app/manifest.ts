import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bruno Salgado | Senior Backend Engineer / Tech Lead",
    short_name: "Bruno Salgado",
    description:
      "Premium personal portfolio for Bruno Salgado, a senior backend engineer and tech lead focused on fintech, payments, and distributed systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#07111a",
    theme_color: "#07111a",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };
}
