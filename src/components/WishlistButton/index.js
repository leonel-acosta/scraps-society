import { useEffect, useState } from "react";
import Button from "../Button";
import { useSession } from "next-auth/react";

export default function WishlistButton({ onClick, post }) {
  const { status: sessionStatus, data: session } = useSession();

  const onWishlist = post.wishlist?.includes(session?.user?.id);

  function handleWishlist() {
    const wishlist = session?.user?.id;
    onClick(wishlist);
  }
  if (session) {
    return (
      <Button
        onClick={handleWishlist}
        text={onWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        primary
      ></Button>
    );
  }
}
