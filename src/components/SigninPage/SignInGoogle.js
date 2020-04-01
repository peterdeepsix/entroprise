import React from "react"
import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"
import { navigate } from "gatsby"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { Typography } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const SignInGoogle = () => {
  const [user, loading, error] = useAuthState(firebase.auth())

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
  return <Typography>Sign In Page</Typography>
}

export default observer(SignInGoogle)
