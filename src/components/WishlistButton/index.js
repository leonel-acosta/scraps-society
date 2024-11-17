import Button from "../Button";
import { useSession } from "next-auth/react";

export default function WishlistButton({ onWishlist, onClick }) {
  const { status: sessionStatus, data: session } = useSession();

  function handleWishlist() {
    const wishlist = session?.user?.id;
    onClick(wishlist);
  }

  return (
    <Button
      onClick={handleWishlist}
      text={onWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      primary
    ></Button>
  );
}
