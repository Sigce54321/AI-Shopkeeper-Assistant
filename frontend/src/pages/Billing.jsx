import Invoice from "../components/invoice/Invoice";
import { useEffect, useState } from "react";

const API = "http://localhost:8000";

const Billing = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [lastInvoice, setLastInvoice] = useState(null);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${API}/products`),
          fetch(`${API}/customers`)
        ]);

        const pData = await pRes.json();
        const cData = await cRes.json();

        setProducts(Array.isArray(pData) ? pData : pData.data || []);
        setCustomers(Array.isArray(cData) ? cData : cData.data || []);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // ================= CART =================
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((c) => c.id === product.id);

      if (exists) {
        return prevCart.map((c) =>
          c.id === product.id ? { ...c, qty: c.qty + 1 } : c
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.selling_price * item.qty,
    0
  );

  // ================= CUSTOMER =================
  const addCustomer = async () => {
    if (!customerForm.name || !customerForm.phone) return;

    try {
      const res = await fetch(`${API}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerForm)
      });

      const data = await res.json();

      setCustomers((prev) => [...prev, data]);
      setCustomerForm({ name: "", phone: "" });
    } catch (err) {
      console.log("Customer add error:", err);
    }
  };

  // ================= CHECKOUT =================
  const handleCheckout = async () => {
    if (!selectedCustomer) {
      alert("Select customer first");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customer_id: selectedCustomer.id,
        items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
          price: item.selling_price
        })),
        total
      };

      const res = await fetch(`${API}/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Checkout failed");

      const invoice = await res.json();

      setLastInvoice(invoice);
      setCart([]);
      setSelectedCustomer(null);

      alert("Invoice Generated Successfully!");
    } catch (err) {
      console.log(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="p-6 grid grid-cols-3 gap-6 bg-gray-50 min-h-screen">

      {/* PRODUCTS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-3">Products</h2>

        {products.map((p) => (
          <div key={p.id} className="flex justify-between border p-2 mb-2">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">₹{p.selling_price}</p>
            </div>

            <button
              onClick={() => addToCart(p)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-3">Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Cart empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="border p-2 mb-2">
              <p className="font-semibold">{item.name}</p>
              <p>Qty: {item.qty}</p>
              <p>Total: ₹{item.qty * item.selling_price}</p>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))
        )}

        <hr className="my-3" />

        <h3 className="font-bold">Total: ₹{total}</h3>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-blue-600 text-white w-full mt-3 py-2 rounded"
        >
          {loading ? "Processing..." : "Generate Invoice"}
        </button>
      </div>

      {/* CUSTOMER */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-3">Customer</h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={customerForm.name}
          onChange={(e) =>
            setCustomerForm({ ...customerForm, name: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full mb-2"
          value={customerForm.phone}
          onChange={(e) =>
            setCustomerForm({ ...customerForm, phone: e.target.value })
          }
        />

        <button
          onClick={addCustomer}
          className="bg-green-600 text-white w-full py-2 rounded mb-4"
        >
          Add Customer
        </button>

        {customers.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCustomer(c)}
            className={`p-2 border mb-2 cursor-pointer ${
              selectedCustomer?.id === c.id ? "bg-blue-100" : ""
            }`}
          >
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm">{c.phone}</p>
          </div>
        ))}

        {selectedCustomer && (
          <div className="mt-3 p-2 bg-green-100 rounded">
            Selected: {selectedCustomer.name}
          </div>
        )}

        {lastInvoice && (
          <div className="mt-4">
            <Invoice invoice={lastInvoice} />
          </div>
        )}
      </div>

    </div>
  );
};

export default Billing;