import styles from "./Button.module.css";

export default function Button({ text, onClick, primary, secondary, accent }) {
  return (
    <button
      className={`rounded-full p-5 mr-2 w-fit hover:border-2 ${
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
