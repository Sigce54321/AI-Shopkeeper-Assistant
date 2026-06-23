import {
  LayoutDashboard,
  Package,
  Users,
  Receipt,
  BarChart3,
  Bot,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Products",
      icon: Package,
      path: "/products",
    },
    {
      name: "Customers",
      icon: Users,
      path: "/customers",
    },
    {
      name: "Billing",
      icon: Receipt,
      path: "/billing",
    },
    {
      name: "Sales",
      icon: BarChart3,
      path: "/sales",
    },
    {
      name: "AI Assistant",
      icon: Bot,
      path: "/ai",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-xl flex flex-col">

      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">

        <div className="flex flex-col items-center">

    <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-5xl shadow-lg">
  🏪
</div>
          <h1 className="text-xl font-bold text-center">
            AI Shopkeeper Assistant
          </h1>

          <p className="text-sm text-slate-400 text-center mt-2">
            Smart Business Manager
          </p>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}