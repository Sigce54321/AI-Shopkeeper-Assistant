import { Routes, Route } from "react-router-dom";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";
import Sales from "./pages/Sales";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      {/* 🔐 LOGIN (outside layout) */}
      <Route path="/login" element={<Login />} />

      {/* 🧭 DASHBOARD LAYOUT (protected UI shell) */}
      <Route path="/" element={<DashboardLayout />}>

        {/* default dashboard */}
        <Route index element={<Dashboard />} />

        {/* modules */}
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="billing" element={<Billing />} />
        <Route path="sales" element={<Sales />} />
        <Route path="ai" element={<AIAssistant />} />
        <Route path="settings" element={<Settings />} />

      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;