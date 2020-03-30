import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core"

const AccountPageComponent = () => {
  const [user, loading, error] = useAuthState(firebase.auth())

  const token = user.getIdTokenResult()
  console.log(token)

  const convertToGoogle = () => {
    console.log(token)
    const credential = firebase.auth.GoogleAuthProvider.credential(token)
    console.log(credential)

    return user
      .linkWithCredential(credential)
      .then(function(usercred) {
        console.log("Anonymous account successfully upgraded", usercred.user)
      })
      .catch(function(error) {
        console.log("Error upgrading anonymous account", error)
      })
  }

  const signOut = () => {
    firebase.auth().signOut()
  }

  if (user)
    return (
      <Container maxWidth="sm">
        <Box mt={2} mb={1}>
          <Card variant="outlined">
            <CardHeader title="Account Details" />
            <CardContent>
              {(user.isAnonymous && (
                <>
                  <Typography>Account Provider: Anonymous</Typography>
                  <Typography>UID: {user.uid}</Typography>
                </>
              )) || (
                <>
                  <Typography>Account Provider: Google</Typography>
                  <Typography>Display Name: {user.displayName}</Typography>
                  <Typography>UID: {user.uid}</Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
        <Box mt={2} mb={1}>
          <Card variant="outlined">
            <CardHeader title="Account Actions" />
            <CardContent>
              {user.isAnonymous && (
                <Box mt={2} mb={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={convertToGoogle}
                  >
                    Link To Google Account
                  </Button>
                </Box>
              )}
              <Box mt={2} mb={1}>
                <Button variant="outlined" color="primary" onClick={signOut}>
                  Sign Out
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    )
  return null
}
export default AccountPageComponent
