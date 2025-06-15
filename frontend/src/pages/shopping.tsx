import { useEffect, useState } from 'react'

type Product = {
  _id: string
  name: string
  price: number
  image: string
  description: string
}

export default function Shopping() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
  const fetchProducts = async () => {
    try {
      // ✅ Debug the env variable
      console.log('API URL:', import.meta.env.VITE_API_URL)

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const text = await res.text()
      try {
        const json = JSON.parse(text)
        if (json.success) {
          setProducts(json.data)
        } else {
          console.error('Failed to fetch products:', json.message)
        }
      } catch (err) {
        console.error('JSON parse error:', err)
        console.error('Response text:', text)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  fetchProducts()
}, [])

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>
  }

  return (
    <div className="bg-white p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{product.name}</h3>
                      <p className="ml-4">${product.price.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty 1</p>
                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>
                $
                {products
                  .reduce((total, item) => total + item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or{' '}
                <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}