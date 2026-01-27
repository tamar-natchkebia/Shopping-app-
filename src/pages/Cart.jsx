// src/pages/Cart.jsx
import { useCart } from "../context/CartProvider.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    setQuantity,
    clearCart,
  } = useCart();

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "card",
  });

  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    setOrderDetails({
      ...form,
      items: cart,
      total: totalCost,
    });

    setOrderPlaced(true);
    clearCart();
  };

  // Thank You Page
  if (orderPlaced && orderDetails) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          {/* Success Banner */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl">
              ✓
            </div>
            <h1 className="text-3xl font-bold text-green-700 mt-4">
              Thank You for Your Purchase!
            </h1>
            <p className="text-gray-600 mt-2">
              A confirmation email was sent to{" "}
              <span className="font-medium">{orderDetails.email}</span>.
            </p>
          </div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Shipping Details</h2>
              <p><span className="font-medium">Name:</span> {orderDetails.name}</p>
              <p><span className="font-medium">Email:</span> {orderDetails.email}</p>
              <p><span className="font-medium">Address:</span> {orderDetails.address}</p>
              <p><span className="font-medium">Payment Method:</span> {orderDetails.payment}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
              <ul className="divide-y text-gray-700">
                {orderDetails.items.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-right font-bold mt-3 text-lg">
                Total: ${orderDetails.total.toFixed(2)}
              </h3>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-8">
            <Link
              to="/products"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 shadow"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart
  if (cart.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
        <Link
          to="/products"
          className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // Cart Page
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {!checkoutMode ? (
        <>
          {/* Cart Items */}
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm"
              >
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">
                    ${item.price} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      setQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-12 text-center border rounded"
                  />

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total + Checkout button */}
          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Total: ${totalCost.toFixed(2)}
            </h2>
            <button
              onClick={() => setCheckoutMode(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 shadow"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        // Checkout Form
        <form
          onSubmit={handleCheckout}
          className="border p-6 rounded-lg bg-white shadow space-y-5"
        >
          <h2 className="text-2xl font-bold mb-2">Checkout</h2>

          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Payment Method</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="card">Credit / Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Confirm Order
          </button>
        </form>
      )}
    </div>
  );
}
