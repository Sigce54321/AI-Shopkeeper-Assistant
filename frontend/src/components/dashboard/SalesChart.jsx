import { BarChart3 } from "lucide-react";

export default function SalesChart(){

return(

<div className="bg-white rounded-2xl shadow-md p-6">

<div className="flex items-center gap-3 mb-5">

<BarChart3 className="text-green-600"/>

<h2 className="text-xl font-bold">

Sales Analytics

</h2>

</div>

<div className="h-64 flex items-center justify-center text-gray-400">

Chart.js will be integrated in Phase 7

</div>

</div>

)

}