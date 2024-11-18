import Filters from "@/components/Filters";
import Link from "next/link";
import PostsList from "@/components/PostsList";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";

export default function PostsPage({
  filteredData,
  onChange,
  searchTerms,
  handleFilterChange,
}) {
  return (
    <>
      <Header searchBar onChange={onChange} searchTerms={searchTerms} />
      <PageTitle text={"Cycles"} />
      <section className="flex justify-center p-5">
        <div className="flex flex-row justify-center">
          <div className="w-1/4 mx-3">
            <Filters onChange={onChange} filteredData={filteredData} />
          </div>
          <div className="flex justify-center w-3/4">
            <PostsList filteredData={filteredData} />
          </div>
        </div>
      </section>
    </>
  );
}
