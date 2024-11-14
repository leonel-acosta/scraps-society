import CycleCard from "@/components/CycleCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function CyclesPage({ filteredData }) {
  return (
    <>
      <h1 className="text-center">CYCLES</h1>

      <div className="flex justify-center">
        <ul role="list">
          {filteredData.map((post) => {
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
                    status={post.status}
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
