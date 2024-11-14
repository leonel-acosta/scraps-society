import styles from "./TransactionForm.module.css";
import Button from "../Button";
import { useSession } from "next-auth/react";

export default function TransactionForm({ onClick, post }) {
  const { status: sessionStatus, data: session } = useSession();

  async function handleRequest(event) {
    event.preventDefault();
    const status = "Reserved";
    const requested_by = session?.user?.id;
    onSubmit({ status, requested_by });
  }

  async function handleAcceptRequest(event) {
    event.preventDefault();
    const status = "Given";
    const requested_by = session?.user?.id;
    onSubmit({ status, requested_by });
  }

  async function handleDenyRequest(event) {
    event.preventDefault();
    const status = "Available";
    onSubmit({ status });
  }

  if (post.status === "Given") {
    return (
      <div>
        <p>Collected by: {post.requested_by}</p>
      </div>
    );
  } else if (session && session.user.id !== post.created_by) {
    return (
      <>
        {post.status === "Available" ? (
          <Button onClick={handleRequest} text={"Request"} primary />
        ) : (
          <p>Request pending</p>
        )}
      </>
    );
  } else if (session && session.user.id === post.created_by) {
    return post.status === "Reserved" ? (
      <div>
        <p>Requested by: {post.requested_by}</p>
        <Button onClick={handleAcceptRequest} text={"Accept"} primary />
        <Button onClick={handleDenyRequest} text={"Deny"} secondary />
      </div>
    ) : (
      <p>Request pending</p>
    );
  } else {
    return <p>Please login</p>;
  }
}
