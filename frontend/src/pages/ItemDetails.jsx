import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  // Dummy data (replace with API later)
  useEffect(() => {
    const dummyItems = [
      {
        _id: "1",
        title: "Lost Wallet",
        description: "Black leather wallet with college ID inside.",
        location: "Library - 2nd Floor",
        date: "2025-09-01",
        image: "",
        status: "lost",
      },
      {
        _id: "2",
        title: "Found Phone",
        description: "iPhone found in cafeteria, has a blue cover.",
        location: "Cafeteria",
        date: "2025-09-02",
        image: "",
        status: "found",
      },
    ];

    const foundItem = dummyItems.find((itm) => itm._id === id);
    setItem(foundItem);
  }, [id]);

  if (!item) {
    return <p className="text-center mt-10">Loading item details...</p>;
  }

  const handleClaim = () => {
    alert(`You have claimed this item: ${item.title} (dummy action)`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
      <img
        src={item.image || "https://via.placeholder.com/400"}
        alt={item.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Description:</span> {item.description}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Location:</span> {item.location}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Date:</span>{" "}
        {new Date(item.date).toLocaleDateString()}
      </p>
      <p className="mb-4">
        <span
          className={`px-3 py-1 rounded text-sm ${
            item.status === "lost"
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {item.status.toUpperCase()}
        </span>
      </p>

      {/* Claim Button */}
      {item.status === "found" && (
        <button
          onClick={handleClaim}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Claim Item
        </button>
      )}
    </div>
  );
};

export default ItemDetails;
