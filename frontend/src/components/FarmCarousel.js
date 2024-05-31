import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


function FarmCarousel() {
  const [index, setIndex] = useState(0);

  // Function to handle the carousel index
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Carousel data
  const carouselData = [
    {
        id: 1,
        image: './backyardfarm1.jpg',
        altText: 'First slide',
        caption: 'Looking to grow your own backyard farm?',
        captionText: "You've come to the right place! Scroll through for our tips & tricks on getting started. ",
    },
    {
        id: 2,
        image: './backyardfarm2.jpg',
        altText: 'Second slide',
        caption: 'Place your containers in a sunny spot.',
        captionText: 'Herbs generally enjoy 6-8 hours of sunglight a day, so ensure they are placed in a position to receive this.',
    },
    {
        id: 3,
        image: './backyardfarm3.jpg',
        altText: 'Third slide',
        caption: 'Herbs generally prefer slightly dry conditions, water the herbs when the top inch of soil feels dry to the touch.',
        captionText: 'Scroll down for our full list of tips!',
    },
  ];

  // Carousel component
  return (
    <section id="home" className="hero-block slideshow-wrapper"> 
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {/* Loop through the data and display each item in the carousel */}
        {carouselData.map(carousel => (
          <Carousel.Item key={carousel.id}>
            <img
              className="d-block w-100 slideshow-img" 
              src={carousel.image}
              alt={carousel.altText}
            />
            <div className="slideshow-overlay"></div> 
            <Carousel.Caption className="slideshow-text"> 
              <h3>{carousel.caption}</h3>
              <p>{carousel.captionText}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default FarmCarousel;
