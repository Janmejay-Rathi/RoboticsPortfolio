import React from 'react';
import '../styles/photos.css';

const photos = [
  'images/photos/photo1.jpg',
  'images/photos/photo2.jpg',
  'images/photos/photo3.jpg',
  'images/photos/photo4.jpg',
];

const Photos = () => (
  <section className="photos-section" id="photos">
    <h2>📸 My Photos</h2>
    <div className="photo-grid">
      {photos.map((src) => (
        <div className="photo-tile" key={src}>
          <img src={src} alt="User uploaded content" />
        </div>
      ))}
    </div>
  </section>
);

export default Photos;
