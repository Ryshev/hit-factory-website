const sharp = require('sharp');

const size = 1080;
const border = 15;
const innerSize = size - border * 2;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="tripleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e23a6e"/>
      <stop offset="50%" stop-color="#6c3ce0"/>
      <stop offset="100%" stop-color="#00b4ff"/>
    </linearGradient>
    <clipPath id="circleClip">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}"/>
    </clipPath>
  </defs>

  <!-- Gradient border circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#tripleGrad)"/>

  <!-- Dark inner circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${innerSize/2}" fill="#0a0a0a"/>

  <!-- HIT text with gradient -->
  <text x="${size/2}" y="${size/2 - 10}"
    text-anchor="middle"
    font-family="Oswald, Arial, sans-serif"
    font-weight="700"
    font-size="280"
    letter-spacing="30"
    fill="url(#tripleGrad)">HIT</text>

  <!-- FACTORY text -->
  <text x="${size/2 + 12}" y="${size/2 + 90}"
    text-anchor="middle"
    font-family="Oswald, Arial, sans-serif"
    font-weight="700"
    font-size="148"
    letter-spacing="44"
    fill="#999999">FACTORY</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile('site/images/logo-instagram.png')
  .then(() => console.log('Done! Saved to site/images/logo-instagram.png'))
  .catch(err => console.error('Error:', err));
