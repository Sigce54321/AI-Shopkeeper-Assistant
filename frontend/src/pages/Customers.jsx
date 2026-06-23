import { useEffect, useMemo, useState } from "react";

import CustomerSearch from "../components/customers/CustomerSearch";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerModal from "../components/customers/CustomerModal";

const API_URL = "http://localhost:8000/customers/";

export default function Customers() {

  // ===========================
  // STATES
  // ===========================

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState(null);

  // ===========================
  // FETCH CUSTOMERS
  // ===========================

  const fetchCustomers = async () => {

    try {

      setLoading(true);

      const response = await fetch(API_URL);

      const data = await response.json();

      setCustomers(data);

    } catch (error) {

      console.error("Error loading customers:", error);

      alert("Failed to load customers.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCustomers();

  }, []);

  // ===========================
  // ADD / UPDATE CUSTOMER
  // ===========================

  const handleSaveCustomer = async (customerData) => {

    try {

      if (editingCustomer) {

        const response = await fetch(

          `${API_URL}${editingCustomer.id}`,

          {

            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(customerData),

          }

        );

        if (!response.ok)
          throw new Error("Update failed");

      } else {

        const response = await fetch(

          API_URL,

          {

            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(customerData),

          }

        );

        if (!response.ok)
          throw new Error("Creation failed");

      }

      await fetchCustomers();

      setIsModalOpen(false);

      setEditingCustomer(null);

    } catch (error) {

      console.error(error);

      alert("Unable to save customer.");

    }

  };

  // ===========================
  // DELETE CUSTOMER
  // ===========================

  const handleDeleteCustomer = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this customer?"
    );

    if (!confirmDelete)
      return;

    try {

      const response = await fetch(

        `${API_URL}${id}`,

        {

          method: "DELETE",

        }

      );

      if (!response.ok)
        throw new Error("Delete failed");

      await fetchCustomers();

    } catch (error) {

      console.error(error);

      alert("Unable to delete customer.");

    }

  };

  // ===========================
  // EDIT
  // ===========================

  const handleEditCustomer = (customer) => {

    setEditingCustomer(customer);

    setIsModalOpen(true);

  };

  // ===========================
  // ADD BUTTON
  // ===========================

  const handleAddCustomer = () => {

    setEditingCustomer(null);

    setIsModalOpen(true);

  };

  // ===========================
  // SEARCH
  // ===========================

  const filteredCustomers = useMemo(() => {

    return customers.filter((customer) =>

      customer.name
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      customer.phone.includes(search)

    );

  }, [customers, search]);
    // ===========================
  // UI
  // ===========================

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Customers
        </h1>

      </div>

      <CustomerSearch
        search={search}
        setSearch={setSearch}
        onAddCustomer={handleAddCustomer}
      />

      {
        loading ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <p className="text-gray-500 text-lg">
              Loading customers...
            </p>

          </div>

        ) : (

          <CustomerTable
            customers={filteredCustomers}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
          />

        )
      }

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => {

          setIsModalOpen(false);
          setEditingCustomer(null);

        }}
        onSave={handleSaveCustomer}
        editingCustomer={editingCustomer}
      />

    </div>
  );

}