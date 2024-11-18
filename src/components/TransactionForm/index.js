import styles from "./TransactionForm.module.css";
import Button from "../Button";
import { useSession } from "next-auth/react";
import Tag from "../Tag";

export default function TransactionForm({ onClick, post }) {
  const { status: sessionStatus, data: session } = useSession();

  async function handleRequest(event) {
    const status = "reserved";
    const requested_by = session?.user?.id;
    onClick({ status, requested_by });
  }

  async function handleAcceptRequest(event) {
    const status = "given";
    const requested_by = session?.user?.id;
    onClick({ status, requested_by });
  }

  async function handleDenyRequest(event) {
    const status = "available";
    onClick({ status });
  }

  if (post.status === "given") {
    return (
      <div>
        <p>Collected by: {post.requested_by}</p>
      </div>
    );
  } else if (session && session.user.id !== post.created_by) {
    return (
      <>
        {post.status === "available" ? (
          <Button onClick={handleRequest} text={"Request"} accent />
        ) : (
          <Tag text={"No requests yet"} />
        )}
      </>
    );
  } else if (session && session.user.id === post.created_by) {
    return post.status === "reserved" ? (
      <div>
        <p>Requested by: {post.requested_by}</p>
        <Button onClick={handleAcceptRequest} text={"Accept"} accent />
        <Button onClick={handleDenyRequest} text={"Deny"} primary />
      </div>
    ) : (
      <Tag text={"Requests waiting response by user"} />
    );
  } else {
    return <span>Please login to make a request</span>;
  }
}
