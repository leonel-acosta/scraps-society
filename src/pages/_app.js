import "@/styles/globals.css";
import localFont from "next/font/local";

const chivo = localFont({
  src: "./fonts/Chivo-VariableFont_wght.ttf",
  variable: "--font-chivo",
  weight: "100 900",
});
const chivoMono = localFont({
  src: "./fonts/ChivoMono-VariableFont_wght.ttf",
  variable: "--font-chivo-mono",
  weight: "100 900",
});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
