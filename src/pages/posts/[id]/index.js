import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "@/components/Button";
import TransactionForm from "@/components/TransactionForm";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UserCard from "@/components/UserCard";
import Badge from "@/components/Badge";
import Tag from "@/components/Tag";
import WishlistButton from "@/components/WishlistButton";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PostPage() {
  const { status: sessionStatus, data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `/api/posts/${id}` : null,
    id ? fetcher : null
  );
  const post = data;
  console.log("Post info", post);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  async function editPost(updatedPost) {
    console.log("updatedPost", updatedPost);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        console.log("Post successfully updated");
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  async function onToggleWishlist(wishlist) {
    console.log("userId toggle", wishlist);
    try {
      const response = await fetch(`/api/posts/${id}/wishlist`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wishlist }),
      });

      if (response.ok) {
        console.log("Post successfully updated");
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  async function deletePost() {
    const confirmDelete = window.confirm(
      "Do you want to delete your post permanentely?"
    );
    if (confirmDelete) {
      console.log("delete");
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      router.push("/posts");
      console.log("Post", post.id, "succesfully deleted");
    }
  }

  return (
    <>
      <Header />
      <section className="flex justify-center">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 justify-center lg:w-3/4 p-10 m-5 lg:m-5 bg-secondary rounded-lg">
          <div className="lg:w-2/4 relative">
            <Badge cycle_type={post.cycle_type} text={post.cycle_type} />
            <Image
              src={post.image_url}
              width={500}
              height={500}
              alt={post.title}
              sizes="260px"
              style={{
                width: "500px",
                height: "500px",
                objectFit: "cover",
              }}
              className="rounded-lg text-center"
            />
          </div>
          <div className="lg:w-2/4 flex flex-col py-4 gap-5 relative">
            <Tag text={post.status} />
            <h2 className="uppercase mb-2">{post.title}</h2>
            <h5>
              {post.address},{post.zipcode}, {post.city} | {post.country}
            </h5>
            <ul>
              <li>Category: {post.category}</li>
              <li>
                Quantity: {post.quantity} {post.unit}
              </li>
            </ul>
            <WishlistButton onClick={onToggleWishlist} post={post} />

            <UserCard
              user={post.created_by}
              status={post.status}
              type={post.cycle_type}
            />
            <TransactionForm post={post} onClick={editPost} />
            {session && session.user.id === post.created_by ? (
              <Button onClick={deletePost} text="delete"></Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="flex flex-col gap-5 justify-center lg:w-3/4 p-10 m-5 lg:m-5 bg-secondary rounded-lg">
          <h3>Description</h3>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec
            arcu nibh. Maecenas et tellus posuere nunc tincidunt ultricies eget
            quis quam. Cras scelerisque congue odio id lacinia. Ut ultrices, dui
            ac scelerisque dictum, magna tellus imperdiet sapien, eget posuere
            magna tortor a urna. Aliquam lobortis, quam non maximus gravida, sem
            massa vehicula nibh, quis mollis neque lacus eget sapien. Donec
            fermentum faucibus sem, a cursus nisl. Etiam nec velit mi. Morbi
            venenatis lorem dui, at consectetur ipsum tristique eu. Fusce
            efficitur ligula sed arcu bibendum, at faucibus quam aliquam.
          </p>
        </div>
      </section>
    </>
  );
}
