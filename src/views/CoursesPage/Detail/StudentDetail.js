/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
// core components
import Header from "components/Header/HeaderLogin.js";
import Footer from "components/Footer/FooterLogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksUser.js";
import Parallax from "components/Parallax/Parallax.js";
import CardTeacher from "components/CustomCard/CardTeacher.js";
import Button from "components/CustomButtons/Button.js";
import CustomModalReview from "components/Modal/CustomModalReview.js";
import api from "services/api";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import Chat from "./Components/Chat.js";

const useStyles = makeStyles(styles);

export default function StudentDetails({ data }) {
  const userLogged = useSelector((state) => state.user.profile);
  const classes = useStyles();
  const history = useHistory();
  const { course_id } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  const [teacher, setTeacher] = useState([]);
  const [course, setCourse] = useState([]);

  const [students, setStudents] = useState([]);

  async function getStudents() {
    const response = await api.get(`courses/students/${course_id}`, {
      headers: { Authorization: `Bearer ${userLogged.jwt}` },
    });

    setStudents(response.data);
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMessage(false);
  };

  function handleStartDay(startDay) {
    const date = new Date(startDay);
    return format(date, "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
  }

  async function getCourse() {
    let response = [];

    if (data.lenght > 0) {
      response = data;
    } else {
      response = await api.get(`courses/s/${course_id}`, {
        headers: { Authorization: "Bearer " + userLogged.jwt },
      });
    }

    if (response.data.lenght === 0) {
      history.push("/courses");
    }
    setCourse(response.data);

    const responseTeacher = await api.get(
      `user/teacher/${response.data.teacher_id}`,
      {
        headers: { Authorization: `Bearer ${userLogged.jwt}` },
      }
    );

    setTeacher(responseTeacher.data);
  }

  useEffect(() => {
    getCourse();
    getStudents();
  }, []);

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
      />
      <Parallax
        small
        filter
        image={`http://localhost:3000/course/images/${
          course.image ? course.image : "default.png"
        }`}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} style={{ paddingBottom: 30 }}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h2 className={classes.title}>{course.name}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h5 style={{ fontSize: 20 }}>{course.description}</h5>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <p
                style={{
                  fontSize: 16,
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                {course.periods}
              </p>
            </GridItem>

            {course.startDay ? (
              <GridItem xs={12} sm={12} md={12}>
                <p style={{ fontSize: 16, fontStyle: "italic" }}>
                  {`Início dia ${handleStartDay(course.startDay)}`}
                  {course.maxStudents
                    ? `, turma de ${course.maxStudents} ${
                        course.maxStudents === 1 ? "aluno" : "alunos"
                      }`
                    : null}
                  {course.classes
                    ? ` com ${course.classes} ${
                        course.classes === 1 ? "aula" : "aulas"
                      } no total.`
                    : "."}
                </p>
              </GridItem>
            ) : null}

            <GridItem cs={12} sm={12} md={6} style={{ margin: "30px" }}>
              <p style={{ fontSize: 12, fontStyle: "italic" }}>Professor:</p>
              <CardTeacher
                image={`http://localhost:3000/user/images/${
                  teacher.photo_path ? teacher.photo_path : "default.png"
                }`}
                name={`${teacher.first_name} ${teacher.last_name}`}
                description={teacher.description}
                onClick={() =>
                  history.push({
                    pathname: `/profile/${teacher.nickname}`,
                    state: { id: course_id },
                  })
                }
              />
            </GridItem>
            <GridItem cs={12} sm={12} md={4} style={{ margin: "30px" }}>
              {!course.registered ? (
                <p style={{ fontSize: 12, fontStyle: "italic" }}>
                  Aguarde a aprovação do professor para você poder acessar o
                  curso!
                </p>
              ) : null}
              <Button
                color={course.registered ? "primary" : ""}
                className={classes.navLinkLogout}
                style={{ height: 80, width: "80%" }}
                onClick={
                  course.registered
                    ? () =>
                        history.push({
                          pathname: "/courses/view",
                          state: {
                            id: course_id,
                            name: course.name,
                            periods: course.periods,
                          },
                        })
                    : null
                }
              >
                Acessar aula
              </Button>
              <Button
                color={course.registered ? "primary" : ""}
                className={classes.navLinkLogout}
                style={{ height: 60, width: "80%" }}
                onClick={course.registered ? () => setModalOpen(true) : null}
              >
                Avaliar professor
              </Button>
            </GridItem>
            <CustomModalReview
              open={modalOpen}
              setOpen={setModalOpen}
              teacherId={course.teacher_id}
              openMessage={setOpenMessage}
            />
          </GridContainer>
          {course.registered ? (
            <Chat
              roomId={course_id}
              userId={userLogged.userId}
              teacher={teacher}
              students={students}
              history={history}
            />
          ) : null}
        </div>
      </div>
      <Snackbar
        open={openMessage}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Avaliação enviada com sucesso!
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
}
