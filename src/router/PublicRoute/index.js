import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Redirect
            to={{ pathname: `/dashboard`, state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}
