import localFont from "next/font/local";

export const breathFont = localFont({
  src: [{ path: "../public/fonts/Breath of the House.woff2", weight: "400", style: "normal" }],
  variable: "--font-breath",
  display: "swap",
});
