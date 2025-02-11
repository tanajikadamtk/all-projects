import ProductList from "../components/ProductList";
import UserList from "../components/UserList";


const Home = () => {
  return (
    <div className="text-left">
      <h1>Welcome to the Store</h1>
      <ProductList />

      <h1>User List</h1>
      <UserList />
    </div>
  );
};

export default Home;
