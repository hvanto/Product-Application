import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Users from "./pages/users";
import Products from "./pages/products";
import Reviews from "./pages/reviews";
import AdminContext from "./contexts/AdminContext";

export default function App() {
  const [message, setMessage] = useState(null);

  // Set message to null automatically after a period of time.
  useEffect(() => {
    if(message === null)
      return;

    const id = setTimeout(() => setMessage(null), 5000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminContext.Provider value={{ message, setMessage }}>
        <Router>
          <Navbar />
          <main role="main">
            <div className="container my-3">
              {message && <div className="alert alert-success" role="alert">{message}</div>}
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/reviews" element={<Reviews />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </Router>
      </AdminContext.Provider>
    </div>
  );
}
