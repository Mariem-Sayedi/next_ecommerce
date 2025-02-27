"use client"
import { Carousel } from "react-bootstrap";
import "../../src/assets/css/bootstrap.min.css";

const ImageCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="img/h4-slide.png" alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img/h4-slide2.png" alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img/h4-slide3.png" alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
