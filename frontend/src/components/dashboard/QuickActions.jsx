export default function QuickActions() {
  const actions = [
    "➕ Add Product",
    "👤 Add Customer",
    "🧾 New Bill",
    "🤖 AI Assistant",
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {actions.map((action) => (
          <button
            key={action}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 transition"
          >
            {action}
          </button>
        ))}

      </div>

    </div>
  );
}