import { useSession, signIn, signOut } from "next-auth/react";
import Button from "../Button";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="flex flex-row items-center gap-2">
          {/*           Signed in as {session.user.email} <br />
           */}{" "}
          <Button primary onClick={() => signOut()} text={"Sign out"}></Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-row flex-shrink-0 items-center gap-2">
        <span className="hidden md:block">
          Not signed in <br />
        </span>
        <Button primary onClick={() => signIn()} text={"Sign in"}></Button>
      </div>
    </>
  );
}
