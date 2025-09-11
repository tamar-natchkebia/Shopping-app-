import { useCart } from "../context/CartProvider.jsx";
import { useState } from "react";

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
  const [processing, setProcessing] = useState(false);
  const [showPayPalModal, setShowPayPalModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    paypalEmail: "",
    paypalPassword: "",
  });

  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const finalizeOrder = () => {
    setOrderDetails({
      ...form,
      items: cart,
      total: totalCost,
    });
    setOrderPlaced(true);
    clearCart();
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (form.payment === "paypal") {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setShowPayPalModal(true);
      }, 2000);
    } else if (form.payment === "card") {
      if (form.cardNumber.length < 16 || form.cvv.length < 3) {
        alert("Invalid card details");
        return;
      }
      finalizeOrder();
    } else {
      finalizeOrder();
    }
  };

  const handlePayPalLogin = (e) => {
    e.preventDefault();
    if (!form.paypalEmail || !form.paypalPassword) {
      alert("Please enter PayPal login details");
      return;
    }
    setShowPayPalModal(false);
    finalizeOrder();
  };

  // ✅ Order Confirmation
  if (orderPlaced && orderDetails) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Thank you for your purchase!
        </h1>
        <p className="text-gray-700 mb-6">
          Hi <span className="font-semibold">{orderDetails.name}</span>,
          your order has been placed. A confirmation email was sent to {" "}
          <span className="font-semibold">{orderDetails.email}</span>.
        </p>

        <div className="bg-white shadow rounded p-4 text-left mb-6">
          <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
          <ul className="divide-y">
            {orderDetails.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between py-2 text-gray-700"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-right font-bold mt-3">
            Total: ${orderDetails.total.toFixed(2)}
          </h3>
        </div>

        <p className="text-gray-600 mb-2">
          Address: <span className="font-medium">{orderDetails.address}</span>
        </p>
        <p className="text-gray-600">
          Payment Method: <span className="font-medium">{orderDetails.payment}</span>
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {!checkoutMode ? (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm"
              >
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">
                    ${item.price} × {item.quantity} = ${
                      (item.price * item.quantity).toFixed(2)
                    }
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

          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total: ${totalCost.toFixed(2)}</h2>
            <button
              onClick={() => setCheckoutMode(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 shadow"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
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

          {/* Conditional Payment Fields */}
          {form.payment === "card" && (
            <div className="space-y-3">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={form.cardNumber}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={handleChange}
                  className="w-1/2 border rounded p-2"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={form.cvv}
                  onChange={handleChange}
                  className="w-1/2 border rounded p-2"
                />
              </div>
            </div>
          )}

          {processing && (
            <div className="p-4 bg-gray-100 text-center rounded">
              Redirecting to PayPal...
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Confirm Order
          </button>
        </form>
      )}

      {/* Fake PayPal Modal */}
      {showPayPalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">PayPal Login</h2>
            <form onSubmit={handlePayPalLogin} className="space-y-3">
              <input
                type="email"
                name="paypalEmail"
                placeholder="PayPal Email"
                value={form.paypalEmail}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <input
                type="password"
                name="paypalPassword"
                placeholder="Password"
                value={form.paypalPassword}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Login & Pay
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}