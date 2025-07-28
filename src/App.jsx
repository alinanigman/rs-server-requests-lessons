import { useState } from "react";
import styles from "./App.module.css";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAddProduct = () => {
    console.log("Adding new product...");
    setIsUpdating(true);
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
        setRefreshProducts(!refreshProducts);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleUpdateProduct = (productId) => {
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
        setRefreshProducts(!refreshProducts);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleDeleteProduct = (productId) => {
    console.log("Deleting product...", productId);
    setIsUpdating(true);

    const selectedProduct = products.find((p) => p.id === productId);
    console.log("Selected product:", selectedProduct);

    fetch(`http://localhost:3000/products/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    })
      .then((res) => {
        console.log("Deleted product res:", res);
        setRefreshProducts(!refreshProducts);
      })
      .finally(() => {
        setIsUpdating(false);
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
  }, [refreshProducts]);
  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <h1>Products</h1>
        <button disabled={isUpdating} onClick={handleAddProduct}>
          Add new
        </button>
      </div>
      <div className={styles.list}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          products.map((product) => (
            <div className={styles.product} key={product.id}>
              <div className={styles.productHeader}>
                <b>{product.name}</b>
                <div className={styles.productActions}>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateProduct(product.id)}
                  >
                    <span role="img" aria-label="update">
                      🔄
                    </span>
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <span role="img" aria-label="delete">
                      🗑️
                    </span>
                  </button>
                </div>
              </div>
              <div className={styles.productPrice}>${product.price}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
