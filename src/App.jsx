import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Home from "./pages/Home/Home";
import Detect from "./pages/Detect/Detect";
import Login from './pages/Auth/Login';
import Signup from "./pages/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ASLDetect from "./pages/Detect/ASLDetect/ASLDetect";
import ISLDetect from "./pages/Detect/ISLDetect/ISLDetect";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";

function App() {
  console.log('App component loaded');
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/detect" element={<Detect />} />
            <Route
              path="/detect/asl"
              element={
                <PrivateRoute>
                  <ASLDetect />
                </PrivateRoute>
              }
            />
            <Route
              path="/detect/isl"
              element={
                <PrivateRoute>
                  <ISLDetect />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        />
      </Router>
    </div>
  );
}

export default App;
