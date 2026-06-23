import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    barcode: "",
    selling_price: "",
    cost_price: "",
    stock_quantity: ""
  });

  // ================= FETCH =================
  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data;
        setProducts(list || []);
      });
  }, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= OPEN ADD MODAL =================
  const openAddModal = () => {
    setIsEdit(false);
    setFormData({
      name: "",
      barcode: "",
      selling_price: "",
      cost_price: "",
      stock_quantity: ""
    });
    setShowModal(true);
  };

  // ================= OPEN EDIT MODAL =================
  const openEditModal = (product) => {
    setIsEdit(true);
    setEditingId(product.id);

    setFormData({
      name: product.name,
      barcode: product.barcode,
      selling_price: product.selling_price,
      cost_price: product.cost_price,
      stock_quantity: product.stock_quantity
    });

    setShowModal(true);
  };

  // ================= SAVE (ADD / EDIT) =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "http://localhost:8000/products";
      let method = "POST";

      if (isEdit) {
        url = `http://localhost:8000/products/${editingId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Request failed");

      const updatedProduct = await response.json();

      if (isEdit) {
        setProducts(
          products.map((p) =>
            p.id === editingId ? updatedProduct : p
          )
        );
      } else {
        setProducts([...products, updatedProduct]);
      }

      setShowModal(false);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) throw new Error("Delete failed");

      setProducts(products.filter((p) => p.id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  // ================= SEARCH =================
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.barcode?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex gap-3">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="px-3 py-2 border rounded-lg"
          />

          <button
            onClick={openAddModal}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Product
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Barcode</th>
              <th className="px-4 py-3">Selling</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-b">

                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2 font-semibold">{p.name}</td>
                <td className="px-4 py-2">{p.barcode}</td>
                <td className="px-4 py-2">₹{p.selling_price}</td>
                <td className="px-4 py-2">₹{p.cost_price}</td>
                <td className="px-4 py-2">{p.stock_quantity}</td>

                <td className="px-4 py-2 flex gap-2">

                  <button
                    onClick={() => openEditModal(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    🗑️ Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input name="name" value={formData.name} onChange={handleChange} className="w-full border p-2" placeholder="Name" />

              <input name="barcode" value={formData.barcode} onChange={handleChange} className="w-full border p-2" placeholder="Barcode" />

              <input name="selling_price" value={formData.selling_price} onChange={handleChange} className="w-full border p-2" placeholder="Selling Price" />

              <input name="cost_price" value={formData.cost_price} onChange={handleChange} className="w-full border p-2" placeholder="Cost Price" />

              <input name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} className="w-full border p-2" placeholder="Stock" />

              <div className="flex justify-end gap-2">

                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 px-4 py-2 text-white rounded">
                  Cancel
                </button>

                <button type="submit" className="bg-green-600 px-4 py-2 text-white rounded">
                  {isEdit ? "Update" : "Save"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Products;