import React, { useMemo } from "react"
import { Observer } from "mobx-react"
import firebase from "gatsby-plugin-firebase"

import Loadable from "@loadable/component"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const AuthLayoutComponent = Loadable(
  () => import("src/components/AuthLayout/AuthLayoutComponent"),
  {
    fallback: <IndefiniteLoading message="AuthLayoutComponent" />,
  }
)

const AuthLayout = ({ children }) => {
  useMemo(() => {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
      })
  }, [])

  return (
    <Observer>
      {() => <AuthLayoutComponent>{children}</AuthLayoutComponent>}
    </Observer>
  )
}

export default AuthLayout
