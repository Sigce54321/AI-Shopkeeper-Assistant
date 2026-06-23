import { useEffect, useState } from "react";

export default function Sales() {

  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/sales")
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Sales History
        </h1>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Total Sales : {sales.length}
        </span>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="min-w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="px-4 py-3">ID</th>

              <th className="px-4 py-3">Invoice</th>

              <th className="px-4 py-3">Customer</th>

              <th className="px-4 py-3">Total</th>

              <th className="px-4 py-3">Payment</th>

              <th className="px-4 py-3">Date</th>

            </tr>

          </thead>

          <tbody>

            {sales.map((sale) => (

              <tr
                key={sale.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-3">
                  {sale.id}
                </td>

                <td className="px-4 py-3 font-semibold">
                  {sale.bill_number}
                </td>

                <td className="px-4 py-3">
                  #{sale.customer_id}
                </td>

                <td className="px-4 py-3 text-green-600 font-semibold">
                  ₹ {sale.total_amount}
                </td>

                <td className="px-4 py-3">

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      sale.payment_status === "SUCCESS"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >

                    {sale.payment_status}

                  </span>

                </td>

                <td className="px-4 py-3">
                  {new Date(sale.created_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );

}