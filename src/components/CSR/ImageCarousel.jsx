"use client"
import { Carousel } from "react-bootstrap";

const ImageCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="img/h4-slide.png" alt="First slide" style={{ width: 'auto', height: 'auto' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img/h4-slide2.png" alt="Second slide" style={{ width: 'auto', height: 'auto' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img/h4-slide3.png" alt="Third slide" style={{ width: 'auto', height: 'auto' }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
