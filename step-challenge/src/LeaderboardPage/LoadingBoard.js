import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
  row: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const LoadingBoard = () => {
  const classes = useStyles();
  return (
    <div>
      <Skeleton className={classes.row} variant="rect" height={30}></Skeleton>
      <Skeleton className={classes.row} variant="rect" height={30}></Skeleton>
      <Skeleton className={classes.row} variant="rect" height={30}></Skeleton>
      <Skeleton className={classes.row} variant="rect" height={30}></Skeleton>
      <Skeleton className={classes.row} variant="rect" height={30}></Skeleton>
      <Skeleton className={classes.row} variant="rect" height={30}></Skeleton>
    </div>
  );
};

export default LoadingBoard;
