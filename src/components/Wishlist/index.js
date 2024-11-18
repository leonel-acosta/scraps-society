import PostCard from "@/components/PostCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Wishlist() {
  const { status: sessionStatus, data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/api/posts` : null, id ? fetcher : null);
  const posts = data;

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const wishlistPosts = session
    ? posts.filter((post) => post.wishlist.includes(session.user.id))
    : [];

  return (
    <>
      <section>
        <h1 className="text-center">Wishlist</h1>
        <container className="flex flex-row justify-center">
          <div className="flex justify-center w-3/4">
            <ul role="list">
              {wishlistPosts.map((post) => (
                <li key={post.id}>
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
        </container>
      </section>
    </>
  );
}
