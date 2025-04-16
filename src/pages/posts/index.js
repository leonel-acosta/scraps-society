import Filters from "@/components/Filters";
import Link from "next/link";
import PostsList from "@/components/PostsList";
import PageTitle from "@/components/PageTitle";
import SearchBar from "@/components/SearchBar";
import PostsMapView from "@/components/PostsMapView";

export default function PostsPage({
  filteredData,
  onChange,
  searchTerms,
  handleFilterChange,
}) {
  return (
    <>
      <PageTitle text={"Cycles"} />
      <section className="flex flex-row flex-wrap justify-center items-center pb-5">
        <div className="basis-full p-3 fixed md:sticky md:top-20 w-full bottom-0 text-center bg-tertiary m-0 z-10 md:z-10">
          <SearchBar onChange={onChange} searchTerms={searchTerms} />
        </div>
        <div className="flex flex-row flex-wrap md:flex-nowrap justify-center">
          <div className="basis-full lg:fixed lg:left-10 lg:top-50 lg:basis-1/4 mx-3 mb-5">
            <Filters onChange={onChange} filteredData={filteredData} />
          </div>
          <div className="basis-full mx-3 mt-3 mb-5">
            <PostsList filteredData={filteredData} />
          </div>
        </div>
        <div className="basis-full mx-3 mt-3 mb-5">
          <PostsMapView filteredData={filteredData} />
        </div>
      </section>
    </>
  );
}
