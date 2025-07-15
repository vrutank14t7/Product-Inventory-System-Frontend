// import React from "react";
// import Slider from "react-slick";
// import styled from "styled-components";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaTimes } from "react-icons/fa";

// const FullScreenCarouselContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.8);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 9999;
// `;

// const CarouselWrapper = styled.div`
//   width: 90%;
//   position: relative;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 1rem;
//   right: 1rem;
//   background: rgb(131 129 129 / 50%);
//   border: none;
//   border-radius: 50%;
//   width: 30px;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   color: white;
//   z-index: 10000;
// `;

// const ImageWrapper = styled.div`
//   text-align: center;
//   height: 90vh;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const CarouselImage = styled.img`
//   max-width: 100%;
//   max-height: 90vh;
//   border-radius: 10px;
// `;

// const StyledSlider = styled(Slider)`
//   .slick-dots {
//     li {
//       width: 10px;
//       height: 10px;
//       margin: 0 5px;

//       &.slick-active div {
//         background-color: #bbbebb;
//       }

//       div {
//         width: 10px;
//         height: 10px;
//         border-radius: 50%;
//         background-color: black;
//       }
//     }
//   }
// `;

// const ImageCarousel = ({ images, onClose }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     customPaging: (i) => <div />,
//   };

//   return (
//     <FullScreenCarouselContainer>
//       <CloseButton onClick={onClose}>
//         <FaTimes />
//       </CloseButton>
//       <CarouselWrapper>
//         <StyledSlider {...settings}>
//           {images.map((image, index) => (
//             <div key={index}>
//               <ImageWrapper>
//                 <CarouselImage
//                   src={image.src}
//                   alt={image.alt || `Image ${index + 1}`}
//                 />
//               </ImageWrapper>
//             </div>
//           ))}
//         </StyledSlider>
//       </CarouselWrapper>
//     </FullScreenCarouselContainer>
//   );
// };

// export default ImageCarousel;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaTimes } from "react-icons/fa";

const ImageCarousel = ({ images, onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => <div />,
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: "rgb(131 129 129 / 50%)",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          color: "white",
          zIndex: 10000,
        }}
      >
        <FaTimes />
      </button>
      <div
        style={{
          width: "90%",
          position: "relative",
        }}
      >
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <div
                style={{
                  textAlign: "center",
                  height: "90vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt || `Image ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "90vh",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;
