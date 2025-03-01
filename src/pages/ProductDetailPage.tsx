import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductBySlug, Product } from "../api/productsApi";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (slug) {
        try {
          const data = await fetchProductBySlug(slug);
          setProduct(data);
        } catch (err) {
          setError("Failed to fetch product details.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-green-600 mb-4">${product.price}</p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
};

export default ProductDetailPage;
