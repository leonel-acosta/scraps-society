import Link from "next/link";
import styles from "./Menu.module.css";

export default function Menu() {
  return (
    <div className="flex flex-row">
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/posts"}>Find</Link>
        </li>
        <li>
          <Link href={"/posts/create"}>Create Cycle</Link>
        </li>
      </ul>
    </div>
  );
}
