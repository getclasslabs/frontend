import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import "assets/scss/material-kit-react.scss?v=1.9.0";

import Routes from "routes";

import history from "services/history"

import { store, persistor } from 'store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Routes />
      </Router>
    </PersistGate>  
  </Provider>,
  document.getElementById("root")
);
