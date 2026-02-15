import { useSession } from "next-auth/react";
import LoginButton from "../LoginButton";
import Image from "next/image";

export default function UserInfo() {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    return (
      <div className="flex flex-row items-center gap-4">
        <Image
          src={session?.user?.image}
          width={60}
          height={60}
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
