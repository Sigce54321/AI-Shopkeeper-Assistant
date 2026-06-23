export default function RecentActivity(){

const activity=[

"Bill #105 Generated",

"New Customer Added",

"Milk Stock Updated",

"AI Prediction Completed"

]

return(

<div className="bg-white rounded-2xl shadow-md p-6">

<h2 className="text-xl font-bold mb-5">

Recent Activity

</h2>

<div className="space-y-4">

{activity.map(item=>(

<div
key={item}
className="border-b pb-2">

{item}

</div>

))}

</div>

</div>

)

}