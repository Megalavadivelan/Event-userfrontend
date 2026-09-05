import React, { useState } from "react";
import "../styles/Gallery.css";

import hero from "../assets/hero.jpg";
import hero2 from "../assets/hero2.png";

const galleryImages = [
  {
    id: 1,
    image: hero,
    title: "Music Festival",
  },
  {
    id: 2,
    image: hero2,
    title: "Corporate Event",
  },
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Previous image
  const handlePrevious = () => {
    const currentIndex = galleryImages.findIndex(
      (item) => item.id === selectedImage.id
    );

    const previousIndex =
      currentIndex === 0
        ? galleryImages.length - 1
        : currentIndex - 1;

    setSelectedImage(galleryImages[previousIndex]);
  };

  // Next image
  const handleNext = () => {
    const currentIndex = galleryImages.findIndex(
      (item) => item.id === selectedImage.id
    );

    const nextIndex =
      currentIndex === galleryImages.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(galleryImages[nextIndex]);
  };

  return (
    <div className="gallery-page">

      {/* HERO */}

      <section className="gallery-hero">

        <div className="gallery-hero-content">

          <span className="gallery-tag">
            OUR MEMORIES
          </span>

          <h1>
            Moments That <span>Matter</span>
          </h1>

          <p>
            Explore the unforgettable moments,
            celebrations and experiences from
            our amazing events.
          </p>

        </div>

      </section>


      {/* GALLERY */}

      <section className="gallery-section">

        <div className="gallery-grid">

          {galleryImages.map((item) => (
            <div
              className="gallery-card"
              key={item.id}
              onClick={() => setSelectedImage(item)}
            >

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="gallery-overlay">

                <h3>{item.title}</h3>

                <div className="view-icon">
                  +
                </div>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* IMAGE PREVIEW */}

      {selectedImage && (

        <div
          className="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
        >

          {/* CLOSE */}

          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>


          {/* PREVIOUS */}

          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            ‹
          </button>


          {/* IMAGE */}

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
            />

            <div className="lightbox-info">
              <h2>{selectedImage.title}</h2>
            </div>

          </div>


          {/* NEXT */}

          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            ›
          </button>

        </div>

      )}

    </div>
  );
}

export default Gallery;