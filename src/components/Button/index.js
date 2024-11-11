import styles from "./Button.module.css";

export default function Button({ text, onClick }) {
  return (
    <button
      className="rounded-full bg-black hover:bg-primary p-5"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
