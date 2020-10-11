import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// @material-ui/icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SchoolIcon from "@material-ui/icons/School";

// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/ParallaxSearch.js";
import Card from "components/CustomCard/Card.js";
import CardTeacher from "components/CustomCard/CardTeacher.js";
import CustomModal from "components/Modal/CustomModal.js";
import Button from "components/CustomButtons/Button.js";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(false);

  function openModal(content) {
    setModalContent(content);
    setModalOpen(true);
  }

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
      <Parallax filter image={image}>
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
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
              <NavPills
                alignCenter
                color="primary"
                tabs={[
                  {
                    tabButton: "Cursos",
                    tabIcon: SchoolIcon,
                    tabContent: (
                      <>
                        <GridContainer justify="center">
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
                      </>
                    ),
                  },
                  {
                    tabButton: "Aula única",
                    tabIcon: AccountCircleIcon,
                    tabContent: (
                      <>
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={8}>
                            <GridContainer>
                              <GridItem
                                cs={12}
                                sm={12}
                                md={6}
                                style={{ marginBottom: "20px" }}
                                onClick={() =>
                                  openModal(
                                    <>
                                      <h3>Horário da aula</h3>
                                      <Button
                                        color="primary"
                                        style={{ width: "100%" }}
                                        onClick={() =>
                                          history.push({
                                            pathname: "/courses/view",
                                            state: { id: "unica-123" },
                                          })
                                        }
                                        className={classes.navLinkLogout}
                                      >
                                        Acessar Aula
                                      </Button>
                                    </>
                                  )
                                }
                              >
                                <CardTeacher
                                  image={violaoImage}
                                  name="Matheus"
                                />
                              </GridItem>
                              <GridItem
                                cs={12}
                                sm={12}
                                md={6}
                                style={{ marginBottom: "20px" }}
                                onClick={() =>
                                  openModal(
                                    <>
                                      <h3>Horário da aula</h3>
                                      <Button
                                        color="primary"
                                        style={{ width: "100%" }}
                                        onClick={() =>
                                          history.push({
                                            pathname: "/courses/view",
                                            state: { id: "unica-1234" },
                                          })
                                        }
                                        className={classes.navLinkLogout}
                                      >
                                        Acessar Aula
                                      </Button>
                                      <Button
                                        color="danger"
                                        style={{ width: "100%" }}
                                        className={classes.navLinkLogout}
                                      >
                                        Cancelar
                                      </Button>
                                    </>
                                  )
                                }
                              >
                                <CardTeacher
                                  image={esportesImage}
                                  name="Matheus"
                                />
                              </GridItem>
                              <GridItem
                                cs={12}
                                sm={12}
                                md={6}
                                style={{ marginBottom: "20px" }}
                              >
                                <CardTeacher
                                  image={quimicaImage}
                                  name="Matheus"
                                />
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                        </GridContainer>
                      </>
                    ),
                  },
                ]}
              />
            </GridItem>
            <CustomModal open={modalOpen} setOpen={setModalOpen}>
              {modalContent}
            </CustomModal>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
