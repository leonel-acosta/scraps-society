import { useEffect, useState } from "react";
import Button from "../Button";
import { useSession } from "next-auth/react";

export default function WishlistButton({ onClick, post }) {
  const { status: sessionStatus, data: session } = useSession();
  const [onWishlist, setOnWishlist] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setOnWishlist(post.wishlist.includes(session.user.id));
    }
  }, [post.wishlist, session?.user?.id]);

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
