import React from "react";
import Modal from "@mui/material/Modal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none !important",
  background: "white !important",
  borderColor: "transparent !important",
};

const cardItemStyle = {
  padding: "1.5rem",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  maxHeight: "500px",
  overflow: "auto",
};

export default function BasicModal({ child, open, setOpen, width = "600px" }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      style={{ outline: "none !important", border: "none !important" }}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ ...modalStyle, width }}>
        <div style={cardItemStyle}>
          {child}
        </div>
      </div>
    </Modal>
  );
}
