import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function Shopping() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("📦 API URL is:", import.meta.env.VITE_API_URL);
        const baseUrl = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${baseUrl}/api/products`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        if (json.success) setProducts(json.data);
        else console.error("Failed to fetch products:", json.message);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );
  if (!confirmed) return;

  try {
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const url = `${baseUrl}/api/products/${id}`;
    console.log("Deleting product at:", url);

    const res = await fetch(url, {
      method: "DELETE",
    });

    if (res.ok) {
      setProducts(products.filter((p) => p._id !== id));
      console.log("Delete successful");
    } else {
      console.error("Failed to delete product, status:", res.status);
    }
  } catch (error) {
    console.error("Delete error:", error);
  }
};

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <Link
          to="/addProduct"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No products found.</p>
      ) : (
        <ul
          role="list"
          className="divide-y divide-gray-300 dark:divide-gray-700"
        >
          {products.map((product) => (
            <li
              key={product._id}
              className="flex flex-col sm:flex-row sm:items-center py-6 sm:py-4 gap-4 sm:gap-6 border border-gray-200 dark:border-gray-700 rounded-md mb-4"
            >
              <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-300 dark:border-gray-600 shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-lg font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>
              </div>

              <div className="flex gap-3 mt-4 sm:mt-0">
                <Link
                  to={`/update/${product._id}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
