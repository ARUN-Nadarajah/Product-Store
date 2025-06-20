import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Product = {
  name: string;
  price: string;
  image: string;
  description: string;
};

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const json = await res.json();
        if (json.success) {
          setProduct({
            ...json.data,
            price: json.data.price.toString(), // Convert to string
          });
        } else throw new Error(json.message || "Product not found");
      } catch (err: any) {
        setError(err.message || "Error loading product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      // Only allow numbers + optional 1 decimal with 2 digits
      if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    }

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const priceNumber = Number(product.price);

    if (
      !product.price ||
      isNaN(priceNumber) ||
      priceNumber <= 0 ||
      !/^\d+(\.\d{1,2})?$/.test(product.price)
    ) {
      setError("Price must be a positive number with up to 2 decimal places.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          price: priceNumber,
        }),
      });

      if (res.ok) {
        window.alert("✅ Product updated successfully!");
        navigate("/");
      } else {
        const data = await res.json();
        throw new Error(data.message || "Update failed");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while updating.");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading product...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500 dark:text-red-400">{error}</div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              inputMode="decimal"
              placeholder="e.g. 12.99"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}