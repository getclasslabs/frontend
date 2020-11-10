/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
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

import api from "services/api";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function CoursesPage(props) {
  const userLogged = useSelector((state) => state.user.profile);
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);

  async function getCourses() {
    const response = await api.get("courses/mine", {
      headers: { Authorization: "Bearer " + userLogged.jwt },
    });

    setCourses(response.data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getCourses();
  }, []);

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
        rightLinks={<HeaderLinks isTeacher={userLogged.register === 1} />}
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
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <GridItem
                          cs={12}
                          sm={12}
                          md={6}
                          style={{ marginBottom: "20px" }}
                          key={course.id}
                        >
                          <Card
                            image={`http://localhost:3000/course/images/${
                              course.image ? course.image : "default.png"
                            }`}
                            name={course.name}
                            description={course.description}
                            category={course.categoryName}
                            onClick={() =>
                              history.push(`/courses/detail/${course.id}`)
                            }
                          />
                        </GridItem>
                      ))
                    ) : (
                      <GridItem xs={12} sm={12} md={12}>
                        <h2
                          style={{
                            color: "#3C4858",
                            textAlign: "center",
                          }}
                        >
                          Não encontramos nenhum Curso...
                        </h2>
                        <div style={{ flex: 1, margin: "0 45%" }}>
                          <SentimentVeryDissatisfiedIcon
                            style={{ fontSize: 80, color: "#3C4858" }}
                          />
                        </div>
                      </GridItem>
                    )}
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
