import "@/styles/globals.css";
import localFont from "next/font/local";
import Layout from "@/components/Layout";
import { NextAuthProvider } from "./Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import useSWR from "swr";

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

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: posts, error } = useSWR("/api/posts", fetcher);

  const filteredData = posts
    ? posts.filter((item) =>
        ["title", "address", "city", "category"].some((key) =>
          item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  if (error) return <p>Error loading posts.</p>;
  if (!posts) return <p>Loading...</p>;

  return (
    <NextAuthProvider session={session}>
      <Layout>
        <Header onChange={handleChange} searchTerm={searchTerm} />
        <Component {...pageProps} posts={posts} filteredData={filteredData} />
        <Footer />
      </Layout>
    </NextAuthProvider>
  );
}
