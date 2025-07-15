import { IconButton, Switch, FormControlLabel, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import InputError from "../Basic/InputError";

function SwitchInput({
  startEdit = false,
  sepratedUpdate = false,
  prefix = [],
  suffix,
  name,
  error = null,
  isDisabel = false,
  handleChange = (name, value) => console.log(name, value),
  defaultValue = false,
}) {
  const [edit, setEdit] = useState(startEdit);
  const [checked, setChecked] = useState(false);
  const theme = useTheme();

  const snakeToTitleCase = (snakeCaseStr) => {
    const words = snakeCaseStr.split("_");
    const titleCaseStr = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return titleCaseStr;
  };

  useEffect(() => {
    setChecked(defaultValue);
    // eslint-disable-next-line
  }, [defaultValue]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <div
            style={{
              padding: "0.5rem 0px",
              color: theme.palette.common.black,
              borderRadius: "5px",
              border: "none",
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
          {edit && sepratedUpdate ? (
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
                  setChecked(false);
                  if (!sepratedUpdate) {
                    handleChange(name, "");
                  }
                  setEdit(false);
                }}
              >
                <IoCloseCircleSharp color={theme.palette.common.black} />
              </IconButton>
            </div>
          ) : null}
          {edit && sepratedUpdate ? (
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
                  handleChange(name, checked);
                  setEdit(false);
                }}
                style={{ backgroundColor: "transparent" }}
              >
                <IoMdCheckmark color={theme.palette.common.black} />
              </IconButton>
            </div>
          ) : null}
        </div>
        <FormControlLabel
          style={{ margin: "0px" }}
          control={
            <Switch
              checked={checked}
              disabled={isDisabel}
              onChange={(e) => {
                setChecked(e.target.checked);
                if (!sepratedUpdate) {
                  handleChange(name, e.target.checked);
                }
              }}
              style={{
                color: checked ? theme.palette.secondary : undefined,
              }}
            />
          }
        />
      </div>
      {error ? (
        <div style={{ textAlign: "center" }}>
          <InputError message={error} />
        </div>
      ) : null}
    </div>
  );
}

export default SwitchInput;
