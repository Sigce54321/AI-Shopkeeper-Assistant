import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">

      <h1 className="text-7xl font-bold text-red-600">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>

    </div>
  );
}