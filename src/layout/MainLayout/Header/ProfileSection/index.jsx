import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Fade,
  ClickAwayListener,
  Paper,
  Popper,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import { clearLocalStorage } from "../../../../helpers";
import { useNavigate } from "react-router-dom";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { AppConfig } from "../../../../config/AppConfig";

// ==============================|| PROFILE SECTION ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  let user = localStorage.getItem(AppConfig.localStorageKeys.user);
  if (user) {
    user = JSON.parse(user);
  }

  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const logOut = () => {
    clearLocalStorage();
    navigate(AxiosInstancePaths.login_path);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
          {
            name: "preventOverflow",
            options: {
              altAxis: true,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 350,
                    minWidth: 250,
                    backgroundColor: theme.palette.background.paper,
                    pb: 0,
                    borderRadius: "10px",
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      onClick={(event) => {
                        // handleListItemClick(event, 0)
                        handleToggle();
                        navigate(`/profile/view/${user?._id}`);
                      }}
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <MeetingRoomTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Logout"
                      onClick={(event) => {
                        // handleListItemClick(event, 1)
                        logOut();
                      }}
                    />
                  </ListItemButton>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
