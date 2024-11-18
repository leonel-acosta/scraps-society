import styles from "./Tag.module.css";

export default function Tag({ text }) {
  return (
    <div
      className={
        " lowercase py-1 px-3 w-fit rounded-full primary bg-tertiary primary"
      }
    >
      {text}
    </div>
  );
}
