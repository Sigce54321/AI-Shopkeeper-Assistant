import { Bot } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-full">

      <div className="flex items-center gap-3 mb-5">

        <Bot className="text-blue-600" />

        <h2 className="text-xl font-bold">
          AI Insights
        </h2>

      </div>

      <ul className="space-y-4 text-gray-600">

        <li>✔ Milk is the highest selling product.</li>

        <li>✔ Bread demand increased 15% this week.</li>

        <li>✔ Rice stock is becoming low.</li>

        <li>✔ Estimated today's revenue ₹12,500.</li>

      </ul>

    </div>
  );
}