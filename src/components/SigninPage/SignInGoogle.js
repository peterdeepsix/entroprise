import React from "react"
import { navigate } from "gatsby"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { Button, Typography } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const SignInGoogle = () => {
  const [user, loading, error] = useAuthState(firebase.auth())
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  const signIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
  }

  if (loading) {
    return <IndefiniteLoading message="User" />
  }
  if (error) {
    return (
      <>
        <Typography>Error: {error}</Typography>
      </>
    )
  }
  if (user) {
    navigate(`/app`)
  }
  return (
    <Button color="primary" variant="contained" onClick={signIn}>
      Sign In With Google
    </Button>
  )
}

export default SignInGoogle
