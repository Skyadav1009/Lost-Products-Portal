import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="border rounded-xl shadow p-4 bg-white">
      <img src={item.image || "https://via.placeholder.com/150"} alt={item.title} className="h-40 w-full object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{item.title}</h2>
      <p className="text-gray-600">{item.description.slice(0, 50)}...</p>
      <Link to={`/items/${item._id}`} className="text-blue-600 mt-2 block">
        View Details
      </Link>
    </div>
  );
};

export default ItemCard;
