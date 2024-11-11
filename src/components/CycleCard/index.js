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
}) {
  console.log(image);
  return (
    <card className="flex flex-col sm:flex-row p-5 justify-around bg-secondary mb-2 rounded-lg gap-5">
      <div className="bg-primary rounded-lg" style={{ position: "relative" }}>
        <Image
          src={image}
          width={260}
          height={260}
          alt={title}
          sizes="260px"
          style={{
            width: "260px",
            height: "260px",
            objectFit: "cover",
          }}
          className="rounded-lg text-center"
        />
      </div>
      <div>
        <span className="meta">{cycle_type}</span>
        <h3>{title}</h3>
        <span>
          {address}, {zipcode} {city} {country}
        </span>
        <ul>
          <li>Category: {category}</li>
          <li>
            Quantity: {quantity} {unit}
          </li>
          <li></li>
        </ul>
      </div>
    </card>
  );
}
