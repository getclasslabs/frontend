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
import HeaderLinks from "components/Header/HeaderLinksCourse.js";
import Parallax from "components/Parallax/Parallax.js";
import CardTeacher from "components/CustomCard/CardTeacher.js";
import Button from "components/CustomButtons/Button.js";
import CustomModal from "components/Modal/CustomModal.js";
import CustomModalReceipt from "components/Modal/CustomModalReceipt.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import api from "services/api";

import Chat from "./Components/Chat.js";
import Students from "./Components/Students.js";

const useStyles = makeStyles(styles);

export default function TeacherDetail({ props, data }) {
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;
  const { course_id } = useParams();
  const userLogged = useSelector((state) => state.user.profile);

  const [openError, setOpenError] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");

  const [teacher, setTeacher] = useState([]);
  const [course, setCourse] = useState([]);
  const [admin, setAdmin] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCancelOpen, setModalCancelOpen] = useState(false);
  const [modalReceiptOpen, setModalReceiptOpen] = useState(false);
  const [modalContent, setModalContent] = useState(false);

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

  useEffect(() => {
    if (
      props.history.location.state &&
      props.history.location.state.submitSuccess
    ) {
      setOpenMessage(true);
      setMessage("Curso atualizado com sucesso!");
    }
  }, [props]);

  async function getCourse() {
    if (userLogged.teacher_id === data.teacher_id && data.active) {
      setAdmin(true);
    }

    if (!data) {
      history.push("/courses");
    }

    const responseTeacher = await api.get(`user/teacher/${data.teacher_id}`, {
      headers: { Authorization: `Bearer ${userLogged.jwt}` },
    });

    setTeacher(responseTeacher.data);

    setCourse(data);
  }

  useEffect(() => {
    getCourse();
    getStudents();
  }, []);

  async function handleFinish() {
    try {
      await api.delete(`courses/${course_id}`, {
        headers: { Authorization: "Bearer " + userLogged.jwt },
      });

      setModalOpen(false);
      history.push("/courses", { submitSuccess: true });
    } catch (err) {
      setOpenError(true);
    }
  }

  function handleStartDay(startDay) {
    const date = new Date(startDay);
    return format(date, "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={
          <HeaderLinks
            courseId={admin ? course_id : null}
            setModal={setModalCancelOpen}
          />
        }
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
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
                    pathname: `/me/${teacher.nickname}`,
                    state: { id: course_id },
                  })
                }
              />
            </GridItem>
            <GridItem cs={12} sm={12} md={4} style={{ margin: "30px" }}>
              <p style={{ fontSize: 12, fontStyle: "italic" }}>
                Sua aula fica disponível aqui:
              </p>
              {course.type === "PRESENCIAL" ? (
                course.registered ? (
                  <p style={{ fontSize: 18, fontWeight: "bold" }}>
                    Local de Aula: {course.place}
                  </p>
                ) : null
              ) : (
                <Button
                  color="primary"
                  className={classes.navLinkLogout}
                  style={{ height: 80, width: "80%" }}
                  onClick={() =>
                    history.push({
                      pathname: "/courses/view",
                      state: {
                        id: course_id,
                        name: course.name,
                        periods: course.periods,
                      },
                    })
                  }
                >
                  Acessar aula
                </Button>
              )}
            </GridItem>
            <GridItem cs={12} sm={12} md={6}>
              <Chat
                isLong
                roomId={course_id}
                userId={userLogged.userId}
                teacher={teacher}
                students={students}
                history={history}
              />
            </GridItem>
            <GridItem cs={12} sm={12} md={6}>
              <Students
                id={course_id}
                setModalContent={setModalContent}
                setModalOpen={setModalOpen}
                setModalReciptOpen={setModalReceiptOpen}
                updateStudents={getStudents}
              />
            </GridItem>
            <CustomModal
              open={modalCancelOpen}
              setOpen={setModalCancelOpen}
              handleFinish={handleFinish}
            >
              <GridItem cs={12} sm={12} md={12}>
                {openError ? (
                  <p
                    style={{ fontSize: 12, fontStyle: "italic", color: "red" }}
                  >
                    Ocorreu um erro, tente novamente...
                  </p>
                ) : null}
                <p>
                  Tem certeza que deseja deletar este curso? Essa ação não
                  poderá ser desfeita!
                </p>
                <Button
                  color="danger"
                  className={classes.navLinkLogout}
                  style={{ width: "100%" }}
                  onClick={() => handleFinish()}
                >
                  Continuar
                </Button>
              </GridItem>
            </CustomModal>
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
      <CustomModalReceipt open={modalReceiptOpen} setOpen={setModalReceiptOpen}>
        {modalContent}
      </CustomModalReceipt>
      <CustomModal open={modalOpen} setOpen={setModalOpen}>
        {modalContent}
      </CustomModal>
      <Footer />
    </div>
  );
}
