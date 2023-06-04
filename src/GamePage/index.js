import { Button, makeStyles, Typography } from "@material-ui/core";
import firebase from "firebase/app";
import React, { useState } from "react";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { HOME_PATH } from "../shared-components/constants";
import QrContainer from "../shared-components/QrContainer";
import messages from "../shared-components/messages";
import {
  getUsersFloors,
  updateDocument,
} from "../shared-components/FirestoreFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    minHeight: "80vh",
  },
  text: {
    margin: theme.spacing(2),
    background: "#3d3b3b80",
    borderRadius: "25px",
    padding: "10px",
    color: "#ffffff",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const GamePage = () => {
  const classes = useStyles();
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  const [toggle, setToggle] = useState(false);
  const [userFloors, setUSerFloors] = useState();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const handleSubmit = (floor, location, validate, history, path) => {
    if (validate && user) {
      let start = JSON.parse(window.localStorage.getItem("start"));
      let floorsClimbed = parseInt(floor) - parseInt(start.floor);
      if (floorsClimbed < 0) {
        floorsClimbed = 0;
        alert(messages.alert);
        console.log("User cimbed downStairs, floorsClimbed: ", floorsClimbed);
      }
      const increment = firebase.firestore.FieldValue.increment(floorsClimbed);

      const UserData = {
        userId: user.uid,
        photo: user.photoURL,
        name: user.displayName,
        floorAmount: floorsClimbed,
        location: location,
      };

      updateDocument(user.uid, UserData, increment);
      history.push(path);
    } else {
      !validate && console.log("there is no matching floor");
      !user && console.log("user not sign in");
    }
  };

  return (
    <React.Fragment>
      {!toggle && (
        <Typography variant="h5" className={classes.text}>
          {messages.motivation}
        </Typography>
      )}
      {user ? (
        <React.Fragment>
          <Typography className={classes.text}>
            {messages.userMonthySteps}
            {getUsersFloors(user.uid, setUSerFloors)}
            {userFloors}
            {messages.floors}
          </Typography>
          {!toggle && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => setToggle(!toggle)}
            >
              {messages.clickToOpen}
            </Button>
          )}
          {toggle && (
            <QrContainer path={HOME_PATH} handleSubmit={handleSubmit} />
          )}
        </React.Fragment>
      ) : (
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={signInWithGoogle}
          >
            {messages.signOutOnGame}
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default GamePage;
