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
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomModal from "components/Modal/CustomModal.js";

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

  const [courses, setCourses] = useState([]);
  const [coursesModalOpen, setCoursesModalOpen] = useState(false);

  const userLogged = useSelector((state) => state.user.profile);
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  async function getReviewsById(teacherId) {
    const response = await api.get(`user/review/${teacherId}`, {
      headers: { Authorization: `Bearer ${userLogged.jwt}` },
    });

    setReviews(response.data.reviews);
    setAverage(response.data.average);
  }

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

    if (response.data.register === 1) {
      getReviewsById(response.data.teacher_id);
    }
  }

  useEffect(() => {
    getUserByNickname();
  }, []);

  async function getCourses() {
    const response = await api.get(`courses/from/${user.id}`, {
      headers: { Authorization: "Bearer " + userLogged.jwt },
    });

    setCourses(response.data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getCourses();
  }, [user]);

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
              {courses.length > 0 ? (
                courses.slice(0, 5).map((course) => (
                  <>
                    <ListItem>
                      <ListItemText
                        primary={course.name}
                        secondary={course.description}
                      />
                      <Button
                        justIcon
                        round
                        color="primary"
                        onClick={() =>
                          history.push(`/courses/detail/${course.id}`)
                        }
                      >
                        <PlayArrowIcon />
                      </Button>
                    </ListItem>
                    <Divider component="li" />
                  </>
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
            </List>
            {courses.length > 0 ? (
              <Button
                color="primary"
                className={classes.navLinkLogout}
                style={{ marginTop: 10 }}
                onClick={() => setCoursesModalOpen(true)}
              >
                Ver todos os cursos
              </Button>
            ) : null}
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
                                  {reviews.length !== 0 ? (
                                    <>
                                      <List className={classes.list}>
                                        {reviews.slice(0, 5).map((review) => (
                                          <>
                                            <ListItem>
                                              <ListItemText
                                                primary={review.comment}
                                                secondary={`${review.first_name} ${review.last_name}`}
                                              />
                                              <Box
                                                component="fieldset"
                                                mb={3}
                                                borderColor="transparent"
                                              >
                                                <StyledRating
                                                  name="customized-color"
                                                  defaultValue={review.value}
                                                  getLabelText={(value) =>
                                                    `${value} Heart${
                                                      value !== 1 ? "s" : ""
                                                    }`
                                                  }
                                                  precision={0.25}
                                                  icon={
                                                    <FavoriteIcon fontSize="inherit" />
                                                  }
                                                  readOnly
                                                />
                                              </Box>
                                            </ListItem>
                                            <Divider component="li" />
                                          </>
                                        ))}
                                      </List>
                                      <Button
                                        color="primary"
                                        className={classes.navLinkLogout}
                                        style={{ marginTop: 10 }}
                                        onClick={() => setReviewModalOpen(true)}
                                      >
                                        Ver todas as avaliações
                                      </Button>
                                    </>
                                  ) : (
                                    <GridItem xs={12} sm={12} md={12}>
                                      <h2
                                        style={{
                                          color: "#3C4858",
                                          textAlign: "center",
                                        }}
                                      >
                                        Não há nenhuma avaliação...
                                      </h2>
                                      <div style={{ flex: 1, margin: "0 45%" }}>
                                        <SentimentVeryDissatisfiedIcon
                                          style={{
                                            fontSize: 80,
                                            color: "#3C4858",
                                          }}
                                        />
                                      </div>
                                    </GridItem>
                                  )}
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
      <CustomModal open={reviewModalOpen} setOpen={setReviewModalOpen}>
        {reviews ? (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <h3>Média de avaliações: {average}</h3>
            </GridItem>
            <List className={classes.list}>
              {reviews.map((review) => (
                <>
                  <ListItem>
                    <ListItemText
                      primary={review.comment}
                      secondary={`${review.first_name} ${review.last_name}`}
                    />
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <StyledRating
                        name="customized-color"
                        defaultValue={review.value}
                        getLabelText={(value) =>
                          `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        precision={0.25}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        readOnly
                      />
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                </>
              ))}
            </List>
          </GridContainer>
        ) : null}
      </CustomModal>
      <CustomModal open={coursesModalOpen} setOpen={setCoursesModalOpen}>
        {courses ? (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <h3>Todos os Cursos:</h3>
            </GridItem>
            <List className={classes.list}>
              {courses.map((course) => (
                <>
                  <ListItem>
                    <ListItemText
                      primary={course.name}
                      secondary={course.description}
                    />
                    <Button
                      justIcon
                      round
                      color="primary"
                      onClick={() =>
                        history.push(`/courses/detail/${course.id}`)
                      }
                    >
                      <PlayArrowIcon />
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                </>
              ))}
            </List>
          </GridContainer>
        ) : null}
      </CustomModal>
      <Footer />
    </div>
  );
}
