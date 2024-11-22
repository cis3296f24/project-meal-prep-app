import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import defaultImage from '../../../src/parkImg-default.png';

/**
 * Renders a gallery of highlighted parks.
 * @module HighlightGallery
 * @memberof HomePage
 * @returns {JSX.Element} The HighlightGallery component.
 */
const HighlightGallery = () => {
  const [highlightedParks, setHighlightedParks] = useState([]);

  useEffect(() => {
    async function fetchParks() {
      try {
        const url = `https://developer.nps.gov/api/v1/parks?api_key=Y7kFnm6SP5SMQhkTvwUSgyjge9buj4DbjrkuV2S0&limit=471`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Unable to fetch parks');
        }
        const data = await response.json();
        const randomParks = getRandomParks(data.data, 20);

        setHighlightedParks(randomParks);
        console.log(randomParks);
      } catch (error) {
        console.log('Error Fetching parks: ', error.message);
      }
    }

    fetchParks();
  }, []);

  const getRandomParks = (returnedParks, numParks) => {
    const parks = returnedParks.sort(() => 0.5 - Math.random()).slice(0, numParks);
    return parks;
  };

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="gallery">
      <h1 className="header">Check Out These Parks!</h1>
      <Slider {...sliderSettings} className="slider">
        {highlightedParks.map((park) => (
          <div key={park.id} className="slide">
            <h2>{park.fullName}</h2>
            {/* <p>{park.description}</p> */}
            {park.images && park.images.length > 0 && (
              <img src={park.images.length < 2 ? park.images[0].url : park.images[1].url}
              alt="slide-image"
              onError={(e) => {
                e.target.src = defaultImage;
              }} />
            )}
            <Link to = {`/ParkInfo?parkCode=${park.parkCode}`}><button className="more-info">Learn More</button></Link>
          </div>
        ))}
      </Slider>
      </div>
  );
};

export default HighlightGallery;
