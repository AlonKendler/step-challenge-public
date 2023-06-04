import React from "react";
import Paper from "@material-ui/core/Paper";

import {
  FormControl,
  FormHelperText,
  makeStyles,
  NativeSelect,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sort: {
    width: "65vw",
    maxWidth: "100%",
    margin: "auto",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: "95%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const SortTabs = ({ location, handleChange }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.sort}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={location}
          onChange={handleChange}
          //   name="age"
          //   className={classes.selectEmpty}
          //   inputProps={{ "aria-label": "age" }}
        >
          <option value="">All locations</option>
          <option value={"TLV"}>TLV</option>
          <option value={"Jerozolimskie"}>Jerozolimskie</option>
          <option value={"Postepu"}>Postepu</option>
          <option value={"Konstruktorska"}>Konstruktorska</option>
          <option value={"Rzymowskiego"}>Rzymowskiego</option>
          {/* <option value={"Belgium"}>Belgium</option> */}
        </NativeSelect>
        <FormHelperText>Sort by Location</FormHelperText>
      </FormControl>
    </Paper>
  );
};

export default SortTabs;
