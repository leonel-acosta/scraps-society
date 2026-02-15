import Link from "next/link";
import styles from "./PostsList.module.css";
import PostCard from "@/components/PostCard";

export default function PostsList({ filteredData }) {
  return (
    <ul role="list">
      {filteredData.map((post) => {
        return (
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
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
