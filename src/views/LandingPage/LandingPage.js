import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// @material-ui/icons

// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLandingPage.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinksLanding.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

import image2 from "assets/img/background/2.jpg";
import image4 from "assets/img/background/4.jpg";

const pictureArray = [image2, image4];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  const navigateRegister = (event) => {
    event.preventDefault();
    history.push("/register");
  };

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        filter
        image={selectedPicture}
        style={{ paddingLeft: "18%", paddingRight: "18%" }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Aqui você aprende mais.</h1>
              <h4>
                Temos inumeros professores e alunos que estão em busca de
                compartilhar e adquirir conhecimento, junte-se a eles e encontre
                a solução para o que você não acha pela internet! Está perdendo
                tempo por que? Crie uma conta e comece agora mesmo
                gratuitamente.
              </h4>
              <br />
              <Button
                color="primary"
                size="lg"
                rel="noopener noreferrer"
                onClick={navigateRegister}
              >
                Comece Já
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
