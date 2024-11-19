import Filters from "@/components/Filters";
import Link from "next/link";
import PostsList from "@/components/PostsList";
import PageTitle from "@/components/PageTitle";
import SearchBar from "@/components/SearchBar";

export default function PostsPage({
  filteredData,
  onChange,
  searchTerms,
  handleFilterChange,
}) {
  return (
    <>
      <PageTitle text={"Cycles"} />
      <section className="flex flex-row flex-wrap justify-center items-center pt-2 pb-5">
        <div className="basis-full p-3 fixed w-full bottom-0 text-center bg-secondary m-0 z-10">
          <SearchBar onChange={onChange} searchTerms={searchTerms} />
        </div>
        <div className="flex flex-row flex-wrap md:flex-nowrap justify-center">
          <div className="basis-full lg:fixed lg:left-0 lg:top-50 lg:basis-1/4 mx-3 mb-5">
            <Filters onChange={onChange} filteredData={filteredData} />
          </div>
          <div className="basis-full sm:basis-3/4 mx-3 mb-5">
            <PostsList filteredData={filteredData} />
          </div>
        </div>
      </section>
    </>
  );
}
