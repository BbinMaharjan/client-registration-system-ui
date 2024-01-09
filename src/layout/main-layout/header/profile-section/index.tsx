/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Today } from "../../../../utils/globalUtils";
// material-ui
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third-party

// project imports
import MainCard from "../../../../components/cards/mainCard";
import Transitions from "../../../../components/extended/transitions";

import User1 from "../../../../assets/images/users/user-round.svg";
import * as storage from "../../../../utils/storage";
// assets
import { IconLogout } from "@tabler/icons";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme: any = useTheme();
  const customization = useSelector((state: any) => state.customization);
  const navigate = useNavigate();
  const userDetails = storage.get("user");

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef: any = useRef(null);
  const handleLogout = async () => {
    storage.clear();
    window.location.replace("/auth/login");
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event: any, index: number, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Stack direction="column" alignItems="start">
        <Typography
          component="span"
          variant="h4"
          sx={{ fontWeight: 600, fontSize: "1rem" }}
          color={theme.palette.primary.main}
          marginRight={"8px"}
        >
          {userDetails?.fullName}
        </Typography>
        <Typography
          component="span"
          variant="body1"
          sx={{ fontWeight: 100 }}
          color={theme.palette.secondary.main}
          marginRight={"8px"}
        >
          {userDetails?.email}
        </Typography>
      </Stack>
      <Avatar
        sx={{
          bgcolor: theme.palette.primary.main,
          cursor: "pointer",
          color: "#fff",
          borderRadius: "25px",
        }}
        variant="rounded"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Typography variant="h5" color="white">
          {userDetails?.fullName?.charAt(0)}
        </Typography>
      </Avatar>

      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 1 }}>
                    <List
                      component="nav"
                      sx={{
                        width: "100%",
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",
                        [theme.breakpoints.down("md")]: {
                          minWidth: "100%",
                        },
                        "& .MuiListItemButton-root": {
                          mt: 0.5,
                        },
                      }}
                    >
                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}
                        selected={selectedIndex === 4}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">EXIT</Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
