import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";

import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";

export default function Routes() {
  return (
    <Switch>
      <Route path="/profile" isPrivate exact component={ProfilePage} />
      <Route path="/components" component={Components} />

      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  );
}
