import { useState } from "react";
import styles from "./App.module.css";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = () => {
    console.log("Adding new product...");
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
        setProducts([...products, createdProduct]);
      });
  };

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
  }, []);
  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <h1>Products</h1>
        <button onClick={handleAddProduct}>Add new</button>
      </div>
      <div className={styles.list}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          products.map((product) => (
            <div className={styles.item} key={product.id}>
              <div className={styles.product}>
                <b>{product.name}</b>
              </div>
              <div>${product.price}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
