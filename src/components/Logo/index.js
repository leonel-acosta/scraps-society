import Image from "next/image";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className="align-center p-5">
      <Image src="/logo.svg" alt="logo" width={120} height={120} />
    </div>
  );
}
