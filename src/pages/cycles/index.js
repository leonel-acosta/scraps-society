import CycleCard from "@/components/CycleCard";
import Filters from "@/components/Filters";
import Link from "next/link";

export default function CyclesPage({ filteredData, onChange }) {
  return (
    <>
      <section>
        <h1 className="text-center">CYCLES</h1>
        <container className="flex flex-row justify-center">
          <div className="w-1/4 mx-3">
            <Filters onChange={onChange} filteredData={filteredData} />
          </div>
          <div className="flex justify-center w-3/4">
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
        </container>
      </section>
    </>
  );
}
