// import React, { useState } from "react";
// import styled from "styled-components";
// import { FaEye } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { IconButton, Skeleton } from "@mui/material";
// import { useTheme } from "@mui/material";

// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;
// `;

// const StyledImage = styled.img`
//   cursor: pointer;
// `;

// const FullScreenContainer = styled.div`
//   display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.8);
//   justify-content: center;
//   align-items: center;
//   z-index: 9999;
// `;

// const FullScreenImage = styled.img`
//   max-width: 90%;
//   max-height: 90%;
//   border-radius: 10px;
// `;

// const IconWrapper = styled.div`
//   position: absolute;
//   height: -webkit-fill-available;
//   width: 100%;
//   top: 0px;
//   display: flex;
//   gap: 10px;
//   justify-content: end;
//   align-items: start;
// `;

// const ImageWithPreview = ({
//   src,
//   alt,
//   height = "auto",
//   width = "auto",
//   radius = "10px",
//   isDeletable = false,
//   deletePath = "",
//   deleteImage = (path) => { },
// }) => {
//   const theme = useTheme();
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const toggleFullScreen = () => {
//     setIsFullScreen(!isFullScreen);
//   };

//   return (


//     <div>
//       {src ?
//         <div>
//           <ImageContainer>

//             <StyledImage
//               style={{
//                 borderRadius: radius,
//               }}
//               src={src}
//               alt={alt}
//               onClick={toggleFullScreen}
//               height={height}
//               width={width}
//             />

//             <IconWrapper>
//               <IconButton
//                 size="small"
//                 onClick={toggleFullScreen}
//                 style={{ color: theme.palette.warning.main }}
//               >
//                 <FaEye />
//               </IconButton>
//               {isDeletable ?
//                 <IconButton
//                   size="small"
//                   className="delete"
//                   onClick={() => deleteImage(deletePath)}
//                   style={{ color: theme.palette.error.main }}
//                 >
//                   <MdDelete />
//                 </IconButton>
//                 : ""}
//             </IconWrapper>
//           </ImageContainer>
//           <FullScreenContainer isVisible={isFullScreen} onClick={toggleFullScreen}>
//             <FullScreenImage src={src} alt={alt} />
//           </FullScreenContainer>
//         </div> : <Skeleton animation="wave" variant="rounded" style={{ height, width, marginBottom: '0.4rem' }} />}
//     </div>


//   );
// };

// export default ImageWithPreview;

import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IconButton, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material";

const ImageWithPreview = ({
  src,
  alt,
  height = "auto",
  width = "auto",
  radius = "10px",
  isDeletable = false,
  deletePath = "",
  deleteImage = (path) => { },
}) => {
  const theme = useTheme();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div>
      {src ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            style={{
              cursor: "pointer",
              borderRadius: radius,
            }}
            src={src}
            alt={alt}
            onClick={toggleFullScreen}
            height={height}
            width={width}
          />
          <div
            style={{
              position: "absolute",
              height: "-webkit-fill-available",
              width: "100%",
              top: "0px",
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              alignItems: "start",
            }}
          >
            <IconButton
              size="small"
              onClick={toggleFullScreen}
              style={{ color: theme.palette.warning.main }}
            >
              <FaEye />
            </IconButton>
            {isDeletable && (
              <IconButton
                size="small"
                className="delete"
                onClick={() => deleteImage(deletePath)}
                style={{ color: theme.palette.error.main }}
              >
                <MdDelete />
              </IconButton>
            )}
          </div>
          <div
            style={{
              display: isFullScreen ? "flex" : "none",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.8)",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
            onClick={toggleFullScreen}
          >
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      ) : (
        <Skeleton
          animation="wave"
          variant="rounded"
          style={{ height, width, marginBottom: "0.4rem" }}
        />
      )}
    </div>
  );
};

export default ImageWithPreview;
