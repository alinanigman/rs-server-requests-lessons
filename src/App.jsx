import { useState } from "react";
import styles from "./App.module.css";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://mocki.io/v1/1926ecc2-5595-4544-9673-f03e25e09494")
      .then((responce) => responce.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <div className={styles.App}>
      <h1>Products</h1>
      <div className={styles.list}>
        {products.map((product) => (
          <>
            <div key={product.id} className={styles.product}>
              <b>{product.name}</b>
            </div>
            <div>${product.price}</div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
