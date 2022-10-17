/* eslint-disable no-unused-vars */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

import Home from 'views/landingPage'
import SearchFlights from 'views/common/flight'
import SearchHotels from 'views/common/hotel'
import SearchPackages from 'views/common/package'
import Login from "views/auth/login"
import Signup from "views/auth/signup"
import NotFound from "views/common/404"
import Unauthorized from "views/common/401"
import Loading from "views/common/loading"

// core components
import Admin from "layouts/admin.js";
import Agency from "layouts/agency.js";
import Customer from "layouts/customer.js";

export const Router = () => {
  const accessToken = useSelector(({ user: { token } }) => token)
  // const test = useSelector((state) => state.user)
  const role = useSelector(({ user: { user: { systemRole } } }) => systemRole)
  // const role = "OWNER"

  // console.log(accessToken, role)

  return (
    <Switch>
      <PublicRoute
        exact={true}
        authenticated={accessToken}
        path="/"
        component={Home}
      />

      <PublicRoute
        exact={true}
        authenticated={accessToken}
        path="/search-flights"
        component={SearchFlights}
      />

      <PublicRoute
        exact={true}
        authenticated={accessToken}
        path="/search-hotels"
        component={SearchHotels}
      />

      <PublicRoute
        exact={true}
        authenticated={accessToken}
        path="/search-packages"
        component={SearchPackages}
      />

      <PublicRoute
        authenticated={accessToken}
        path="/login"
        component={Login}
      />

      <PublicRoute
        authenticated={accessToken}
        path="/signup"
        component={Signup}
      />

      <Route path="/401">
        <Unauthorized />
      </Route>

      {role === "SUPER_ADMIN" ? (
        <PrivateRoute
          exact={false}
          authenticated={accessToken}
          path="/admin"
          component={Admin}
        />
      ) : (role === "OWNER" || role === "ADMIN" || role === "AGENT") ? (
        <PrivateRoute
          exact={false}
          authenticated={accessToken}
          path="/agency"
          component={Agency}
        />
      ) : role === "CUSTOMER" ? (
        <PrivateRoute
          exact={false}
          authenticated={accessToken}
          path="/customer"
          component={Customer}
        />
      ) : null}

      {accessToken ? (
        role === "SUPER_ADMIN" ? (
          <Redirect from="/" to="/admin/dashboard" />
        ) : role === "OWNER" || role === "ADMIN" || role === "AGENT" ? (
          <Redirect from="/" to="/agency/dashboard" />
        ) : role === "CUSTOMER" ? (
          <Redirect from="/" to="/customer/dashboard" />
        ) : null
      ) : (
        <Redirect from="/" exact={true} to="/login" />
      )}

      <Route path="/loading">
        <Loading />
      </Route>

      <Route path="/404">
        <NotFound />
      </Route>

      {
        !accessToken || !role ? (
          <Route path="*" render={() => <Redirect to="/loading" />} />
        ) : (
          <Route path="*" render={() => <Redirect to="/404" />} />
        )
      }
    </Switch>
  )
}