import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./Footer.css"
const Footer = () => {
    return (
        <footer className="foot">
            <div className="footer-container text-center">
                <p style={{fontSize:"17px"}}>© 2025 FingerTalk. All rights reserved.</p>
                <p style={{fontSize:"11px"}}>Email: support@fingertalk.com | Phone:9322088888</p>
                <p style={{fontSize:"11px"}}>Subscribe to our newsletter for updates:</p>
                <div> 
                    <a href="#"><i class="fa-brands fa-facebook fa-2xl"></i></a>
                    <a href="#"><i class="fa-brands fa-x-twitter fa-2xl"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin-in fa-2xl"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

