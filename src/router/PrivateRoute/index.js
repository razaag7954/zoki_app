import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import { permissionGranted } from 'App/Services'

export const PrivateRoute = ({
  component: Component,
  authenticated,
  // permission,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          // permissionGranted(permission) ? (
          <Component {...props} />
        ) : (
          //     <Redirect
          //       to={{ pathname: `/404`, state: { from: props.location } }}
          //     />
          //   )
          // ) : (
          <Redirect
            to={{ pathname: `/401`, state: { from: props.location } }}
          />
        )
      }
    />
  )
}
