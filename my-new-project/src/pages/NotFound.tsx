import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center">
      <h2>❌ 404 - Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default NotFound;
