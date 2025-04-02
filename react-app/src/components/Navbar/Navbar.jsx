import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar=()=>{
    return(
        <nav className="nav">
            <img src="\public\main-logo.png" alt="Logo" className="nav-logo" />
            <span className="nav-links">
                
                <Link to={"/"}>Home</Link>
                <Link to={"/detect"}>Detect</Link>
                <Link>Login</Link>
            </span>
        </nav>
    );
};

export default Navbar;