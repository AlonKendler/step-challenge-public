import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { CLIMBING_PATH } from "../shared-components/constants";
import QrContainer from "../shared-components/QrContainer";
import messages from "../shared-components/messages";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    minHeight: "80vh",
  },
  textCard: {
    margin: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
    background: "#3d3b3b80",
    borderRadius: "25px",
    padding: "10px",
    color: "#ffffff",
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  const handleSubmit = (floor, location, validate, history, path) => {
    if (validate && user) {
      const data = {
        userId: user.uid,
        floor: floor,
        location: location,
      };
      window.localStorage.setItem("start", JSON.stringify(data));
      history.push(path);
    } else {
      !validate && console.log("there is no matching floor");
    }
  };

  return (
    <React.Fragment>
      {user ? (
        <React.Fragment>
          <QrContainer path={CLIMBING_PATH} handleSubmit={handleSubmit} />
        </React.Fragment>
      ) : (
        <Typography variant="h5" className={classes.text}>
          {messages.instructions}
        </Typography>
      )}
    </React.Fragment>
  );
};

export default MainPage;
