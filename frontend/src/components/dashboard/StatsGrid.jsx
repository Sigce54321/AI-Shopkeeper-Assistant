import {
  IndianRupee,
  Package,
  Users,
  Receipt,
} from "lucide-react";

import StatCard from "../common/StatCard";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Today's Revenue"
        value="₹12,450"
        icon={<IndianRupee />}
        color="bg-green-500"
      />

      <StatCard
        title="Products"
        value="245"
        icon={<Package />}
        color="bg-blue-500"
      />

      <StatCard
        title="Customers"
        value="89"
        icon={<Users />}
        color="bg-purple-500"
      />

      <StatCard
        title="Bills Today"
        value="36"
        icon={<Receipt />}
        color="bg-orange-500"
      />

    </div>
  );
}