import { useState } from "react";
export const useRequestAddProduct = (refreshProducts) => {
  const [isCreating, setIsCreating] = useState(false);

  const requestAddProduct = () => {
    console.log("Adding new product...");
    setIsCreating(true);
    const newProduct = {
      name: "New Product",
      price: Math.floor(Math.random() * 100) + 1,
    };

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((createdProduct) => {
        console.log("Created product:", createdProduct);
        refreshProducts();
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
