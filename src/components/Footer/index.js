import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col md:flex-row justify-between p-5 bg-primary gap-5 bottom-0 w-full  z-10">
      <div>
        <Image src="/logo-circle.svg" alt="logo" height={50} width={50} />
      </div>
      <div className="flex gap-5">
        <span> 2024. Scraps Society. All rights reserved.</span>
      </div>
    </div>
  );
}
