import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from "@material-ui/lab/Rating";
// @material-ui/icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SchoolIcon from "@material-ui/icons/School";
import GradeIcon from "@material-ui/icons/Grade";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterProfilePage.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksProfile.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/matheus.png";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image2 from "assets/img/background/2.jpg";
import image4 from "assets/img/background/4.jpg";

const pictureArray = [image2, image4];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];

const useStyles = makeStyles(styles);

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={selectedPicture} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Matheus Melo</h3>
                    <h6>PROFESSOR</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                Sou aluno da UNESP cursando Sistemas de Informação e já estou no
                último ano, decidi dedicar um tempo à ensinar outras pessoas que
                estão começando suas carreiras profissionais agora, pretendo
                ajudar ao máximo em tudo que puder para que esses novos desafios
                se tornem cada vez mais fácil!
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Sobre Mim",
                      tabIcon: AccountCircleIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={8}>
                            <List className={classes.list}>
                              <ListItem>
                                <ListItemText
                                  primary="Idade"
                                  secondary="20 anos"
                                />
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Formação"
                                  secondary="Bacharelado em Sistemas de informação - UNESP"
                                />
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Especialização"
                                  secondary="Programação Backend em GO"
                                />
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Tempo de atuação"
                                  secondary="2 anos"
                                />
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Telefone"
                                  secondary="(14) 99633-0887"
                                />
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Localidade"
                                  secondary="Bauru - SP, Brasil"
                                />
                              </ListItem>
                            </List>
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Cursos",
                      tabIcon: SchoolIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={8}>
                            <List className={classes.list}>
                              <ListItem>
                                <ListItemText
                                  primary="Curso Completo GO Lang"
                                  secondary="Aprenda do Básico ao avançado da nova linguagem da Google."
                                />
                                <Button justIcon round color="primary">
                                  <PlayArrowIcon />
                                </Button>
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Curso Completo PHP"
                                  secondary="Aprenda do Básico ao avançado de uma das liguagens mais usadas do mundo."
                                />
                                <Button justIcon round color="primary">
                                  <PlayArrowIcon />
                                </Button>
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Curso Violão"
                                  secondary="Aprenda o básico do violão para alegrar os churrascos em família."
                                />
                                <Button justIcon round color="primary">
                                  <PlayArrowIcon />
                                </Button>
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Curso MasterChef"
                                  secondary="Seu omelete nunca mais será o mesmo!"
                                />
                                <Button justIcon round color="primary">
                                  <PlayArrowIcon />
                                </Button>
                              </ListItem>
                            </List>
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Avaliações",
                      tabIcon: GradeIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={8}>
                            <List className={classes.list}>
                              <ListItem>
                                <ListItemText
                                  primary="Ótimo professor!"
                                  secondary="Consegui aprender muito com ele, tudo o que precisava saber..."
                                />
                                <Box
                                  component="fieldset"
                                  mb={3}
                                  borderColor="transparent"
                                >
                                  <StyledRating
                                    name="customized-color"
                                    defaultValue={4.5}
                                    getLabelText={(value) =>
                                      `${value} Heart${value !== 1 ? "s" : ""}`
                                    }
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    readOnly
                                  />
                                </Box>
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Gostei"
                                  secondary="Achei muito legal o jeito que ele explica"
                                />
                                <Box
                                  component="fieldset"
                                  mb={3}
                                  borderColor="transparent"
                                >
                                  <StyledRating
                                    name="customized-color"
                                    defaultValue={5}
                                    getLabelText={(value) =>
                                      `${value} Heart${value !== 1 ? "s" : ""}`
                                    }
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    readOnly
                                  />
                                </Box>
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Poderia melhorar"
                                  secondary="Achei dificil de entender o que ele explicava, a aula presencial pode ser melhor"
                                />
                                <Box
                                  component="fieldset"
                                  mb={3}
                                  borderColor="transparent"
                                >
                                  <StyledRating
                                    name="customized-color"
                                    defaultValue={3}
                                    getLabelText={(value) =>
                                      `${value} Heart${value !== 1 ? "s" : ""}`
                                    }
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    readOnly
                                  />
                                </Box>
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText
                                  primary="Já vi melhores"
                                  secondary="Conteúdo muito básico, ainda fiquei com dúvidas"
                                />
                                <Box
                                  component="fieldset"
                                  mb={3}
                                  borderColor="transparent"
                                >
                                  <StyledRating
                                    name="customized-color"
                                    defaultValue={1.5}
                                    getLabelText={(value) =>
                                      `${value} Heart${value !== 1 ? "s" : ""}`
                                    }
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    readOnly
                                  />
                                </Box>
                              </ListItem>
                            </List>
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
