import { useState, useEffect } from "react";
export const useRequestGetProducts = (refreshProductsFlag) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/products")
      .then((responce) => responce.json())
      .then((data) => {
        setProducts(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refreshProductsFlag]);
  return {
    products,
    isLoading,
  };
};
