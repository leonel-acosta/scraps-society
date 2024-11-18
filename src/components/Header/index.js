import styles from "./Header.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";
import UserInfo from "../UserInfo";
import Link from "next/link";
import NavBar from "../NavBar";
import Logo from "../Logo";

export default function Header({ onChange, searchTerm, searchBar }) {
  return (
    <div className="p-5 bg-secondary justify-between flex flex-row sticky top-0 w-full z-10">
      <Link href="./">
        <Logo />
      </Link>
      {searchBar ? (
        <SearchBar onChange={onChange} searchTerm={searchTerm} />
      ) : (
        ""
      )}
      <NavBar />
      <UserInfo />
    </div>
  );
}
