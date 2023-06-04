import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { START_PATH, HOME_PATH } from "../shared-components/constants";
import firebase from "firebase/app";
import "firebase/auth";

const MenuButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const auth = firebase.auth();
  const open = Boolean(anchorEl);

  const clickStart = () => {
    handleClose();
    history.push(START_PATH);
  };

  const clickLeaderBoard = () => {
    handleClose();
    history.push(HOME_PATH);
  };

  const clickSignOut = () => {
    handleClose();
    auth.signOut();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={clickStart}>start</MenuItem>
        <MenuItem onClick={clickLeaderBoard}>Leader board</MenuItem>
        <MenuItem onClick={clickSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuButton;
