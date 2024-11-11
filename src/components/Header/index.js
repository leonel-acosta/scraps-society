import styles from "./Header.module.css";
import Button from "../Button";
import SearchBar from "../SearchBar";

export default function Header() {
  return (
    <div className="p-5 bg-secondary justify-between flex flex-row">
      <h1>Header</h1>
      <SearchBar />
      <Button text={"Sign up"}>Login</Button>
    </div>
  );
}
