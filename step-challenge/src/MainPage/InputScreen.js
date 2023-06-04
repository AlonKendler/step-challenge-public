import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import "firebase/firestore";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    minHeight: "25vh",
  },

  button: {
    minWidth: "33vh",
    margin: 4,
  },
}));

const InputScreen = ({
  user,
  buttonMessage,
  path,
  handleSubmit,
  signAlert,
}) => {
  const classes = useStyles();
  const [floor, setFloor] = useState("");
  const [validate, setValidate] = useState();
  let history = useHistory();

  const handleChange = (e) => {
    //update the floor input every change, and sets validates true only if matches
    let codes = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
    ];

    setFloor(e.target.value);
    codes.indexOf(e.target.value) >= 0 ? setValidate(true) : setValidate(false);
  };

  return (
    <Card className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <form>
          <FormControl className={classes.form} variant="outlined">
            <Grid item xs={12}>
              <InputLabel htmlFor="floorInput">Enter Floor code</InputLabel>
              <OutlinedInput
                className={classes.button}
                color={validate ? "primary" : "secondary"}
                id="floorInput"
                value={floor}
                onChange={handleChange}
                label="Name"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<AccessAlarmIcon />}
                onClick={() => handleSubmit(floor, validate, history, path)}
              >
                {buttonMessage}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {
                <Typography color="error">
                  {signAlert || !user ? "sign in to start" : ""}
                </Typography>
              }
            </Grid>{" "}
            <Grid item xs={12}>
              {
                <Typography color="error">
                  {!validate ? "there is no matching floor" : ""}
                </Typography>
              }
            </Grid>
          </FormControl>
        </form>
      </Grid>
    </Card>
  );
};

export default InputScreen;
