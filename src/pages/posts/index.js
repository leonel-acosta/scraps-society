import PostCard from "@/components/PostCard";
import Filters from "@/components/Filters";
import Link from "next/link";
import PostsList from "@/components/PostsList";

export default function PostsPage({ filteredData, onChange }) {
  return (
    <>
      <section>
        <h1 className="text-center">CYCLES</h1>
        <container className="flex flex-row justify-center">
          <div className="w-1/4 mx-3">
            <Filters onChange={onChange} filteredData={filteredData} />
          </div>
          <div className="flex justify-center w-3/4">
            <PostsList filteredData={filteredData} />
          </div>
        </container>
      </section>
    </>
  );
}
