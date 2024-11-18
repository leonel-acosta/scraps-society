import styles from "./Button.module.css";

export default function Button({ text, onClick, primary, secondary, accent }) {
  return (
    <button
      className={`rounded-full p-5 w-fit hover:bg-opacity-80 ${
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
