import PropTypes from "prop-types";
import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import { useMediaQuery, Divider, Drawer, Grid, Box } from "@mui/material";

import MenuList from "./MenuList";
import { drawerWidth } from "../../../config/config.js";
// import NavCard from './MenuList/NavCard.jsx';

import logo from "../../../assets/images/1.png";
import { useNavigate } from "react-router-dom";

const Nav = styled((props) => <nav {...props} />)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

// ==============================|| SIDEBAR ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const drawer = (
    <>
      <Box
        sx={{
          display: { md: "none", xs: "block" },
          padding: "0px",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          elevation={5}
          alignItems="center"
          spacing={0}
          sx={{
            ...theme.mixins.toolbar,
            lineHeight: 0,
            background: theme.palette.primary.main,
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Grid item>
            <img
              src={logo}
              alt="Logo"
              width="180"
              height="50"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        sx={{
          paddingBottom: { md: "64px", xs: "0px" },
          overflow: "auto",
        }}
      >
        <MenuList onMenuItemClick={drawerToggle} />
        {/* <NavCard /> */}
      </Box>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Nav>
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: "none",
            boxShadow: "0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)",
            top: { md: 64, sm: 0 },
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </Nav>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
