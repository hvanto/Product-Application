import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { React, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Backyardfarm from './pages/Backyardfarm';
import Seminars from './pages/Seminars';
import IndividualProduct from './pages/IndividualProductPage';
import { CartProvider } from './context/CartContext';
import { UserContext } from './context/UserContext';

function App() {

  // const [email ,setEmail] = useState(null);

  // const loginUser = (email) => {
  //   setEmail(email);
  // }

  // //Change this to use localhost:4000/api/users/logout
  // const logoutUser = () => {
  //   setEmail('');
  //   localStorage.removeItem('isLoggedIn');
  //   localStorage.removeItem('currentUser');

  const { loginUser, logoutUser } = useContext(UserContext);

  return (
    //<UserContext.Provider value={{ loginUser, logoutUser }}>
    <CartProvider>
      <Router>
            <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/backyardfarm" element={<Backyardfarm />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/seminars" element={<Seminars />} />
                  <Route path="/products/:productId" element={<IndividualProduct />} />
                </Routes>
        <Footer />
      </Router>
    </CartProvider>
    //</UserContext.Provider>
  );
}
export default App;
