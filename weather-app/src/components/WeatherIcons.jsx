import React from 'react';

import icon01d from '../assets/pictures/01d.png';
import icon01n from '../assets/pictures/01n.png';
import icon02d from '../assets/pictures/02d.png';
import icon02n from '../assets/pictures/02n.png';
import icon03d from '../assets/pictures/03d.png';
import icon03n from '../assets/pictures/03n.png';
import icon04d from '../assets/pictures/04d.png';
import icon04n from '../assets/pictures/04n.png';
import icon09d from '../assets/pictures/09d.png';
import icon09n from '../assets/pictures/09n.png';
import icon10d from '../assets/pictures/10d.png';
import icon10n from '../assets/pictures/10n.png';
import icon11d from '../assets/pictures/11d.png';
import icon11n from '../assets/pictures/11n.png';
import icon13d from '../assets/pictures/13d.png';
import icon13n from '../assets/pictures/13n.png';
import icon50d from '../assets/pictures/50d.png';
import icon50n from '../assets/pictures/50n.png';


function WeatherIcons({ iconCode }) {
  const getWeatherIconImage = (code) => {
    switch (iconCode) {
        case '01d':
          return icon01d;
        case '01n':
          return icon01n;
        case '02d':
          return icon02d;
        case '02n':
          return icon02n;
        case '03d':
          return icon03d;
        case '03n':
          return icon03n;
        case '04d':
          return icon04d;
        case '04n':
          return icon04n;
        case '09d':
          return icon09d;
        case '09n':
          return icon09n;
        case '10d':
          return icon10d;
        case '10n':
          return icon10n;
        case '11d':
          return icon11d;
        case '11n':
          return icon11n;
        case '13d':
          return icon13d;
        case '13n':
          return icon13n;
        case '50d':
          return icon50d;
        case '50n':
          return icon50n;
        default:
          // Default image or handle the case when the icon code is not recognized.
          return defaultImage;
      }
  }

  const iconSrc = getWeatherIconImage(iconCode);

  return <img src={iconSrc} alt="" />;
}

export default WeatherIcons;