import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PaymentsIcon from "@mui/icons-material/Payments";
import FlagIcon from "@mui/icons-material/Flag";
import styled from "@emotion/styled";
import { Link as Lnk, Outlet } from "react-router-dom";

const StyledListItem = styled(ListItem)({
  "&:hover": {
    background: "#c2c2c2",
  },
});

function Aside() {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: "220px",
          display: { xs: "none", sm: "block" },
          [`& .MuiDrawer-paper`]: {
            width: "220px",
            boxSizing: "border-box",
            backgroundColor: "rgba(230,230,230,0.4)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <StyledListItem disablePadding>
              <ListItemButton
                component={Lnk}
                to=""
                sx={{ textDecoration: "none" }}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" color="textPrimary" />
              </ListItemButton>
            </StyledListItem>
            <StyledListItem disablePadding>
              <ListItemButton
                component={Lnk}
                to="transactions"
                sx={{ textDecoration: "none" }}
              >
                <ListItemIcon>
                  <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary="Transactions" color="textPrimary" />
              </ListItemButton>
            </StyledListItem>
            <StyledListItem disablePadding>
              <ListItemButton
                component={Lnk}
                to="goals"
                sx={{ textDecoration: "none" }}
              >
                <ListItemIcon>
                  <FlagIcon />
                </ListItemIcon>
                <ListItemText primary="Goals" />
              </ListItemButton>
            </StyledListItem>
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </>
  );
}

export default Aside;
