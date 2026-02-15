import styles from "./Button.module.css";

export default function Button({ text, onClick, primary, secondary, accent }) {
  return (
    <button
      className={`rounded-full py-3 px-5 mx-2 w-fit hover:opacity-80 transition ease-in-out ${
        primary
          ? "bg-primary"
          : secondary
          ? "bg-secondary"
          : accent
          ? "bg-accent"
          : "bg-black"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
