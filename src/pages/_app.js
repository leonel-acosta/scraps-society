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
  const [filterValues, setFilterValues] = useState({
    searchTerms: [],
    cycle_type: "",
    category: "",
    unit: "",
  });

  const { data: posts, error } = useSWR("/api/posts", fetcher);

  const filteredData = posts
    ? posts.filter((item) =>
        filterValues.searchTerms.every(
          (term) =>
            [
              "title",
              "category",
              "quantity",
              "unit",
              "address",
              "city",
              "country",
              "cycle_type",
              "status",
            ].some((key) =>
              item[key]?.toLowerCase().includes(term.toLowerCase())
            ) &&
            (filterValues.cycle_type === "" ||
              item.cycle_type === filterValues.cycle_type) &&
            (filterValues.category === "" ||
              item.category === filterValues.category) &&
            (filterValues.unit === "" || item.unit === filterValues.unit)
        )
      )
    : [];

  function handleFilterChange(e) {
    const { name, value } = e.target;

    setFilterValues((prev) => ({
      ...prev,
      [name]:
        name === "searchTerms"
          ? value.trim().toLowerCase().split(/\s+/)
          : value,
    }));
  }

  if (error) return <p>Error loading posts.</p>;
  if (!posts) return <p>Loading...</p>;

  return (
    <NextAuthProvider session={session}>
      <Layout>
        <Header
          onChange={(e) => handleFilterChange(e)}
          searchTerms={filterValues.searchTerms}
        />
        <Component
          {...pageProps}
          posts={posts}
          filteredData={filteredData}
          onChange={(e) => handleFilterChange(e)}
        />
        <Footer />
      </Layout>
    </NextAuthProvider>
  );
}
