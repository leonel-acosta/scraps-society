import styles from "./button.module.css";

export default function Button({ text, primary, secondary, tertiary, cta }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      {text}
    </button>
  );
}
