import RegisterForm from "@/components/RegisterForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Register() {
  const router = useRouter();
  const { mutate } = useSWR("../api/users");

  async function createUser(user) {
    const response = await fetch("../api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      mutate();
      console.log("New user created:", user);
      router.push("./user");
    } else {
      console.error("Failed to add user");
    }
  }

  return (
    <>
      <h3>Welcome</h3>
      <h2>Sign Up</h2>
      <RegisterForm onSubmit={createUser} />
    </>
  );
}
