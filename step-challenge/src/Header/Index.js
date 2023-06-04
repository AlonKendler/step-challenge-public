import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Avatar, Button } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import MenuButton from "./MenuButton";
import messages from "../shared-components/messages";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 66,
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  toolBar: {
    justifyContent: "space-between",
  },
  appBar: {
    backgroundColor: "#D82742",
  },
}));

const Header = () => {
  const classes = useStyles();

  const auth = firebase.auth();
  //loading, error props of Auth not used
  const [user] = useAuthState(auth);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <MenuButton />
          {user && <Avatar src={user.photoURL} />}
          {!user && (
            <Button color="inherit" onClick={signInWithGoogle}>
              {messages.signIn}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
