import Badge from "../Badge";
import Tag from "../Tag";
import styles from "./CycleCard.module.css";
import Image from "next/image";

export default function CycleCard({
  id,
  title,
  address,
  city,
  zipcode,
  country,
  cycle_type,
  image,
  quantity,
  unit,
  category,
  status,
}) {
  return (
    <div className="flex flex-col md:flex-row p-5 justify-between bg-secondary mb-2 rounded-lg gap-10">
      <div
        className="bg-primary rounded-lg col-6 lg:w-1/2"
        style={{ position: "relative" }}
      >
        <Badge cycle_type={cycle_type} text={cycle_type} />
        <Image
          src={image}
          width={300}
          height={300}
          alt={title}
          sizes="300px"
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
          }}
          className="rounded-lg text-center"
        />
      </div>
      <div className="py-5 gap-5 lg:w-1/2">
        <Tag text={status} />
        <h3 className="uppercase mb-2">{title}</h3>
        <span>
          {city} {zipcode}
        </span>
        <ul>
          <li>Category: {category}</li>
          <li>
            Quantity: {quantity} {unit}
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}