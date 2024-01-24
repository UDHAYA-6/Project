import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import DirectionsBusSharpIcon from "@mui/icons-material/DirectionsBusSharp";
import SearchIcon from "@mui/icons-material/Search";
import { getSession, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import classes from "./nav.module.css";
import { useRouter } from "next/router";
import BasicMenu from "./profile";
export default function ButtonAppBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentSession, setCurrentSession] = React.useState(session);

  React.useEffect(() => {
    const checkSession = async () => {
      const newSession = await getSession();
      if (JSON.stringify(newSession) !== JSON.stringify(currentSession)) {
        setCurrentSession(newSession);
      }
    };

    checkSession();
  }, [session]);

  let initials = "AV";
  if (session) {
    const fullName = session.session.user.name;
    initials = fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const LoginClick = () => {
    router.push("/login");
  };
  const BookingHistory = (event) => {
    event.preventDefault();
    router.push("/History");
  };
  const BookTickets = (event) => {
    event.preventDefault();
    router.push("/");
  };

  const TermsAndCondition = (event) => {
    event.preventDefault();
    router.push("/Terms");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#141528" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" style={{ fontFamily: "Diphylleia" }}>
            <DirectionsBusSharpIcon /> NewTon Travels
          </Typography>
          <Typography
            style={{ fontFamily: "Josefin Sans" }}
            onClick={BookTickets}
            className={classes.Navcontent}
          >
            Book Tickets
          </Typography>
          <Typography
            style={{ fontFamily: "Josefin Sans" }}
            onClick={BookingHistory}
            className={classes.Navcontent}
          >
            Booking Histroy
          </Typography>
          <Typography
            style={{ fontFamily: "Josefin Sans" }}
            className={classes.Navcontent}
            onClick={TermsAndCondition}
          >
            Terms and Condition
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {session ? (
            <BasicMenu init={initials} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ fontFamily: "Josefin Sans" }}
              onClick={LoginClick}
            >
              LogIn
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
