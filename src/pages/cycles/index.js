import CycleCard from "@/components/CycleCard";
import Link from "next/link";
import useSWR from "swr";

export default function CyclesPage() {
  const { data: posts, error } = useSWR("/api/posts", async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  });

  if (error) return <p>Error loading posts.</p>;
  if (!posts) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-center">CYCLES</h1>
      <div className="flex justify-center">
        <ul role="list">
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/cycles/${post._id}`}>
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
