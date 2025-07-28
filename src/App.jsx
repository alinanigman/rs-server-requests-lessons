import styles from "./App.module.css";
import {
  useRequestGetProducts,
  useRequestAddProduct,
  useRequestUpdateProduct,
  useRequestDeleteProduct,
} from "./hooks";

function App() {
  const { products, isLoading } = useRequestGetProducts();

  const { isCreating, requestAddProduct } = useRequestAddProduct();
  const { isUpdating, requestUpdateProduct } =
    useRequestUpdateProduct(products);
  const { isDeleting, requestDeleteProduct } =
    useRequestDeleteProduct(products);

  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <h1>Products</h1>
        <button disabled={isCreating} onClick={requestAddProduct}>
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
                    disabled={isDeleting || isUpdating}
                    onClick={() => requestUpdateProduct(product.id)}
                  >
                    <span role="img" aria-label="update">
                      🔄
                    </span>
                  </button>
                  <button
                    disabled={isDeleting || isUpdating}
                    onClick={() => requestDeleteProduct(product.id)}
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
