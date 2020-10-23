import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// @material-ui/icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SchoolIcon from "@material-ui/icons/School";
import StyleIcon from "@material-ui/icons/Style";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

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

import api from "services/api";

const pictureArray = [image2, image4];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function ResultsPage(props) {
  const userLogged = useSelector((state) => state.user.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { ...rest } = props;

  const [search, setSearch] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [teachersHasNext, setTeachersHasNext] = useState(false);
  const [teachersPage, setTeachersPage] = useState(1);

  const [course, setCourse] = useState([]);
  const [courseHasNext, setCourseHasNext] = useState(false);
  const [coursePage, setCoursePage] = useState(1);

  const [category, setCategory] = useState([]);
  const [categoryHasNext, setCategoryHasNext] = useState(false);
  const [categoryPage, setCategoryPage] = useState(1);

  function navigateSearch() {
    setTeachersPage(1);
    setSearch(newSearch);
  }

  async function searchTeacher() {
    const response = await api.get(
      `user/search/teacher?name=${search}&page=${teachersPage}`,
      {
        headers: { Authorization: `Bearer ${userLogged.jwt}` },
      }
    );

    setTeachersHasNext(response.data.next ?? false);
    setTeachers(response.data.results ?? []);
  }

  async function searchCourse() {
    const response = await api.get(
      `courses/search?name=${search}&page=${coursePage}`,
      {
        headers: { Authorization: `Bearer ${userLogged.jwt}` },
      }
    );

    setCourseHasNext(response.data.next ?? false);
    setCourse(response.data.results ?? []);
  }

  async function searchCategory() {
    const response = await api.get(
      `courses/category/search?name=${search}&page=${categoryPage}`,
      {
        headers: { Authorization: `Bearer ${userLogged.jwt}` },
      }
    );

    setCategoryHasNext(response.data.next ?? false);
    setCategory(response.data.results ?? []);
  }

  useEffect(() => {
    if (location.state && location.state.search) {
      setSearch(location.state.search);
      setNewSearch(location.state.search);
    } else if ((location.state && !location.state.search) || !location.state) {
      history.push("/home");
    }
  }, [location]);

  useEffect(() => {
    searchTeacher();
  }, [search, teachersPage]);

  useEffect(() => {
    searchCourse();
  }, [search, coursePage]);

  useEffect(() => {
    searchCategory();
  }, [search, categoryPage]);

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
        image={selectedPicture}
        style={{ paddingLeft: "18%", paddingRight: "18%" }}
      >
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
                value={newSearch}
                onChange={(event) => {
                  setNewSearch(event.target.value);
                }}
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
                    tabButton: "Cursos",
                    tabIcon: SchoolIcon,
                    tabContent: (
                      <>
                        <GridContainer justify="center">
                          {course.length !== 0 ? (
                            <GridItem xs={12} sm={12} md={8}>
                              <GridContainer>
                                {course.map((eachCourse) => (
                                  <GridItem
                                    key={eachCourse.id}
                                    cs={12}
                                    sm={12}
                                    md={6}
                                    style={{ marginBottom: "20px" }}
                                  >
                                    <Card
                                      image={violaoImage}
                                      name={eachCourse.name}
                                      description={eachCourse.description}
                                      category={eachCourse.categoryName}
                                      onClick={() =>
                                        history.push(
                                          `/courses/detail/${eachCourse.id}`
                                        )
                                      }
                                    />
                                  </GridItem>
                                ))}
                              </GridContainer>
                            </GridItem>
                          ) : (
                            <GridItem xs={12} sm={12} md={8}>
                              <h2
                                style={{
                                  color: "#3C4858",
                                  textAlign: "center",
                                }}
                              >
                                Não encontramos nenhum resultado...
                              </h2>
                              <div style={{ flex: 1, margin: "0 45%" }}>
                                <SentimentVeryDissatisfiedIcon
                                  style={{ fontSize: 80, color: "#3C4858" }}
                                />
                              </div>
                            </GridItem>
                          )}
                        </GridContainer>
                        <GridContainer
                          justify="center"
                          style={{ marginTop: "20px" }}
                        >
                          <Paginations
                            pages={[
                              {
                                disabled: coursePage === 1,
                                active: coursePage !== 1,
                                text: "Anterior",
                                onClick:
                                  coursePage > 1
                                    ? () => {
                                        setCoursePage(coursePage - 1);
                                      }
                                    : null,
                              },
                              {
                                active: true,
                                text: coursePage,
                              },
                              {
                                text: "Próxima",
                                active: courseHasNext,
                                disabled: !courseHasNext,
                                onClick: courseHasNext
                                  ? () => {
                                      setCoursePage(coursePage + 1);
                                    }
                                  : null,
                              },
                            ]}
                          />
                        </GridContainer>
                      </>
                    ),
                  },
                  {
                    tabButton: "Categorias",
                    tabIcon: StyleIcon,
                    tabContent: (
                      <>
                        <GridContainer justify="center">
                          {category.length !== 0 ? (
                            <GridItem xs={12} sm={12} md={8}>
                              <GridContainer>
                                {category.map((eachCategory) => (
                                  <GridItem
                                    key={eachCategory.id}
                                    cs={12}
                                    sm={12}
                                    md={6}
                                    style={{ marginBottom: "20px" }}
                                  >
                                    <Card
                                      image={violaoImage}
                                      name={eachCategory.name}
                                      description={eachCategory.description}
                                      category={eachCategory.categoryName}
                                      onClick={() =>
                                        history.push(
                                          `/courses/detail/${eachCategory.id}`
                                        )
                                      }
                                    />
                                  </GridItem>
                                ))}
                              </GridContainer>
                            </GridItem>
                          ) : (
                            <GridItem xs={12} sm={12} md={8}>
                              <h2
                                style={{
                                  color: "#3C4858",
                                  textAlign: "center",
                                }}
                              >
                                Não encontramos nenhum resultado...
                              </h2>
                              <div style={{ flex: 1, margin: "0 45%" }}>
                                <SentimentVeryDissatisfiedIcon
                                  style={{ fontSize: 80, color: "#3C4858" }}
                                />
                              </div>
                            </GridItem>
                          )}
                        </GridContainer>
                        <GridContainer
                          justify="center"
                          style={{ marginTop: "20px" }}
                        >
                          <Paginations
                            pages={[
                              {
                                disabled: categoryPage === 1,
                                active: categoryPage !== 1,
                                text: "Anterior",
                                onClick:
                                  categoryPage > 1
                                    ? () => {
                                        setCategoryPage(categoryPage - 1);
                                      }
                                    : null,
                              },
                              {
                                active: true,
                                text: categoryPage,
                              },
                              {
                                text: "Próxima",
                                active: categoryHasNext,
                                disabled: !categoryHasNext,
                                onClick: categoryHasNext
                                  ? () => {
                                      setCategoryPage(categoryPage + 1);
                                    }
                                  : null,
                              },
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
                        <GridContainer
                          justify="center"
                          style={{ marginTop: 20 }}
                        >
                          {teachers.length !== 0 ? (
                            <GridItem xs={12} sm={12} md={8}>
                              <GridContainer>
                                {teachers.map((teacher) => (
                                  <GridItem
                                    cs={12}
                                    sm={12}
                                    md={6}
                                    style={{ marginBottom: "20px" }}
                                    key={teacher.nickname}
                                  >
                                    <CardTeacher
                                      image={`http://localhost:3000/user/images/${
                                        teacher.photo_path
                                          ? teacher.photo_path
                                          : "default.png"
                                      }`}
                                      name={`${teacher.first_name} ${teacher.last_name}`}
                                      description={teacher.description}
                                      onClick={() =>
                                        teacher.nickname === userLogged.nickname
                                          ? history.push(
                                              `me/${teacher.nickname}`
                                            )
                                          : history.push(
                                              `profile/${teacher.nickname}`
                                            )
                                      }
                                    />
                                  </GridItem>
                                ))}
                              </GridContainer>
                            </GridItem>
                          ) : (
                            <GridItem xs={12} sm={12} md={8}>
                              <h2
                                style={{
                                  color: "#3C4858",
                                  textAlign: "center",
                                }}
                              >
                                Não encontramos nenhum resultado...
                              </h2>
                              <div style={{ flex: 1, margin: "0 45%" }}>
                                <SentimentVeryDissatisfiedIcon
                                  style={{ fontSize: 80, color: "#3C4858" }}
                                />
                              </div>
                            </GridItem>
                          )}
                        </GridContainer>
                        <GridContainer
                          justify="center"
                          style={{ marginTop: "20px" }}
                        >
                          <Paginations
                            pages={[
                              {
                                disabled: teachersPage === 1,
                                active: teachersPage !== 1,
                                text: "Anterior",
                                onClick:
                                  teachersPage > 1
                                    ? () => {
                                        setTeachersPage(teachersPage - 1);
                                      }
                                    : null,
                              },
                              {
                                active: true,
                                text: teachersPage,
                              },
                              {
                                text: "Próxima",
                                active: teachersHasNext,
                                disabled: !teachersHasNext,
                                onClick: teachersHasNext
                                  ? () => {
                                      setTeachersPage(teachersPage + 1);
                                    }
                                  : null,
                              },
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
