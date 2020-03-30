import React from "react"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

const PrivateRouteComponent = ({ component: Component, location, ...rest }) => {
  const [user] = useAuthState(firebase.auth())

  if (!user) {
    navigate("/app/signin")
    return null
  }
  return <Component {...rest} />
}
export default PrivateRouteComponent
