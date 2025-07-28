import { useState } from "react";
export const useRequestUpdateProduct = (products, refreshProducts) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const requestUpdateProduct = (productId) => {
    console.log("Updating product...", productId);
    setIsUpdating(true);

    const selectedProduct = products.find((p) => p.id === productId);
    console.log("Selected product:", selectedProduct);

    fetch(`http://localhost:3000/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        ...selectedProduct,
        price: selectedProduct.price - Math.floor(Math.random() * 10) + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        console.log("Updated product:", updatedProduct);
        refreshProducts();
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
