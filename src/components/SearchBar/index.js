import styles from "./SearchBar.module.css";

export default function SearchBar({ onChange, searchTerm }) {
  return (
    <div>
      <input
        className="text-center rounded-full p-5"
        placeholder="Search"
        value={searchTerm}
        onChange={onChange}
        aria-label="Search bar"
      ></input>
    </div>
  );
}
