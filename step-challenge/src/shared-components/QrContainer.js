import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Card, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  QR: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    flexFlow: "column",
  },
}));
const QrContainer = ({ handleSubmit, path }) => {
  const classes = useStyles();
  const [floor, setfloor] = useState("Hold QR Code steady and Clear to Scan");
  let history = useHistory();

  let codes = [
    "-3",
    "-2",
    "-1",
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

  const handleScan = (data) => {
    if (data) {
      const splitedData = data.split(/:/);
      //if no location, set default to TLV?

      console.log("array: ", splitedData);

      //for tlv site, if no locale params on QR, set as TLV
      if (!splitedData[1]) {
        splitedData[1] = "TLV";
        console.log("array fix: ", splitedData);
      }

      const valid = codes.indexOf(splitedData[0]) >= 0; //retrun -1 otherwise,
      if (valid) {
        //--setfloor(data) shows QR
        setfloor(data);
        handleSubmit(splitedData[0], splitedData[1], valid, history, path);
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <React.Fragment>
      <Card className={classes.QR}>
        <Typography>{floor}</Typography>
        <QrReader
          delay={300}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      </Card>
    </React.Fragment>
  );
};

export default QrContainer;
