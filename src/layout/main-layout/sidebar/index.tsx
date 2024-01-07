/* eslint-disable @typescript-eslint/no-explicit-any */
import PropTypes from "prop-types";

// material-ui
import {
  Box,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third-party
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { BrowserView, MobileView } from "react-device-detect";
import PerfectScrollbar from "react-perfect-scrollbar";
// project imports
import { useSelector } from "react-redux";
import { drawerWidth } from "../../../store/constant";
import * as storage from "../../../utils/storage";
import LogoSection from "../logo-section";
import MenuList from "./menu-list";
// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle }: any) => {
  const theme: any = useTheme();
  const customization = useSelector((state: any) => state.customization);
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const handleLogout = () => {
    storage.clear();
    window.location.replace(`/auth/login`);
  };
  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <MenuList />
          <ListItemButton
            sx={{
              borderRadius: `${customization.borderRadius}px`,
              mb: 0.5,
              alignItems: "flex-start",
              backgroundColor: "inherit",
            }}
            onClick={handleLogout}
          >
            <ListItemIcon sx={{ my: "auto", minWidth: 18 }}>
              <CancelPresentationIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" color="inherit">
                  Exit
                </Typography>
              }
              sx={{
                fontSize: "1.2rem",
                fontWeight: "medium",
                letterSpacing: 0,
                marginLeft: "2rem",
              }}
            />
          </ListItemButton>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "88px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
