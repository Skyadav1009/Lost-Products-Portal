import { useEffect, useState } from "react";
import API from "../utils/axios";

const Home = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const lostRes = await API.get("/lost");
        const foundRes = await API.get("/found");

        setLostItems(lostRes.data);
        setFoundItems(foundRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading items...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Lost & Found Portal</h1>

      {/* Lost Items */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Lost Items</h2>
        {lostItems.length === 0 ? (
          <p className="text-gray-500">No lost items reported yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 shadow rounded-xl border"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-sm text-gray-500">
                  Reported by: {item.user?.name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Found Items */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Found Items</h2>
        {foundItems.length === 0 ? (
          <p className="text-gray-500">No found items reported yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 shadow rounded-xl border"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-sm text-gray-500">
                  Reported by: {item.user?.name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
