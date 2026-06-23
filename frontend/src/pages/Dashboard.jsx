import Hero from "../components/dashboard/Hero";
import StatsGrid from "../components/dashboard/StatsGrid";
import QuickActions from "../components/dashboard/QuickActions";
import AIInsights from "../components/dashboard/AIInsights";
import LowStock from "../components/dashboard/LowStock";
import SalesChart from "../components/dashboard/SalesChart";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <>
      <Hero />

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <AIInsights />
        <LowStock />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <SalesChart />
        <RecentActivity />
      </div>

      <QuickActions />
    </>
  );
}