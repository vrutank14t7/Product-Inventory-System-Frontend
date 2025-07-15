import { IconButton, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import InputError from "../Basic/InputError";

function TextInputNoLabel({
  startEdit = false,
  seperatedLabel = false,
  sepratedUpdate = false,
  prefix = [],
  suffix,
  type = "text",
  name,
  error = null,
  defaultValue = "",
  isDate = false,
  handleChange = (name, value) => console.log(name, value),
  ...otherProps
}) {
  const [edit, setEdit] = useState(startEdit);
  const [value, setValue] = useState("");
  const theme = useTheme();


  const snakeToTitleCase = (snakeCaseStr) => {
    const words = snakeCaseStr.split("_");
    const titleCaseStr = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return titleCaseStr;
  };

  const onChange = (e) => {
    setValue(e.target.value);
    if (!sepratedUpdate) {
      handleChange(name, e.target.value);
    }
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div>
      <div>
        <TextField
          fullWidth
          disabled={!edit}
          {...otherProps}
          autoComplete="off"
          value={value}
          placeholder={snakeToTitleCase(name)}
          type={type}
          onChange={onChange}
          margin="normal"
          style={{
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: "5px",
          }}
          InputProps={{
            startAdornment: [...prefix],
            endAdornment: (
              <>
                {!edit && (
                  <div
                    style={{
                      display: "inline-flex",
                      marginRight: "0.3rem",
                      color: theme.palette.common.black,
                    }}
                  >
                    <IconButton size="small" onClick={() => setEdit(true)}>
                      <RiEdit2Fill color={theme.palette.text.primary} />
                    </IconButton>
                  </div>
                )}
                {edit && sepratedUpdate && value && (
                  <>
                    <div
                      style={{
                        display: "inline-flex",
                        marginRight: "0.3rem",
                        color: theme.palette.common.black,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          setValue(snakeToTitleCase(name));
                          if (!sepratedUpdate) {
                            handleChange(name, null);
                          }
                          setEdit(false);
                        }}
                      >
                        <IoCloseCircleSharp color={theme.palette.text.primary} />
                      </IconButton>
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        marginRight: "0.3rem",
                        color: theme.palette.common.black,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          handleChange(name, value);
                          setEdit(false);
                        }}
                      >
                        <IoMdCheckmark color={theme.palette.text.primary} />
                      </IconButton>
                    </div>
                  </>
                )}
              </>
            ),
            style: {
              padding: "0.5rem",
              color: theme.palette.text.primary,
            },
          }}
          InputLabelProps={{
            style: { color: theme.palette.text.primary },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderColor: edit ? theme.palette.text.primary : undefined,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
      </div>
      {error && (
        <div style={{ textAlign: "center" }}>
          <InputError message={error} />
        </div>
      )}
    </div>
  );
}

export default TextInputNoLabel;
