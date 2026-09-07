import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bruno Salgado | Senior Backend Engineer / Tech Lead",
    short_name: "Bruno Salgado",
    description:
      "Bruno Salgado: Java, Spring Boot and AWS backend engineering for payments, fintech and distributed systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c171c",
    theme_color: "#0c171c",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };
}
