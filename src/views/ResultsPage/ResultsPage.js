import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// @material-ui/icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SchoolIcon from "@material-ui/icons/School";
import StyleIcon from "@material-ui/icons/Style";

// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/ParallaxSearch.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/CustomCard/Card.js";
import CardTeacher from "components/CustomCard/CardTeacher.js";
import Paginations from "components/Pagination/Pagination.js";

import styles from "assets/jss/material-kit-react/views/homePage.js";

import image2 from "assets/img/background/2.jpg";
import image4 from "assets/img/background/4.jpg";

import violaoImage from "assets/img/category/violao.jpg";
import esportesImage from "assets/img/category/esportes.jpg";
import quimicaImage from "assets/img/category/quimica.jpg";

const pictureArray = [image2, image4];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function ResultsPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  const navigateSearch = (event) => {
    event.preventDefault();
    history.push("/results");
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
          height: 150,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={selectedPicture}>
        <div
          className={classes.container}
          style={{
            backgroundColor: "RGB(255,255,255,0.1)",
            borderRadius: "4px",
          }}
        >
          <GridContainer alignItems="alignItems" style={{ paddingTop: "10px" }}>
            <GridItem xs={12} sm={12} md={10}>
              <CustomInput
                labelText="Digite algo que deseje buscar"
                id="search"
                white
                // value={email}
                // onChange={(event) => {
                //   setEmail(event.target.value);
                // }}
                formControlProps={{
                  fullWidth: true,
                }}
                style={{
                  paddingLeft: "10px",
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <Button
                color="primary"
                size="lg"
                rel="noopener noreferrer"
                onClick={navigateSearch}
              >
                Buscar
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <h2 className={classes.title} style={{ color: "#3C4858" }}>
              Resultados
            </h2>

            <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
              <NavPills
                alignCenter
                color="primary"
                tabs={[
                  {
                    tabButton: "Categorias",
                    tabIcon: StyleIcon,
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
                              >
                                <Card image={violaoImage} name="Violão" />
                              </GridItem>
                              <GridItem
                                cs={12}
                                sm={12}
                                md={6}
                                style={{ marginBottom: "20px" }}
                              >
                                <Card image={esportesImage} name="Esportes" />
                              </GridItem>
                              <GridItem
                                cs={12}
                                sm={12}
                                md={6}
                                style={{ marginBottom: "20px" }}
                              >
                                <Card image={quimicaImage} name="Química" />
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                        </GridContainer>
                        <GridContainer
                          justify="center"
                          style={{ marginTop: "20px" }}
                        >
                          <Paginations
                            pages={[
                              { text: "Anterior" },
                              { active: true, text: 3 },
                              { text: "Próxima" },
                            ]}
                          />
                        </GridContainer>
                      </>
                    ),
                  },
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
                              >
                                <Card image={violaoImage} name="Violão" />
                              </GridItem>
                              <GridItem
                                cs={12}
                                sm={12}
                                md={6}
                                style={{ marginBottom: "20px" }}
                              >
                                <Card image={esportesImage} name="Esportes" />
                              </GridItem>
                              <GridItem
                                cs={12}
                                sm={12}
                                md={6}
                                style={{ marginBottom: "20px" }}
                              >
                                <Card image={quimicaImage} name="Química" />
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                        </GridContainer>
                        <GridContainer
                          justify="center"
                          style={{ marginTop: "20px" }}
                        >
                          <Paginations
                            pages={[
                              { text: "Anterior" },
                              { active: true, text: 3 },
                              { text: "Próxima" },
                            ]}
                          />
                        </GridContainer>
                      </>
                    ),
                  },
                  {
                    tabButton: "Professores",
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
                        <GridContainer
                          justify="center"
                          style={{ marginTop: "20px" }}
                        >
                          <Paginations
                            pages={[
                              { text: "Anterior" },
                              { active: true, text: 3 },
                              { text: "Próxima" },
                            ]}
                          />
                        </GridContainer>
                      </>
                    ),
                  },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
