import styles from "./Button.module.css";

export default function Button({ text, onClick, primary, secondary }) {
  return (
    <button
      className={`rounded-full bg-black hover:bg-primary p-5 ${
        primary === true ? "bg-primary" : "bg-secondary"
      }${secondary === true ? "bg-secondary" : "bg-primary"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
