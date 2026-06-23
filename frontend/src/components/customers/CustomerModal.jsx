import { useEffect, useState } from "react";

const CustomerModal = ({
  isOpen,
  onClose,
  onSave,
  editingCustomer,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {

    if (editingCustomer) {
      setFormData(editingCustomer);
    } else {
      setFormData({
        name: "",
        phone: "",
      });
    }

  }, [editingCustomer]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[400px]">

        <h2 className="text-xl font-bold mb-4">

          {editingCustomer
            ? "Edit Customer"
            : "Add Customer"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Customer Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg p-2"
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
            className="w-full border rounded-lg p-2"
            required
          />

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CustomerModal;