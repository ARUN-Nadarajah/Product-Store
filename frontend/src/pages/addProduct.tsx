import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  name: string;
  price: string;
  image: string;
  description: string;
};

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price") {
      // Allow only valid numeric input with up to 2 decimal places
      if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    }

    setProduct((prev) => ({ ...prev, [name]: value }));
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

    const baseUrl = import.meta.env.VITE_API_URL || "";
    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          price: priceNumber,
        }),
      });

      if (res.ok) {
        window.alert("✅ Product added successfully!");
        navigate("/");
      } else {
        const data = await res.json();
        throw new Error(data.message || "Adding product failed");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while adding.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
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
              placeholder="Enter price"
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}