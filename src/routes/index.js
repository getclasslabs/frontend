import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import HomePage from "views/HomePage/HomePage.js";
import ResultsPage from "views/ResultsPage/ResultsPage.js";

import CoursesPage from "views/CoursesPage/CoursesPage.js";
import CoursesDetail from "views/CoursesPage/CoursesDetail.js";
import CoursesNew from "views/CoursesPage/CoursesNew.js";
import CoursesEdit from "views/CoursesPage/CoursesEdit.js";
import CoursesView from "views/CoursesPage/CoursesView.js";

import ProfilePage from "views/ProfilePage/ProfilePage.js";
import VisitorPage from "views/ProfilePage/VisitorPage.js";
import ProfileEdit from "views/ProfilePage/ProfileEdit.js";

import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";

export default function Routes() {
  return (
    <Switch>
      <Route path="/home" isPrivate exact component={HomePage} />
      <Route path="/results" isPrivate exact component={ResultsPage} />
      <Route path="/me/:nickname" isPrivate exact component={ProfilePage} />
      <Route path="/profile/edit" isPrivate exact component={ProfileEdit} />
      <Route
        path="/profile/:nickname"
        isPrivate
        exact
        component={VisitorPage}
      />

      <Route path="/courses" isPrivate exact component={CoursesPage} />
      <Route
        path="/courses/detail/:course_id"
        isPrivate
        component={CoursesDetail}
      />
      <Route
        path="/courses/edit/:course_id"
        isPrivate
        component={CoursesEdit}
      />
      <Route path="/courses/new" isPrivate exact component={CoursesNew} />
      <Route path="/courses/view" isPrivate exact component={CoursesView} />

      <Route path="/components" component={Components} />

      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  );
}
