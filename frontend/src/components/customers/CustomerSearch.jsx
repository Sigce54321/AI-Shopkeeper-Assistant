const CustomerSearch = ({
  search,
  setSearch,
  onAddCustomer,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">

      <input
        type="text"
        placeholder="Search customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-80 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={onAddCustomer}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
      >
        + Add Customer
      </button>

    </div>
  );
};

export default CustomerSearch;