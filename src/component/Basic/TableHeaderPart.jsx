import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, InputBase } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

function TableHeaderPart({
  searchText = "Search",
  title = "Table",
  addText,
  handleSearch = (value) => {},
  handleAdd = () => {},
  isClear = false,
  onClear = () => {},
  extraFilterComponent = null,
}) {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        gap: {
          xs: "1rem",
          sx: "1rem",
          md: "0px",
          lg: "0px",
        },
      }}
    >
      <Grid
        item
        xs={12}
        md={3}
        lg={3}
        sm={12}
        sx={{
          padding: "0px !important",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: theme.palette.common.black, margin: "0px" }}>
          {title}
        </h2>
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        lg={9}
        sm={12}
        sx={{ padding: "0px !important" }}
      >
        <div style={{ display: "flex", gap: "1rem", justifyContent: "end" }}>
          {extraFilterComponent}
          <Box
            sx={{
              position: "relative",
              padding: addText ? "0px" : "0.5rem",
              background: "white",
              borderRadius: "5px",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                p: { sm: theme.spacing(0.75, 1.25), xs: theme.spacing(1.25) },
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.common.black,
                height: "100%",
              }}
            >
              <SearchTwoToneIcon />
            </Box>
            <InputBase
              placeholder={searchText}
              sx={{
                marginLeft: "2.3rem",
                "& .MuiInputBase-root": {
                  color: theme.palette.common.black,
                  mr: 3,
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiInputBase-input": {
                  p: theme.spacing(1, 1, 1, 0),
                  pl: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create("width"),
                  color: theme.palette.common.black,
                  width: { sm: "100%", md: 45 },
                  mr: { md: 3 },
                  "&:focus": {
                    width: { md: 225 },
                  },
                },
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Box>
          {addText ? (
            <div>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAdd}
                style={{
                  backgroundColor: theme.palette.success.main,
                  textTransform: "capitalize",
                  color: theme.palette.common.white,
                  ":hover": { backgroundColor: theme.palette.success.dark },
                }}
              >
                {addText}
              </Button>
            </div>
          ) : (
            ""
          )}
          {isClear ? (
            <div>
              <Button
                fullWidth
                variant="contained"
                onClick={onClear}
                style={{
                  backgroundColor: theme.palette.warning.main,
                  textTransform: "capitalize",
                  color: theme.palette.common.white,
                  ":hover": { backgroundColor: theme.palette.warning.dark },
                }}
              >
                Clear Filter
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default TableHeaderPart;
