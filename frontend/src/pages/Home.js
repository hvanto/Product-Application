import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Home() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
      `${process.env.PUBLIC_URL}/slideshow1.jpg`,
      `${process.env.PUBLIC_URL}/slideshow2.jpg`,
      `${process.env.PUBLIC_URL}/slideshow3.jpg`,
  ];

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 3000);

      return () => clearInterval(interval);
  }, [currentSlide, slides.length]);


  const useScrollToTop = () => {
      const location = useLocation();
      useEffect(() => {
        window.scrollTo({ top: 0 });
        // scroll to the top of the browser window when changing route
        // the window object is a normal DOM object and is safe to use in React.
      }, [location]);
  };

  useScrollToTop();

  return (
      <div>
        {/* Slideshow */}
        <div className="slideshow-wrapper">
          <div className="text-center slideshow-container">
            <img src={slides[currentSlide]} alt={`Slideshow ${currentSlide + 1}`} className="img-fluid slideshow-image" />
          </div>
          <div className="slideshow-overlay"></div>
          {/* Slideshow text */}
          <div className="slideshow-text">
            <h2 className="fs-4 text-center mt-3 mb-3">Welcome to Soil Organic Grocer</h2>
            <p className="fs-6 text-center">We care for the planet, so you can care for yourself</p>
          </div>
          </div>
          {/* Our Organic Promise */}
          <div className="container mt-4">
            <div className="text-center">
              <h2 className="fs-4">Our Organic Promise</h2>
              <p className="fs-6">At Soil Organic Grocer, we stand by Our Organic Promise, dedicated to providing you with the freshest and most nutritious organic foods. Organic foods are cultivated without synthetic pesticides, fertilizers, or genetically modified organisms (GMOs), ensuring that you receive produce in its purest form. By choosing organic, you not only support sustainable farming practices but also prioritize your health. Organic foods are rich in essential nutrients, vitamins, and antioxidants, promoting overall well-being and vitality. With a focus on quality and purity, our organic selection offers superior taste and nutritional value. Embrace the benefits of organic living and nourish your body with nature's goodness at Soil Organic Grocer.</p>
            </div>
          </div>
    </div>
  );
}

export default Home;