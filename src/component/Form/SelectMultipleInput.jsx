import { IconButton, Select, MenuItem, FormControl, Chip, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import InputError from "../Basic/InputError";

function SelectMultipleInput({
  seperatedLabel = true,
  startEdit = false,
  sepratedUpdate = false,
  error = null,
  prefix = [],
  suffix,
  name,
  handleChange = (name, value) => console.log(name, value),
  options = [],
  defaultValue = [],
  ...otherProps
}) {
  const [edit, setEdit] = useState(startEdit);
  const [value, setValue] = useState([]);
  const theme = useTheme();

  const snakeToTitleCase = (snakeCaseStr) => {
    const words = snakeCaseStr.split("_");
    const titleCaseStr = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return titleCaseStr;
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  };

  return (
    <div>
      <div
        style={{
          display: seperatedLabel ? "block" : "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <div
            style={{
              padding: "0.5rem 0px",
              color: theme.palette.common.black,
              borderRadius: "5px",
              border: "none",
              width: "max-content",
            }}
          >
            {snakeToTitleCase(name)}
          </div>
          {!edit ? (
            <div
              style={{
                display: "inline-flex",
                marginRight: "0.3rem",
                color: theme.palette.common.black,
              }}
            >
              <IconButton
                style={{ backgroundColor: "transparent" }}
                size="small"
                onClick={() => setEdit(true)}
              >
                <RiEdit2Fill color={theme.palette.common.black} />
              </IconButton>
            </div>
          ) : null}
          {edit && sepratedUpdate && value.length > 0 ? (
            <div
              style={{
                display: "inline-flex",
                marginRight: "0.3rem",
                color: theme.palette.common.black,
              }}
            >
              <IconButton
                style={{ backgroundColor: "transparent" }}
                size="small"
                onClick={() => {
                  setValue([]);
                  if (!sepratedUpdate) {
                    handleChange(name, []);
                  }
                  setEdit(false);
                }}
              >
                <IoCloseCircleSharp color={theme.palette.common.black} />
              </IconButton>
            </div>
          ) : null}
          {edit && sepratedUpdate && value.length > 0 ? (
            <div
              style={{
                display: "inline-flex",
                marginRight: "0.3rem",
                color: theme.palette.common.black,
              }}
            >
              <IconButton
                style={{ backgroundColor: "transparent" }}
                size="small"
                onClick={() => {
                  handleChange(name, value);
                  setEdit(false);
                }}
              >
                <IoMdCheckmark color={theme.palette.common.black} />
              </IconButton>
            </div>
          ) : null}
        </div>
        <FormControl
          fullWidth
          variant="outlined"
          style={{
            backgroundColor: 'white',
            borderRadius: "5px",
          }}
        >
          <Select
            multiple
            value={value}
            disabled={!edit}
            onChange={(e) => {
              setValue(e.target.value);
              if (!sepratedUpdate) {
                handleChange(name, e.target.value);
              }
            }}
            displayEmpty
            startAdornment={prefix}
            MenuProps={MenuProps}
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      options.find((option) => option.value === value)?.label ||
                      value
                    }
                  />
                ))}
              </div>
            )}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
              color: theme.palette.common.black,
              borderColor: theme.palette.text.primary,
            }}
            {...otherProps}
          >
            <MenuItem value="" disabled>
              {"Select " + snakeToTitleCase(name)}
            </MenuItem>
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {error ? (
        <div style={{ textAlign: "center" }}>
          <InputError message={error} />
        </div>
      ) : null}
    </div>
  );
}

export default SelectMultipleInput;
