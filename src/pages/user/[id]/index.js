import { useRouter } from "next/router";

export default function UserProfile() {
  const router = userRouter();
  const { id } = router.query;

  return <p>Under Construction</p>;
}
