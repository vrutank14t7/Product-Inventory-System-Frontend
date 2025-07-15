// import React, { useState, useRef } from "react";
// import styled from "styled-components";

// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;
//   width: 200px;
//   height: 200px;
//   overflow: hidden;
// `;

// const MainImage = styled.img`
//   width: 100%;
//   height: auto;
//   display: block;
// `;

// const ZoomLens = styled.div`
//   position: absolute;
//   border: 1px solid #000;
//   width: 50px;
//   height: 50px;
//   background-color: rgba(255, 255, 255, 0.4);
//   display: ${({ isHovered }) => (isHovered ? "block" : "none")};
// `;

// const PreviewContainer = styled.div`
//   position: absolute;
//   left: 220px; /* Adjust based on your layout */
//   top: 0;
//   width: 300px;
//   height: 300px;
//   overflow: hidden;
//   z-index: 10;
//   border: 1px solid #ccc;
//   display: ${({ isHovered }) => (isHovered ? "block" : "none")};
//   background: #fff;
// `;

// const PreviewImage = styled.img`
//   position: absolute;
//   width: 600px; /* Adjust zoom level as needed */
//   height: auto;
// `;

// const ImageHoverPreview = ({ imageUrl }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [lensPosition, setLensPosition] = useState({ top: 0, left: 0 });
//   const [zoomPosition, setZoomPosition] = useState({ top: 0, left: 0 });
//   const previewRef = useRef(null);

//   const handleMouseMove = (e) => {
//     const container = e.currentTarget;
//     const rect = container.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const lensSize = 50;
//     const zoomFactor = 3;

//     let lensX = x - lensSize / 2;
//     let lensY = y - lensSize / 2;

//     // Ensure lens stays within the bounds
//     if (lensX < 0) lensX = 0;
//     if (lensY < 0) lensY = 0;
//     if (lensX > rect.width - lensSize) lensX = rect.width - lensSize;
//     if (lensY > rect.height - lensSize) lensY = rect.height - lensSize;

//     const zoomX = -lensX * zoomFactor;
//     const zoomY = -lensY * zoomFactor;

//     setLensPosition({ top: lensY, left: lensX });
//     setZoomPosition({ top: zoomY, left: zoomX });
//   };

//   return (
//     <ImageContainer
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onMouseMove={handleMouseMove}
//     >
//       <MainImage src={imageUrl} alt="Product" />
//       <ZoomLens
//         isHovered={isHovered}
//         style={{ top: lensPosition.top, left: lensPosition.left }}
//       />
//       <PreviewContainer isHovered={isHovered}>
//         <PreviewImage
//           ref={previewRef}
//           src={imageUrl}
//           alt="Zoomed Preview"
//           style={{
//             transform: `translate(${zoomPosition.left}px, ${zoomPosition.top}px)`,
//           }}
//         />
//       </PreviewContainer>
//     </ImageContainer>
//   );
// };

// export default ImageHoverPreview;

import React, { useState, useRef } from "react";

const ImageHoverPreview = ({ imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [lensPosition, setLensPosition] = useState({ top: 0, left: 0 });
  const [zoomPosition, setZoomPosition] = useState({ top: 0, left: 0 });
  const previewRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lensSize = 50;
    const zoomFactor = 3;

    let lensX = x - lensSize / 2;
    let lensY = y - lensSize / 2;

    // Ensure lens stays within the bounds
    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > rect.width - lensSize) lensX = rect.width - lensSize;
    if (lensY > rect.height - lensSize) lensY = rect.height - lensSize;

    const zoomX = -lensX * zoomFactor;
    const zoomY = -lensY * zoomFactor;

    setLensPosition({ top: lensY, left: lensX });
    setZoomPosition({ top: zoomY, left: zoomX });
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "200px",
        height: "200px",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={imageUrl}
        alt="Product"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          border: "1px solid #000",
          width: "50px",
          height: "50px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          display: isHovered ? "block" : "none",
          top: lensPosition.top,
          left: lensPosition.left,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "220px",
          top: 0,
          width: "300px",
          height: "300px",
          overflow: "hidden",
          zIndex: 10,
          border: "1px solid #ccc",
          display: isHovered ? "block" : "none",
          background: "#fff",
        }}
      >
        <img
          ref={previewRef}
          src={imageUrl}
          alt="Zoomed Preview"
          style={{
            position: "absolute",
            width: "600px", // Adjust zoom level as needed
            height: "auto",
            transform: `translate(${zoomPosition.left}px, ${zoomPosition.top}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default ImageHoverPreview;
