import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// import BuyDetail from "./Detail/BuyDetail.js";
import StudentDetail from "./Detail/StudentDetail.js";
import TeacherDetail from "./Detail/TeacherDetail.js";

export default function CoursesDetail(props) {
  const location = useLocation();
  const [type, setType] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state && location.state.type) {
      setType(location.state.type);
    }
  }, [location]);

  return type === "" ? (
    <TeacherDetail props={props} />
  ) : type === "student" ? (
    <StudentDetail />
  ) : (
    <TeacherDetail />
  );
}
