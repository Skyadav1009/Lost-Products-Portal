import ItemCard from "../components/ItemCard";

const dummyItems = [
  { _id: "1", title: "Lost Wallet", description: "Black leather wallet near library", image: "" },
  { _id: "2", title: "Found Phone", description: "iPhone found in cafeteria", image: "" }
];

const Home = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {dummyItems.map(item => <ItemCard key={item._id} item={item} />)}
    </div>
  );
};

export default Home;
