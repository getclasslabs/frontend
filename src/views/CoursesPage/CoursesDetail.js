import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// import BuyDetail from "./Detail/BuyDetail.js";
import StudentDetail from "./Detail/StudentDetail.js";
import TeacherDetail from "./Detail/TeacherDetail.js";
import BuyDetail from "./Detail/BuyDetail.js";

import api from "services/api";

export default function CoursesDetail(props) {
  const history = useHistory();
  const userLogged = useSelector((state) => state.user.profile);
  const { course_id } = useParams();

  const [buyMessage, setBuyMessage] = useState(false);
  const [buy, setBuy] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [student, setStudent] = useState(false);

  const [data, setData] = useState([]);

  async function getTeacher() {
    const response = await api.get(`courses/${course_id}`, {
      headers: { Authorization: "Bearer " + userLogged.jwt },
    });

    setData(response.data);

    if (userLogged.teacher_id === response.data.teacher_id) {
      setTeacher(true);
    }

    setBuy(false);
    setBuyMessage("Você não tem permissão para participar desse curso!");
  }

  async function getStudent() {
    const response = await api.get(`courses/s/${course_id}`, {
      headers: { Authorization: "Bearer " + userLogged.jwt },
    });

    setData(response.data);

    if (!response.data) {
      history.push("/courses");
    }

    if (response.data.solicitation) {
      setStudent(true);
    }

    if (response.data.maxStudents <= response.data.studentsRegistered) {
      setBuy(false);
      setBuyMessage("Número de vagas esgotadas por enquanto!");
    } else {
      setBuy(true);
      setBuyMessage("Aproveite pois ainda há vagas!");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userLogged.teacher_id !== null) {
      getTeacher();
    } else {
      getStudent();
    }
  }, []);

  return teacher ? (
    <TeacherDetail props={props} data={data} />
  ) : student ? (
    <StudentDetail data={data} />
  ) : (
    <BuyDetail buy={buy} buyMessage={buyMessage} data={data} />
  );
}
