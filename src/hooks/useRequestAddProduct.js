import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";
export const useRequestAddProduct = () => {
  const [isCreating, setIsCreating] = useState(false);

  const requestAddProduct = () => {
    console.log("Adding new product...");
    setIsCreating(true);
    const newProduct = {
      name: "New Product",
      price: Math.floor(Math.random() * 100) + 1,
    };

    const productsRef = ref(db, "products");
    push(productsRef, newProduct)
      .then((response) => {
        console.log("Created product:", response);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };
  return {
    isCreating,
    requestAddProduct,
  };
};
