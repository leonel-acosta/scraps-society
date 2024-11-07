import { useRouter } from "next/router";

export default function CyclePage() {
  const router = userRouter();
  const { id } = router.query;

  return <p>Under Construction</p>;
}
