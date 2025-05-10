import Image from "next/image";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className="align-center p-5">
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
    </div>
  );
}
