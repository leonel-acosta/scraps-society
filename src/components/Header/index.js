import styles from "./Header.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";
import UserInfo from "../UserInfo";

export default function Header() {
  return (
    <div className="p-5 bg-secondary justify-between flex flex-row static top-0 w-full">
      <h1>Header</h1>
      <SearchBar />
      <UserInfo />
    </div>
  );
}
