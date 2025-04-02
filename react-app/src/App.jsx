import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detect from "./pages/Detect";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<Detect />} />
          </Routes>
          <Footer/>

          
      </Router>
    </div>
  );
}

export default App;
