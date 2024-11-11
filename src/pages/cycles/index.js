import CycleCard from "@/components/CycleCard";
import Link from "next/link";
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
      <div className="container flex justify-center">
        <ul role="list">
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`./cycles/${post._id}`}>
                  <CycleCard
                    id={post._id}
                    title={post.title}
                    address={post.address}
                    city={post.city}
                    zipcode={post.zipcode}
                    quantity={post.quantity}
                    unit={post.unit}
                    category={post.category}
                    cycle_type={post.cycle_type}
                    image={post.image_url}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
