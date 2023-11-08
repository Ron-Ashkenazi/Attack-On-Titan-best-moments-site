import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import "./Slider.css";

const Slider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0); // Reset currentIndex to 0 whenever the slides prop changes
  }, [props.slides]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? props.slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === props.slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="slider-container relative group">
      {props.slides?.length > 0 && (
        <div
          style={{ backgroundImage: `url(${props.slides[currentIndex]?.url})` }}
          className="slide-item"
        ></div>
      )}
      {/* Left Arrow */}
      <div className="left-arrow group hidden">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="right-arrow group hidden">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="dot-container">
        {props.slides?.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`dot-item ${
              slideIndex === currentIndex ? "active-dot" : ""
            }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
