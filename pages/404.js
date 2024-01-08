import NavBar from "@/components/Genral NavBar/nav";
import classes from "../styles/error.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import CottageIcon from "@mui/icons-material/Cottage";
const Error = () => {
  const router = useRouter();
  const GoHome = () => {
    router.push("/");
  };
  return (
    <>
      <NavBar />
      <div className={classes.div}>
        <div>
          <p>404</p>
        </div>
        <div>
          <center>
            <p>The page not found error</p>
            <Button onClick={GoHome} variant="contained">
              <CottageIcon /> <span>Home</span>
            </Button>
          </center>
        </div>
      </div>
    </>
  );
};
export default Error;
