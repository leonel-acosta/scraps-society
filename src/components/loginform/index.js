import styles from "./loginform.module.css";
import Link from "next/link";
import Button from "../button";

export default function LoginForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("Login:", data);
  }

  return (
    <>
      <form
        aria-labelledby="login form"
        className="flex flex-col pb-2 mb-2"
        onSubmit={handleSubmit}
      >
        <h5>Please enter your details</h5>
        <label className="mb-1 font-sm">User Name</label>
        <input
          id="username"
          name="username"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          placeholder="Enter your username"
        />
        <label className="mb-1 font-sm">Password</label>
        <input
          id="password"
          name="password"
          className="input rounded-full px-3 py-2 mb-3"
          type="password"
          placeholder="Enter your password"
        />
        <span className="text-right mb-4 font-xs">Forgot password?</span>
        <Button text={"Log in"} primary />
        <span className="text-center"> [ sign in with google button ]</span>

        <span className="text-center mb-3 font-xs">
          Don't you have an account? <Link href="./register">Sign up</Link>
        </span>
      </form>
    </>
  );
}
