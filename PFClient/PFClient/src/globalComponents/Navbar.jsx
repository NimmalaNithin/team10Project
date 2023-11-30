import styled from "@emotion/styled";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link as Lnk } from "react-router-dom";

const ModifiedAppBar = styled(AppBar)({
  width: "100%",
  backgroundColor: "#1363bf",
  position: "sticky",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstLetter, setFirstLetter] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const getFirstLetterOfUserName = async () => {
      const userid = localStorage.getItem("userid");
      const response = await axios.get(
        `http://127.0.0.1:3000/api/users/userfirstname/${userid}`
      );
      setFirstLetter(response.data[0]["first_name"][0].toUpperCase());
    };
    getFirstLetterOfUserName();
  }, []);

  return (
    <ModifiedAppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <StyledToolbar>
        <Typography variant="h5">Personal Finance</Typography>
        <Avatar
          sx={{ bgcolor: "#EA738D", display: { xs: "none", sm: "flex" } }}
          onClick={handleClick}
        >
          {firstLetter} {/* apicall */}
        </Avatar>
        <MenuIcon
          sx={{ color: "#ffffff", display: { xs: "flex", sm: "none" } }}
          onClick={handleClick}
        />

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 0,
              "& .MuiAvatar-root": {
                width: 32,
                height: 24,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            component={Lnk}
            to="/"
            onClick={handleClose}
            sx={{
              px: { xs: 3, sm: 6 },
              py: { xs: 0, sm: 1 },
              textDecoration: "none",
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </ModifiedAppBar>
  );
}

export default Navbar;
