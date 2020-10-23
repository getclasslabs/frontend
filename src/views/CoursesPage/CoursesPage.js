/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";
import Parallax from "components/Parallax/ParallaxSearch.js";
import Card from "components/CustomCard/Card.js";

import styles from "assets/jss/material-kit-react/views/homePage.js";

import image from "assets/img/background/2.jpg";

import violaoImage from "assets/img/category/violao.jpg";
import esportesImage from "assets/img/category/esportes.jpg";
import quimicaImage from "assets/img/category/quimica.jpg";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function CoursesPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMessage(false);
  };

  useEffect(() => {
    if (
      props.history.location.state &&
      props.history.location.state.submitSuccess
    ) {
      setOpenMessage(true);
      setMessage("Curso deletado com sucesso!");
    }
  }, [props]);

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 150,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        filter
        image={image}
        style={{ paddingLeft: "18%", paddingRight: "18%" }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>Meus Cursos</h1>
              <h4>
                Esses são os cursos que você está matriculado no momento, fique
                atento para não perder nenhuma aula!
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center" style={{ marginTop: 30 }}>
            <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
              <GridContainer
                justify="center"
                style={{ marginTop: 40, marginBottom: 30 }}
              >
                <GridItem xs={12} sm={12} md={8}>
                  <GridContainer>
                    <GridItem
                      cs={12}
                      sm={12}
                      md={6}
                      style={{ marginBottom: "20px" }}
                      onClick={() =>
                        history.push({
                          pathname: "/courses/detail/123",
                          state: { type: "student" },
                        })
                      }
                    >
                      <Card image={violaoImage} name="Violão" />
                    </GridItem>
                    <GridItem
                      cs={12}
                      sm={12}
                      md={6}
                      style={{ marginBottom: "20px" }}
                      onClick={() =>
                        history.push({
                          pathname: "/courses/detail/123",
                          state: { type: "" },
                        })
                      }
                    >
                      <Card image={esportesImage} name="Esportes" />
                    </GridItem>
                    <GridItem
                      cs={12}
                      sm={12}
                      md={6}
                      style={{ marginBottom: "20px" }}
                      onClick={() =>
                        history.push({
                          pathname: "/courses/detail/123",
                          state: { type: "teacher" },
                        })
                      }
                    >
                      <Card image={quimicaImage} name="Química" />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Snackbar
        open={openMessage}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
}
