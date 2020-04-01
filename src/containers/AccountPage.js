import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import Badge from "@material-ui/core/Badge"
import Avatar from "@material-ui/core/Avatar"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import { makeStyles, withStyles } from "@material-ui/core/styles"

import { observer } from "mobx-react"
import { useStore } from "mobx-store-provider"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useObjectVal } from "react-firebase-hooks/database"

import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core"

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge)

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
}))

const AccountPage = () => {
  const classes = useStyles()
  const [user, loading, error] = useAuthState(firebase.auth())
  const [isOnline, setIsOnline] = useState(false)

  const db = firebase.firestore()
  const usersRef = db.collection("users")

  useEffect(() => {
    if (user) {
      firebase
        .database()
        .ref("/status/" + user.uid)
        .on("value", snapshot => {
          const state = snapshot.val()
          console.log("state")
          console.log(state)
          if (state == "online") {
            setIsOnline(true)
          } else {
            setIsOnline(false)
          }
        })
      console.log("DATA RETRIEVED")
      console.log(isOnline)
    }
  }, [user])

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
  provider.addScope("https://www.googleapis.com/auth/calendar")

  const signInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        usersRef.doc(result.user.uid).set(
          {
            displayName: result.user.displayName,
            email: result.user.email,
            emailVerified: result.user.emailVerified,
            isAnonymous: result.user.isAnonymous,
            phoneNumber: result.user.phoneNumber,
            photoURL: result.user.photoURL,
            providerId: result.user.providerId,
            refreshToken: result.user.refreshToken,
            uid: result.user.uid,
            online: true,
          },
          { merge: true }
        )
      })
      .catch(error => {})
  }

  const upgradeAccountWithGoogle = () => {
    user
      .linkWithPopup(provider)
      .then(result => {
        user
          .reauthenticateWithCredential(result.credential)
          .then(result => {})
          .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            if (errorCode === "auth/account-exists-with-different-credential") {
              alert(errorMessage)
            } else {
            }
          })
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === "auth/credential-already-in-use") {
          firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
              usersRef.doc(result.user.uid).set(
                {
                  displayName: result.user.displayName,
                  email: result.user.email,
                  emailVerified: result.user.emailVerified,
                  isAnonymous: result.user.isAnonymous,
                  phoneNumber: result.user.phoneNumber,
                  photoURL: result.user.photoURL,
                  providerId: result.user.providerId,
                  refreshToken: result.user.refreshToken,
                  uid: result.user.uid,
                  online: true,
                },
                { merge: true }
              )
            })
            .catch(function(error) {})
        } else {
        }
      })
  }

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then()
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
                  <List className={classes.root}>
                    <ListItem divider disableGutters>
                      {console.log(isOnline)}
                      {(isOnline == true && (
                        <ListItemAvatar>
                          <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                          >
                            <Avatar alt={"A"} />
                          </StyledBadge>
                        </ListItemAvatar>
                      )) || (
                        <ListItemAvatar>
                          <Avatar alt={"A"} />
                        </ListItemAvatar>
                      )}
                      <ListItemText
                        primary={"Anonymous User"}
                        secondary="Sign In To Upgrade"
                      />
                    </ListItem>
                    <ListItem divider disableGutters>
                      <ListItemText
                        primary="User Alias"
                        secondary="Steve Addington"
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText primary="User ID" secondary={user.uid} />
                    </ListItem>
                  </List>
                </>
              )) || (
                <>
                  <List className={classes.root} disablePadding>
                    <ListItem divider disableGutters>
                      {(isOnline == true && (
                        <ListItemAvatar>
                          <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                          >
                            <Avatar alt={"A"} />
                          </StyledBadge>
                        </ListItemAvatar>
                      )) || (
                        <ListItemAvatar>
                          <Avatar alt={"A"} />
                        </ListItemAvatar>
                      )}
                      <ListItemText
                        primary={user.providerData[0].displayName}
                        secondary={user.providerData[0].email}
                      />
                    </ListItem>
                    <ListItem divider disableGutters>
                      <ListItemText
                        primary="Account Provider"
                        secondary={user.providerData[0].providerId}
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText primary="UID" secondary={user.uid} />
                    </ListItem>
                  </List>
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
                <>
                  <Box mt={2} mb={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={signInWithGoogle}
                    >
                      Sign In With Google
                    </Button>
                  </Box>
                  <Box mt={2} mb={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={upgradeAccountWithGoogle}
                    >
                      Link Account With Google
                    </Button>
                  </Box>
                </>
              )}
              {!user.isAnonymous && (
                <Box mt={2} mb={1}>
                  <Button variant="outlined" color="primary" onClick={signOut}>
                    Sign Out
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    )
  return null
}
export default AccountPage
