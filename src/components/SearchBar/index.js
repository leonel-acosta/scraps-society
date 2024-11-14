import styles from "./SearchBar.module.css";

export default function SearchBar({ onChange, searchTerm }) {
  return (
    <div>
      <input
        className="text-center rounded-full p-5"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={onChange}
      ></input>
    </div>
  );
}
