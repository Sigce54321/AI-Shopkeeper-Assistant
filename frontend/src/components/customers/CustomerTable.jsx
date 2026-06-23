const CustomerTable = ({
  customers,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="min-w-full">

        <thead className="bg-slate-900 text-white">

          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Actions</th>
          </tr>

        </thead>

        <tbody>

          {customers.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="text-center py-8 text-gray-500"
              >
                No Customers Found
              </td>

            </tr>

          ) : (

            customers.map((customer) => (

              <tr
                key={customer.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-3">
                  {customer.id}
                </td>

                <td className="px-4 py-3 font-semibold">
                  {customer.name}
                </td>

                <td className="px-4 py-3">
                  {customer.phone}
                </td>

                <td className="px-4 py-3 flex gap-2">

                  <button
                    onClick={() => onEdit(customer)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(customer.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default CustomerTable;