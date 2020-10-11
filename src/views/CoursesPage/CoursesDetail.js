import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import BuyDetail from "./Detail/BuyDetail.js";
import StudentDetail from "./Detail/StudentDetail.js";
import TeacherDetail from "./Detail/TeacherDetail.js";

export default function CoursesDetail() {
  const location = useLocation();
  const [type, setType] = useState("");

  useEffect(() => {
    if (location.state && location.state.type) {
      setType(location.state.type);
    }
  }, [location]);

  return type === "" ? (
    <BuyDetail />
  ) : type === "student" ? (
    <StudentDetail />
  ) : (
    <TeacherDetail />
  );
}
