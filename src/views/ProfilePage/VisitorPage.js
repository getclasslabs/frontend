/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

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
import Footer from "components/Footer/FooterLogin.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import api from "services/api";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image1 from "assets/img/background/1.jpg";

const useStyles = makeStyles(styles);

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

export default function VisitorPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const { nickname } = useParams();

  const userLogged = useSelector((state) => state.user.profile);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserByNickname() {
      const response = await api.get(`user/u/${nickname}`, {
        headers: { Authorization: "Bearer " + userLogged.jwt },
      });

      setUser(response.data);

      if (
        nickname === userLogged.nickname ||
        Object.keys(response.data).length === 0
      ) {
        history.push(`/me/${userLogged.nickname}`);
      }
    }

    getUserByNickname();
  }, []);

  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  function calculate_age(date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now;
  }

  const tabs = [
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
                  secondary={`${calculate_age(user.birthDate)} Anos`}
                />
              </ListItem>
              <Divider component="li" />
              {user.register === 1 && user.formation ? (
                <>
                  <ListItem>
                    <ListItemText
                      primary="Formação"
                      secondary={user.formation}
                    />
                  </ListItem>
                  <Divider component="li" />
                </>
              ) : null}
              {user.register === 1 && user.specialization ? (
                <>
                  <ListItem>
                    <ListItemText
                      primary="Especialização"
                      secondary={user.specialization}
                    />
                  </ListItem>
                  <Divider component="li" />
                </>
              ) : null}
              {user.register === 1 && user.working_time ? (
                <>
                  <ListItem>
                    <ListItemText
                      primary="Tempo de atuação"
                      secondary={
                        user.working_time === 1
                          ? `${user.working_time} ano`
                          : `${user.working_time} anos`
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </>
              ) : null}
              {user.telephone ? (
                <>
                  <ListItem>
                    <ListItemText
                      primary="Telefone"
                      secondary={user.telephone}
                    />
                  </ListItem>
                  <Divider component="li" />
                </>
              ) : null}
              {user.address ? (
                <>
                  <ListItem>
                    <ListItemText
                      primary="Localidade"
                      secondary={user.address}
                    />
                  </ListItem>
                </>
              ) : null}
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
  ];

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
      <Parallax small filter image={image1} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={`http://localhost:3000/user/images/${
                        user.photo_path ? user.photo_path : "default.png"
                      }`}
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3
                      className={classes.title}
                    >{`${user.first_name} ${user.last_name}`}</h3>
                    <h6>{user.register === 0 ? "ALUNO" : "PROFESSOR"}</h6>

                    {user.twitter ? (
                      <Button
                        justIcon
                        link
                        className={classes.margin5}
                        onClick={() => window.open(user.twitter, "_blank")}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                    ) : null}
                    {user.instagram ? (
                      <Button
                        justIcon
                        link
                        className={classes.margin5}
                        onClick={() => window.open(user.instagram, "_blank")}
                      >
                        <i className={"fab fa-instagram"} />
                      </Button>
                    ) : null}
                    {user.facebook ? (
                      <Button
                        justIcon
                        link
                        className={classes.margin5}
                        onClick={() => window.open(user.facebook, "_blank")}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                    ) : null}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>{user.description}</p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={
                    user.register === 0
                      ? tabs
                      : [
                          ...tabs,
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
                                            `${value} Heart${
                                              value !== 1 ? "s" : ""
                                            }`
                                          }
                                          precision={0.5}
                                          icon={
                                            <FavoriteIcon fontSize="inherit" />
                                          }
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
                                            `${value} Heart${
                                              value !== 1 ? "s" : ""
                                            }`
                                          }
                                          precision={0.5}
                                          icon={
                                            <FavoriteIcon fontSize="inherit" />
                                          }
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
                                            `${value} Heart${
                                              value !== 1 ? "s" : ""
                                            }`
                                          }
                                          precision={0.5}
                                          icon={
                                            <FavoriteIcon fontSize="inherit" />
                                          }
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
                                            `${value} Heart${
                                              value !== 1 ? "s" : ""
                                            }`
                                          }
                                          precision={0.5}
                                          icon={
                                            <FavoriteIcon fontSize="inherit" />
                                          }
                                          readOnly
                                        />
                                      </Box>
                                    </ListItem>
                                  </List>
                                </GridItem>
                              </GridContainer>
                            ),
                          },
                        ]
                  }
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
