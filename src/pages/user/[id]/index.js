import { useRouter } from "next/router";
import useSWR from "swr";

export default function UserProfile() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/users/${id}`);
  const user = data;
  console.log("User Profile", user);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return <p>Under Construction</p>;
}
