import React from "react";
import { IconButton, Menu, MenuItem, ListItemText } from "@mui/material";

const DropDrown = ({ icon, onSelect, name, options, value = "" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (selectedValue) => {
    handleClose();
    onSelect(name, selectedValue);
  };

  const isSelected = (optionValue) => {

    // Special handling for boolean false
    if (value === false && optionValue === false) {
      return true;
    }
    return optionValue === value || optionValue?.toString() === value?.toString();
  };

  return (
    <div style={{ position: "relative" }}>
      <IconButton onClick={handleClick}>{icon}</IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options?.map((option, optionIndex) => (
          <MenuItem
            key={optionIndex}
            onClick={() => handleSelect(option.value)}
            selected={isSelected(option.value)} // Mark item as selected
          >
            <ListItemText
              primary={option.label}
              style={{
                fontWeight: isSelected(option.value) ? "bold" : "normal",
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropDrown;
