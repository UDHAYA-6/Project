import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../store/reducer";
export default function ButtonAppBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const LogoutHandler = () => {
    dispatch(logout());
    router.push("/admin");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "purple" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Newton Travels
          </Typography>
          <Button variant="outlined" color="inherit" onClick={LogoutHandler}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
