import styles from "./Header.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";
import UserInfo from "../UserInfo";
import Link from "next/link";

export default function Header({ onChange, searchTerm }) {
  return (
    <div className="p-5 bg-secondary justify-between flex flex-row static top-0 w-full">
      <Link href="./">
        <h1>SCRAPS SOCIETY</h1>
      </Link>
      <SearchBar onChange={onChange} searchTerm={searchTerm} />
      <UserInfo />
    </div>
  );
}
