import CycleCard from "@/components/CycleCard";
import useSWR from "swr";
import { useState, useEffect } from "react";

export default function CyclesPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function startFetching() {
      const response = await fetch("/api/posts");
      const posts = await response.json();
      console.log(posts);
      setPosts(posts);
    }

    startFetching();
  }, []);

  return (
    <>
      <h1>CYCLES</h1>
      <ul role="list">
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <CycleCard title={post.id} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
