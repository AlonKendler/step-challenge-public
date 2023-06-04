import React from "react";
import "./App.css";
import Header from "./Header";
import MainPage from "./MainPage";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import "firebase/firestore";
import theme from "./CreateMuiTheme";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {
  CLIMBING_PATH,
  HOME_PATH,
  START_PATH,
} from "./shared-components/constants";
import GamePage from "./GamePage";
import LeaderboardPage from "./LeaderboardPage";
import logo from "./images/logo.png";

const useStyles = makeStyles((theme) => ({
  body: {
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "600px",
  },
  logo: {
    maxWidth: "100%",
    height: "20vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <Header />
          <div className={classes.body}>
            <img src={logo} alt="logo" className={classes.logo} />
            <Switch>
              <Route
                exact
                path={HOME_PATH}
                render={(props) => <LeaderboardPage {...props} />}
              />
              <Route
                exact
                path={CLIMBING_PATH}
                render={(props) => <GamePage {...props} />}
              />
              <Route excact path={START_PATH} component={MainPage} />
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
