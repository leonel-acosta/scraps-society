import styles from "./Badge.module.css";

export default function Badge({ cycle_type, text }) {
  return (
    <div
      className={`py-2 px-4 w-fit left-4 top-4 absolute rounded-full ${
        text === "GIVE" ? "bg-accent primary" : "bg-secondary accent"
      }`}
    >
      {text}
    </div>
  );
}
