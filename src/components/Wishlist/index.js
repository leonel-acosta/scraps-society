import PostCard from "@/components/PostCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Wishlist({ user }) {
  const { status: sessionStatus, data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/api/posts` : null, id ? fetcher : null);
  const posts = data;

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const wishlistPosts = posts.filter((post) => post.wishlist.includes(user));

  return (
    <>
      <section>
        <h3 className="text-center mb-5">Wishlist</h3>
        <div className="flex flex-row justify-center">
          <div className="flex justify-center">
            <ul role="list">
              {wishlistPosts.map((post) => (
                <li key={post._id}>
                  <Link href={`/posts/${post._id}`}>
                    <PostCard
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
                      status={post.status}
                      wishlist={post.wishlist}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
