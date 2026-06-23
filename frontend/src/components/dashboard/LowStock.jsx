import { TriangleAlert } from "lucide-react";

export default function LowStock() {

  const products = [
    "Milk",
    "Sugar",
    "Rice",
    "Tea Powder",
  ];

  return (

    <div className="bg-white rounded-2xl shadow-md p-6 h-full">

      <div className="flex items-center gap-3 mb-5">

        <TriangleAlert className="text-red-500"/>

        <h2 className="text-xl font-bold">

          Low Stock

        </h2>

      </div>

      <div className="space-y-4">

        {products.map(product=>(
          <div
          key={product}
          className="flex justify-between border-b pb-2">

            <span>{product}</span>

            <span className="text-red-500 font-semibold">
              Low
            </span>

          </div>
        ))}

      </div>

    </div>

  );

}