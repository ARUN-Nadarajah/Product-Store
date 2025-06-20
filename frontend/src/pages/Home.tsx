import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const sampleProducts: Product[] = [
  {
    _id: "68557dc497f8d5d905b7c37f",
    name: "Nike Shoe",
    price: 900,
    image:
      "https://images.squarespace-cdn.com/content/v1/5ed6e10fb011a123217ba702/1727139534806-K219WNSVFLFTG6QOO2I3/unsplash-image-164_6wVEHfI.jpg",
    description: "quality one for everyday and sports",
  },
  {
    _id: "68557e0b97f8d5d905b7c382",
    name: "head phone",
    price: 250,
    image:
      "https://buyabans.com/cdn-cgi/imagedelivery/OgVIyabXh1YHxwM0lBwqgA/product/8731/fthphfo2bla03blu_2.jpg/public",
    description: "Fast track head phone",
  },
  {
    _id: "68557e4c97f8d5d905b7c388",
    name: "umbrella",
    price: 50,
    image:
      "https://www.jiomart.com/images/product/original/rvodbdlekx/axaka-multi-style-umbrella-for-man-and-women-product-images-orvodbdlekx-p602726202-4-202306261340.jpg?im=Resize=(420,420)",
    description: "umbrella in rainbow colour",
  },
  {
    _id: "68557e8397f8d5d905b7c38b",
    name: "Camera",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmlrb24lMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D",
    description: "Nikon professional camera",
  },
  {
    _id: "68557ebf97f8d5d905b7c38e",
    name: "Hard ball bat",
    price: 200,
    image:
      "https://www.ubuy.com.lk/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFDcFE3WEhuRkwuX1NTNDAwXy5qcGc.jpg",
    description: "best in class and quality",
  },
];

export default function Shopping() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${baseUrl}/api/products`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        if (json.success) {
          setProducts([...sampleProducts, ...json.data]);
        } else {
          console.error("Failed to fetch products:", json.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setProducts(sampleProducts); // fallback to only sample products
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const isSample = sampleProducts.some((p) => p._id === id);
    if (isSample) {
      alert(
        "🛑 These are sample products and cannot be deleted.\n\nPlease add your own product and try things out!"
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${baseUrl}/api/products/${id}`, {
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
          {products.map((product) => {
            const isSample = sampleProducts.some((p) => p._id === product._id);
            return (
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
                      Rs. {product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>

                <div className="flex gap-3 mt-4 sm:mt-0">
                  {isSample ? (
                    <span
                      className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                      title="Sample products cannot be edited"
                    >
                      Edit
                    </span>
                  ) : (
                    <Link
                      to={`/update/${product._id}`}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                    >
                      Edit
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}