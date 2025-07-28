import { useState } from "react";
import styles from "./App.module.css";
import { useEffect } from "react";

function App() {
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
  }, []);
  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <h1>Products</h1>
        <button>Add new</button>
      </div>
      <div className={styles.list}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          products.map((product) => (
            <>
              <div key={product.id} className={styles.product}>
                <b>{product.name}</b>
              </div>
              <div>${product.price}</div>
            </>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
