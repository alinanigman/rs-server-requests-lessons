import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
export const useRequestGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const productsRef = ref(db, "products");
    return onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setProducts(productsArray);
      setIsLoading(false);
    });
  }, []);
  return {
    products,
    isLoading,
  };
};
