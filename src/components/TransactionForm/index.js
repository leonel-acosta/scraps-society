import styles from "./TransactionForm.module.css";
import Button from "../Button";
import { useSession } from "next-auth/react";
import Tag from "../Tag";
import Link from "next/link";

export default function TransactionForm({ onClick, post }) {
  const { status: sessionStatus, data: session } = useSession();

  async function handleRequest(event) {
    const status = "reserved";
    const requested_by = session?.user?.email;
    onClick({ status, requested_by });
  }

  async function handleAcceptRequest(event) {
    const status = "given";
    const requested_by = session?.user?.email;
    onClick({ status, requested_by });
  }

  async function handleDenyRequest(event) {
    const status = "available";
    onClick({ status });
  }

  if (post.status === "given") {
    return (
      <div>
        <Tag text={`Taken by: ${post.requested_by}`} />
      </div>
    );
  } else if (session && session.user.username !== post.created_by) {
    return (
      <>
        {post.status === "available" ? (
          <Button onClick={handleRequest} text={"Request"} accent />
        ) : (
          <Tag text={"Request pending response by user"} />
        )}
      </>
    );
  } else if (session && session.user.username === post.created_by) {
    return post.status === "reserved" ? (
      <>
        <div>
          <Link href={`/user/${post.requested_by}`} />
          <Tag text={`Reserved by:${post.requested_by}`} />
        </div>
        <div>
          <Button onClick={handleAcceptRequest} text={"Accept"} accent />
          <Button onClick={handleDenyRequest} text={"Deny"} primary />
        </div>
      </>
    ) : (
      <Tag text={"No requests were made until now"} />
    );
  } else {
    return <Tag text={"Please login to make a request"} />;
  }
}
