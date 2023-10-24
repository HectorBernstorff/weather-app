// WeatherBackground.js
import React from 'react';

import background01d from '../assets/pictures/background/01d.jpg';
import background01n from '../assets/pictures/background/01n.jpg';
import background02d from '../assets/pictures/background/02d.jpg';
import background02n from '../assets/pictures/background/02n.jpg';
import background03d from '../assets/pictures/background/03d.jpg';
import background03n from '../assets/pictures/background/03n.jpg';
import background04d from '../assets/pictures/background/04d.jpg';
import background04n from '../assets/pictures/background/04n.jpg';
import background09d from '../assets/pictures/background/09d.jpg';
import background09n from '../assets/pictures/background/09n.jpg';
import background10d from '../assets/pictures/background/10d.jpg';
import background10n from '../assets/pictures/background/10n.jpg';
import background11d from '../assets/pictures/background/11d.jpg';
import background11n from '../assets/pictures/background/11n.jpg';
import background13d from '../assets/pictures/background/13d.jpg';
import background13n from '../assets/pictures/background/13n.jpg';
import background50d from '../assets/pictures/background/50d.jpg';
import background50n from '../assets/pictures/background/50n.jpg';

const WeatherBackground = ({ icon }) => {
  const getWeatherBackgroundImage = (icon) => {
    switch (icon) {
      case '01d':
        return background01d;
      case '01n':
        return background01n;
      case '02d':
        return background02d;
      case '02n':
        return background02n;
      case '03d':
        return background03d;
      case '03n':
        return background03n;
      case '04d':
        return background04d;
      case '04n':
        return background04n;
      case '09d':
        return background09d;
      case '09n':
        return background09n;
      case '10d':
        return background10d;
      case '10n':
        return background10n;
      case '11d':
        return background11d;
      case '11n':
        return background11n;
      case '13d':
        return background13d;
      case '13n':
        return background13n;
      case '50d':
        return background50d;
      case '50n':
        return background50n;
      default:
        return `url(defaultImage.jpg)`;
    }
  };

  const backgroundImage = getWeatherBackgroundImage(icon);

  const style = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundImage: `url(${backgroundImage})`,
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
    transition: 'background-image 0.5s ease', // Adjust the duration and timing function as needed
  };
  

  return (
    <div style={style}>
      {/* Your other content here */}
    </div>
  );
};

export default WeatherBackground;
