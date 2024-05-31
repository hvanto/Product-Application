import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FarmTipsCarousel() {

    // Settings for the carousel
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableHeight: true 
    };

    // Data for the carousel
    const farmTipsData = [
        {
            image: './farmslider1.jpg',
            tip: 'Selecting Containers',
            captionText: "Terracotta pots, plastic pots, wooden boxes and even old tyres can be used as containers for your own farm. Just make sure they have good drainage holes.",
        },
        {
            image: './farmslider2.jpg',
            tip: 'Choosing Soil',
            captionText: "Herbs enjoy well-draining soil. We recommend a pre-made potting mix to begin.",
        },
        {
            image: './farmslider3.jpg',
            tip: 'Placement',
            captionText: "Place your containers in a sunny spot, preferably with 6-8 hours of sunlight per day. Mobile containers are good so you can move them around if necessary when beginning.",
        },
        {
            image: './farmslider4.jpg',
            tip: 'Watering',
            captionText: "Herbs generally prefer to be watered when the top inch of soil is dry. Be careful not to overwater. ",
        },
        {
            image: './farmslider5.jpg',
            tip: 'Selecting Herbs',
            captionText: "Choose herbs that you commonly use in your cooking or ones that have other benefits like repelling insects. Some popular choices are basil, mint, rosemary and thyme."
        },
        {
            image: './farmslider6.jpg',
            tip: 'Spacing',
            captionText: "Ensure you space your herbs correctly to allow for growth. Most herbs require 6-12 inches of space between each plant.",
        },
    ];

    // Carousel component
    return (
        <div className="container mt-4">
            <div className="row">
                <Slider {...settings}>
                    {/* Loop through the data and display each item in the carousel */}
                    {farmTipsData.map((d, index) => (
                        <div className='col-lg-4 col-md-6 mb-4' key={index}>
                            <div className='card'>
                                <div className='card-img-container'>
                                    <img src={d.image} alt='backyard farm' className='card-img'/>
                                </div>
                                <div className='card-body fixed-height text-center'>
                                    <h5 className='card-title'>{d.tip}</h5>
                                    <p className='card-text'>{d.captionText}</p>                            
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default FarmTipsCarousel;
