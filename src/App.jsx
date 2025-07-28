import { useState } from "react";
import styles from "./App.module.css";
import { useEffect } from "react";

const MOCK_DATA = [
  {
    id: "001",
    name: "4K Smart TV Samsung 55",
    price: 749,
  },
  {
    id: "002",
    name: "iPhone 16 Pro Max 1024GB",
    price: 999,
  },
  {
    id: "003",
    name: "Dyson Supersonic Hair Dryer",
    price: 429,
  },
];

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ json: () => MOCK_DATA });
      }, 2000);
    })
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
      <h1>Products</h1>
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
