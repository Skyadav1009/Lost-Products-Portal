import { useEffect, useState, useContext } from "react";
import API from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const lostRes = await API.get("/lost/my-items");
        const foundRes = await API.get("/found/my-items");

        setLostItems(lostRes.data);
        setFoundItems(foundRes.data);
      } catch (err) {
        console.error("Error fetching dashboard items:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyItems();
  }, [user]);

  if (loading) return <div className="text-center py-8">Loading your items...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <p className="mb-6 text-gray-700">Welcome, {user?.name}</p>

      {/* My Lost Items */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">My Lost Items</h2>
        {lostItems.length === 0 ? (
          <p className="text-gray-500">You haven’t reported any lost items yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostItems.map((item) => (
              <div key={item._id} className="bg-white p-4 shadow rounded-xl border">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-sm text-gray-500">
                  Reported on: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* My Found Items */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">My Found Items</h2>
        {foundItems.length === 0 ? (
          <p className="text-gray-500">You haven’t reported any found items yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundItems.map((item) => (
              <div key={item._id} className="bg-white p-4 shadow rounded-xl border">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-sm text-gray-500">
                  Reported on: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
