import Badge from "../Badge";
import Tag from "../Tag";
import styles from "./PostCard.module.css";
import Image from "next/image";

export default function PostCard({
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
    <div className="flex flex-col lg:flex-row p-5 justify-between bg-secondary mb-2 rounded-lg gap-5">
      <div className="rounded-lg col-6 w-full md:basis-1/2 relative">
        <Badge cycle_type={cycle_type} text={cycle_type} />
        <Image
          src={image}
          width={340}
          height={340}
          alt={title}
          sizes="340px"
          style={{
            width: "340px",
            height: "340px",
            objectFit: "cover",
          }}
          className="rounded-lg text-center"
        />
      </div>
      <div className="py-5 gap-5 md:basis-1/2">
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
