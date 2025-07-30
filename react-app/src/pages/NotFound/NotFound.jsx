import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <div className="notfound-buttons">
        <Link to="/" className="btn">Go Home</Link>
        <button className="btn" onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default NotFound;
