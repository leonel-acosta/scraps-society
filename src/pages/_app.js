import "@/styles/globals.css";
import localFont from "next/font/local";
import Layout from "@/components/Layout";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Layout>
      <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Footer />      
      </SessionProvider>
    </Layout>
  );
}
