import styles from "./WishlistButton.module.css";
import Button from "../Button";
export default function WishlistButton({ onWishlist, onToggleWishlist }) {
  return (
    <Button
      onClick={onToggleWishlist}
      text={onWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      primary
    ></Button>
  );
}
