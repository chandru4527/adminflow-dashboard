import React from "react";
import { MdClose } from "react-icons/md";

const FoodDonationModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  console.log('model', data);



  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl rounded bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-lg font-bold">Food Items</h2>

          <button onClick={onClose}>
            <MdClose size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-125 overflow-y-auto p-5">

          {data?.length > 0 ? (
            <table className="w-full">
              <thead className="sticky top-0 bg-green-100">
                <tr className="text-left">
                  <th className="border border-gray-300 px-4 py-3">Image</th>
                  <th className="border border-gray-300 px-4 py-3">Food Name</th>
                  <th className="border border-gray-300 px-4 py-3">Quantity</th>
                  <th className="border border-gray-300 px-4 py-3">Category</th>
                </tr>
              </thead>

              <tbody>
                {data.map((food, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={food.image}
                        alt={food.foodName}
                        className="h-15 w-15 rounded object-cover"
                      />
                    </td>

                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {food.foodName}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {food.quantity}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {food.category || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No food items found.</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-4">
          <button
            onClick={onClose}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default FoodDonationModal