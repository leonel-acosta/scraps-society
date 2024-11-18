import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className="flex md:flex-row justify-between p-5 bg-primary gap-5 bottom-0 w-full sticky z-10">
      <div>
        <span>LOGO</span>
      </div>
      <span> 2024. Scraps Ministry. All rights reserved.</span>

      <div className="flex gap-5">
        <span>Impressum</span>
        <span>Datenschutz</span>
      </div>
    </div>
  );
}
