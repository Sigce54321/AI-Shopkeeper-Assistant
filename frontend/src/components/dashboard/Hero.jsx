export default function Hero() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 mb-8">

      <h1 className="text-4xl font-bold">
        Welcome, Big Boss 👋
      </h1>

      <p className="mt-3 text-lg">
        AI Shopkeeper Assistant
      </p>

      <p className="mt-2 text-blue-100">
        {today}
      </p>

    </div>
  );

}