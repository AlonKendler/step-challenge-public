import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  leaderBoardQuery,
  options,
} from "../shared-components/FirestoreFunctions";
import messages from "../shared-components/messages";
import LoadingBoard from "./LoadingBoard";
import { useHistory } from "react-router-dom";
import { START_PATH } from "../shared-components/constants";
import SortTabs from "./SortTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    minHeight: "80vh",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const LeaderboardPage = () => {
  const classes = useStyles();
  const auth = firebase.auth();
  const history = useHistory();
  const [user] = useAuthState(auth);

  const [location, setLocation] = useState("");

  let [value, loading, error] = useCollection(leaderBoardQuery, options);
  const [data, setData] = useState([]);

  useEffect(() => {
    value && setData(value.docs.map((doc) => doc.data()));
  }, [value]);

  useEffect(() => {
    if (value) {
      // console.log("location:", location);
      if (location === "") {
        setData(value.docs);
      } else {
        let newArr = value.docs.filter(
          (val) => val.data().location === location
        );
        // console.log("newArr =>", newArr);
        setData(newArr);
        // console.log("data:", data);
      }
    }
  }, [value, location]);

  const handleChange = async (event) => {
    setLocation(event.target.value);
  };

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div>
      <br />
      {user ? (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => history.push(START_PATH)}
        >
          {messages.clickMeToStart}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={signInWithGoogle}
        >
          {messages.signInToStart}
        </Button>
      )}
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {<SortTabs location={location} handleChange={handleChange} />}
      {loading && <LoadingBoard />}
      {data && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Brainer</TableCell>
                <TableCell>Location</TableCell>
                <TableCell> Floors</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow size="small" key={row.id}>
                    <TableCell align="left">
                      {<Avatar src={row.data().photo} />}
                    </TableCell>
                    <TableCell>{row.data().name}</TableCell>
                    <TableCell>{row.data().location}</TableCell>
                    <TableCell>{row.data().floorAmount}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default LeaderboardPage;
