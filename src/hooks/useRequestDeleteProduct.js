import { useState } from "react";
export const useRequestDeleteProduct = (products, refreshProducts) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const requestDeleteProduct = (productId) => {
    console.log("Deleting product...", productId);
    setIsDeleting(true);

    const selectedProduct = products.find((p) => p.id === productId);
    console.log("Selected product:", selectedProduct);

    fetch(`http://localhost:3000/products/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    })
      .then((res) => {
        console.log("Deleted product res:", res);
        refreshProducts();
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
