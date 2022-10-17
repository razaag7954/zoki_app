/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Router } from 'router'
import { store, persistor } from 'redux/store'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import CustomTheme from 'HOC/customTheme'

import "assets/css/material-dashboard-react.css?v=1.10.0";
import $ from 'jquery';
import Popper from 'popper.js';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

ReactDOM.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <CustomTheme>
          <Router />
        </CustomTheme>
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>,
  document.getElementById("root")
);
