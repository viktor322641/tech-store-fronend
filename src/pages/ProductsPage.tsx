// src/pages/ProductsPage.tsx
import ProductList from "../components/ProductList";

const ProductsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
