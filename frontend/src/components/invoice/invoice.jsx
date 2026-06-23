import React from "react";

export default function Invoice({ invoice }) {

  if (!invoice) return null;

  return (

    <div className="bg-white rounded-xl shadow-lg mt-8 p-8 border">

      {/* ================= HEADER ================= */}

      <div className="text-center border-b pb-5">

        <h1 className="text-3xl font-bold text-slate-800">
          ANNAPURNA'S KITCHEN
        </h1>

        <p className="text-gray-600">
          AI Shopkeeper Assistant POS
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Mumbai, Maharashtra
        </p>

        <p className="text-sm text-gray-500">
          Phone : +91 XXXXX XXXXX
        </p>

      </div>

      {/* ================= INVOICE DETAILS ================= */}

      <div className="grid grid-cols-2 gap-6 mt-6">

        <div>

          <p>
            <span className="font-semibold">
              Invoice No :
            </span>{" "}
            {invoice.invoice_number}
          </p>

          <p className="mt-2">

            <span className="font-semibold">

              Customer ID :

            </span>{" "}

            {invoice.customer_id}

          </p>

        </div>

        <div className="text-right">

          <p>

            <span className="font-semibold">

              Date :

            </span>{" "}

            {new Date(invoice.created_at).toLocaleDateString()}

          </p>

          <p className="mt-2">

            <span className="font-semibold">

              Time :

            </span>{" "}

            {new Date(invoice.created_at).toLocaleTimeString()}

          </p>

        </div>

      </div>

      {/* ================= PRODUCT NOTE ================= */}

      <div className="mt-8">

        <table className="w-full border">

          <thead className="bg-slate-800 text-white">

            <tr>

              <th className="py-3">Description</th>

              <th>Amount</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="py-4 text-center">

                Products Purchased

              </td>

              <td className="text-center">

                ₹ {invoice.total}

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* ================= TOTAL ================= */}

      <div className="mt-8 flex justify-end">

        <div className="w-80">

          <div className="flex justify-between py-2">

            <span>Subtotal</span>

            <span>₹ {invoice.total}</span>

          </div>

          <div className="flex justify-between py-2">

            <span>Discount</span>

            <span>₹ 0</span>

          </div>

          <div className="flex justify-between py-2">

            <span>GST</span>

            <span>₹ 0</span>

          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-xl font-bold">

            <span>Grand Total</span>

            <span>₹ {invoice.total}</span>

          </div>

        </div>

      </div>

      {/* ================= PAYMENT ================= */}

      <div className="mt-8">

        <p>

          <span className="font-semibold">

            Payment Method :

          </span>{" "}

          CASH

        </p>

        <p className="mt-2">

          <span className="font-semibold">

            Status :

          </span>{" "}

          SUCCESS

        </p>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="border-t mt-10 pt-6 text-center">

        <p className="font-semibold text-lg">

          Thank You For Visiting 🙏

        </p>

        <p className="text-gray-500 mt-2">

          Powered by AI Shopkeeper Assistant

        </p>

      </div>

      {/* ================= BUTTONS ================= */}

      <div className="flex justify-center gap-5 mt-8">

        <button

          onClick={() => window.print()}

          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"

        >

          Print Invoice

        </button>

        <button

          onClick={() => window.location.reload()}

          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"

        >

          New Billing

        </button>

      </div>

    </div>

  );

}