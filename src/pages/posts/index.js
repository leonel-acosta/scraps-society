import Filters from "@/components/Filters";
import dynamic from "next/dynamic";
import PostsList from "@/components/PostsList";
import PageTitle from "@/components/PageTitle";
import SearchBar from "@/components/SearchBar";
import SwitchViewButton from "@/components/SwitchViewButton";
import { useState } from "react";
const PostsMapView = dynamic(() => import("@/components/PostsMapView"), {
  ssr: true,
});

export default function PostsPage({ filteredData, onChange, searchTerms }) {
  const [isMapView, setIsMapView] = useState(true);
  function handleToggle() {
    setIsMapView((prev) => !prev);
    console.log("Map view:", isMapView);
  }

  return (
    <>
      <PageTitle text={"Cycles"} />
      <section className="flex flex-row flex-wrap justify-center items-center pb-5">
        <div className="basis-full p-3 fixed md:sticky md:top-20 w-full bottom-0 text-center bg-tertiary m-0 z-10 md:z-10 ">
          <SearchBar onChange={onChange} searchTerms={searchTerms} />
          <SwitchViewButton isMapView={isMapView} onToggle={handleToggle} />
        </div>
        <div className="flex flex-row flex-wrap md:flex-nowrap justify-center">
          <div className="basis-full lg:fixed lg:left-10 lg:top-50 lg:basis-1/4 mx-3 mb-5 z-10">
            <Filters onChange={onChange} filteredData={filteredData} />
          </div>

          {isMapView ? (
            <PostsMapView key="map" filteredData={filteredData} />
          ) : (
            <div className="basis-full mx-3 mt-3 mb-5">
              <PostsList key="list" filteredData={filteredData} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
