import React from "react";
import { FaHeartCrack } from "react-icons/fa6";
import { toast } from "react-toastify";

const WishItem = ({ item, counter, removeFromWishlist }) => {
  const removeFromWishlistHandler = async () => {
    try {
      await removeFromWishlist(item);
      toast.success("Product removed from the wishlist!");
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error("Failed to remove product from the wishlist");
    }
  };

  return (
    <tr className="hover cursor-pointer">
      <th className="text-accent-content">{counter + 1}</th>
      <td className="text-accent-content">{item.name}</td>
      <td className="text-accent-content">{item.selectedSize}</td>
      <td>
        <button className="btn btn-xs btn-error text-sm" onClick={removeFromWishlistHandler}>
          <FaHeartCrack />
          remove from the wishlist
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
