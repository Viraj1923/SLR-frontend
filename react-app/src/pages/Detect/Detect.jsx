import { useNavigate } from "react-router-dom";
import Flag from 'react-world-flags';
import "./Detect.css";


const Detect = () => {
    const navigate = useNavigate();

    return (
        <div className="detect-selector">
            <h1>Select Sign Language</h1>
            <div className="detect-options">
                

                <button onClick={() => navigate("/detect/asl")}>
                    <Flag code="US" style={{ width: "24px", marginRight: "8px" }} />
                    American Sign Language
                </button>

                <button onClick={() => navigate("/detect/isl")}>
                    <Flag code="IN" style={{ width: "24px", marginRight: "8px" }} />
                    Indian Sign Language
                </button>

            </div>
        </div>
    );
};

export default Detect;
