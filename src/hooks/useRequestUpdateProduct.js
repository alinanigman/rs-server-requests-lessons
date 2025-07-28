import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
export const useRequestUpdateProduct = (products) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const requestUpdateProduct = (productId) => {
    console.log("Updating product...", productId);
    setIsUpdating(true);

    const selectedProduct = products.find((p) => p.id === productId);
    console.log("Selected product:", selectedProduct);

    const productRef = ref(db, `products/${productId}`);
    set(productRef, {
      ...selectedProduct,
      price: selectedProduct.price - Math.floor(Math.random() * 10) + 1,
    })
      .then(() => {
        console.log("Product updated successfully");
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };
  return {
    isUpdating,
    requestUpdateProduct,
  };
};
