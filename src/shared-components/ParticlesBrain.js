import { makeStyles } from "@material-ui/core";
import React from "react";
import Particles from "react-particles-js";
import imgSrc1 from "../images/logo.png";
import imgSrc2 from "../images/greyLogo.png";
import imgSrc3 from "../images/redPet.png";

const useStyles = makeStyles((theme) => ({
  particles: {
    position: "absolute",
  },
  canvasParticle: {
    width: "100vw !important",
    height: "100vh !important",
  },
}));
const ParticleBrain = () => {
  const classes = useStyles();

  return (
    <Particles
      className={classes.particles}
      canvasClassName={classes.canvasParticle}
      params={{
        retina_detect: false,
        particles: {
          color: {
            value: "#a61a1a",
          },
          number: {
            value: 10,
          },
          shape: {
            type: ["image", "circle"],
            image: [
              {
                src: imgSrc1,
                height: 100,
                width: 100,
              },
              {
                src: imgSrc2,
                height: 100,
                width: 100,
              },
              {
                src: imgSrc3,
                height: 100,
                width: 100,
              },
            ],
          },
          size: {
            value: 20,
            random: false,
          },
        },
      }}
    />
  );
};

export default ParticleBrain;
