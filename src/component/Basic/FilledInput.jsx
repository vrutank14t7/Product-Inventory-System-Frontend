// import React from "react";
// import styled from "styled-components";

// const InputBox = styled.div`
//   padding: 0.5rem 1rem;
//   background-color: #f4f6f8;
//   border-radius: 5px;
//   border: none;
// `;
// const InputLabel = styled.div`
//   padding: 0.5rem 0px;
//   color: #083344;
//   border-radius: 5px;
//   border: none;
// `;

// const snakeToTitleCase = (snakeCaseStr) => {
//   const words = snakeCaseStr.split("_");
//   const titleCaseStr = words
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");

//   return titleCaseStr;
// };

// function FilledInput({ label, value, ...otherProps }) {
//   return (
//     <div {...otherProps}>
//       <InputLabel>{snakeToTitleCase(label)}</InputLabel>
//       <InputBox>{value ? value : "Not Set"}</InputBox>
//     </div>
//   );
// }

// export default FilledInput;

import React from "react";

const snakeToTitleCase = (snakeCaseStr) => {
  const words = snakeCaseStr.split("_");
  const titleCaseStr = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return titleCaseStr;
};

function FilledInput({ label, value, ...otherProps }) {
  return (
    <div {...otherProps}>
      <div
        style={{
          padding: "0.5rem 0px",
          color: "#083344",
          borderRadius: "5px",
          border: "none",
        }}
      >
        {snakeToTitleCase(label)}
      </div>
      <div
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#f4f6f8",
          borderRadius: "5px",
          border: "none",
        }}
      >
        {value ? value : "Not Set"}
      </div>
    </div>
  );
}

export default FilledInput;

