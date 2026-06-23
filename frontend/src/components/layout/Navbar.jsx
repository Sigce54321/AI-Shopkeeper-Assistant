import {
  Bell,
  Search,
  Store,
  UserCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Navbar() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b shadow-sm">

      <div className="flex items-center justify-between px-8 py-4">

        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            <Link to="/">Dashboard</Link>
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {today}
          </p>
        </div>

        {/* CENTER SEARCH */}
        <div className="relative w-96">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products, customers..."
            className="
              w-full
              pl-10
              pr-4
              py-2
              rounded-xl
              border
              border-gray-300
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          <button className="relative">
            <Bell size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center gap-3">

            <Store size={28} className="text-blue-600" />

            <div>
              <h2 className="font-semibold">AI Shopkeeper</h2>
              <p className="text-sm text-green-600">● Online</p>
            </div>

          </div>

          <UserCircle size={40} className="text-slate-700" />

        </div>

      </div>
    </header>
  );
}