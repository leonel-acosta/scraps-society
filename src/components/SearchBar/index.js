import styles from "./SearchBar.module.css";

export default function SearchBar({ onChange, searchTerms }) {
  return (
    <div>
      <input
        className="text-center rounded-full p-5 basis-1/2"
        placeholder="Search"
        name="searchTerms"
        value={searchTerms}
        onChange={onChange}
        aria-label="Search bar"
      ></input>
    </div>
  );
}
