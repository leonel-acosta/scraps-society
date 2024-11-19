import styles from "./Header.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";
import UserInfo from "../UserInfo";
import Link from "next/link";
import NavBar from "../NavBar";
import Logo from "../Logo";

export default function Header({ onChange, searchTerm, searchBar }) {
  return (
    <div className=" bg-secondary justify-between flex flex-row sticky top-0 w-full z-10 p-2">
      <Link href="./">
        <Logo />
      </Link>
      <NavBar />
      <UserInfo />
    </div>
  );
}
