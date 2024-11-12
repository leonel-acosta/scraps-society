import { useSession } from "next-auth/react";
import LoginButton from "../LoginButton";
import Image from "next/image";

export default function UserInfo() {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    return (
      <div className="flex flex-row items-center gap-4">
        <h5>{session?.user?.name}</h5>
        <Image
          src={session?.user?.image}
          width={68}
          height={68}
          className="rounded-full border-2 border-black"
          alt="User Image"
        ></Image>
        <LoginButton />
      </div>
    );
  } else {
    return <LoginButton />;
  }
}
