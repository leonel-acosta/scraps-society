import { useRouter } from "next/router";

export default function CyclePage() {
  const router = useRouter();
  const { id } = router.query;

  return <p>Under Construction</p>;
}
