import styles from "./SearchBar.module.css";

export default function SearchBar({ onChange, searchTerms }) {
  return (
    <input
      className="text-center rounded-full p-3 w-full xl:w-2/4"
      placeholder="Search"
      name="searchTerms"
      value={searchTerms}
      onChange={onChange}
      aria-label="Search bar"
    ></input>
  );
}
