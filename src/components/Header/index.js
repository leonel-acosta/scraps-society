import styles from "./Header.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";
import UserInfo from "../UserInfo";
import Link from "next/link";
import NavBar from "../NavBar";
import Logo from "../Logo";

export default function Header({ onChange, searchTerm, searchBar }) {
  return (
    <>
      <div className=" bg-secondary justify-between flex flex-row sticky top-0 w-full z-10 p-2">
        <Link href="./">
          <Logo />
        </Link>
        <NavBar desktop />
        <UserInfo />
      </div>
      <div className="md:hidden bg-tertiary primary justify-around flex flex-row fixed top-15 w-full z-10 p-3">
        <NavBar mobile />
      </div>
    </>
  );
}
