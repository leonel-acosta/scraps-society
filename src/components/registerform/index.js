import styles from "./registerform.module.css";
import Button from "../button";
import Link from "next/link";

export default function RegisterForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    console.log("data", data);
  }

  return (
    <>
      <form
        aria-labelledby="Register Form"
        className="flex flex-col pb-2 mb-2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="mb-1 font-sm">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          placeholder="Enter your name"
          required
        />
        <label htmlFor="username" className="mb-1 font-sm">
          Username
        </label>
        <input
          id="username"
          name="username"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          placeholder="Enter your username"
          required
        />
        <label htmlFor="Email" className="mb-1 font-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          className="input rounded-full px-3 py-2 mb-3"
          type="email"
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password" className="mb-1 font-sm">
          Password
        </label>
        <input
          required
          id="password"
          name="password"
          className="input rounded-full px-3 py-2 mb-3"
          type="password"
          placeholder="Create a password (min. 8 characters)"
        />
        <Button text={"Create account"} primary />
        <span className="text-center"> [ sign in with google button ]</span>

        <span className="text-center mb-3 font-xs">
          Already have an account? <Link href="./login">Sign in</Link>
        </span>
      </form>
    </>
  );
}
