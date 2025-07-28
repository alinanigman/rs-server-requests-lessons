import { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";
export const useRequestDeleteProduct = (products) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const requestDeleteProduct = (productId) => {
    console.log("Deleting product...", productId);
    setIsDeleting(true);

    const selectedProduct = products.find((p) => p.id === productId);
    console.log("Selected product:", selectedProduct);

    const productRef = ref(db, `products/${productId}`);
    remove(productRef)
      .then(() => {
        console.log("Product deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };
  return {
    isDeleting,
    requestDeleteProduct,
  };
};
