import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

import Routes from "routes";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Routes />
  </Router>,
  document.getElementById("root")
);
