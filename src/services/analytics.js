import firebase from "gatsby-plugin-firebase"

const analytics = firebase.analytics()

export const login = () => {
  return analytics.logEvent("login")
}
