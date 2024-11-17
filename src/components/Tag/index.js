import styles from "./Tag.module.css";

export default function Tag({ text }) {
  return (
    <div className={"py-2 px-4 w-fit rounded-full primary bg-tertiary"}>
      {text}
    </div>
  );
}
