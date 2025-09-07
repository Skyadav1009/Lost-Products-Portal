import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ItemCard from "../components/ItemCard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Dummy items (replace with API later)
  const myItems = [
    {
      _id: "1",
      title: "Lost Wallet",
      description: "Black wallet near library",
      image: "",
      status: "lost",
    },
    {
      _id: "2",
      title: "Found Phone",
      description: "iPhone found in cafeteria",
      image: "",
      status: "found",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📂 My Dashboard</h2>

      {user && (
        <p className="mb-4 text-gray-700">
          Welcome back, <span className="font-semibold">{user.name}</span> 👋
        </p>
      )}

      {myItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myItems.map((item) => (
            <div
              key={item._id}
              className={`border rounded-xl shadow p-4 ${
                item.status === "lost" ? "bg-red-50" : "bg-green-50"
              }`}
            >
              <ItemCard item={item} />
              <span
                className={`mt-2 inline-block px-2 py-1 rounded text-sm ${
                  item.status === "lost"
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {item.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You haven’t reported any items yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
