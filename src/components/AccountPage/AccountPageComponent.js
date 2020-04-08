import React, { useState, useEffect } from "react"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Input,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  FormControl,
  Checkbox,
} from "@material-ui/core"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection, useDocument } from "react-firebase-hooks/firestore"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  select: {},
  formControl: {
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const AccountPageComponent = ({ user }) => {
  const classes = useStyles()
  const [linkedUsers, setLinkedUsers] = useState([])

  const [users] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const [
    userFirestoreValue,
    userFirestoreValueLoading,
    userFirestoreValueError,
  ] = useDocument(firebase.firestore().doc(`users/${user.uid}/`), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  useEffect(() => {
    if (userFirestoreValue && userFirestoreValue.data().linkedUsers)
      setLinkedUsers(userFirestoreValue.data().linkedUsers)
  }, [userFirestoreValue])

  const firestoreRef = firebase.firestore()

  const db = firebase.firestore()
  const usersRef = db.collection("users")

  const provider = new firebase.auth.GoogleAuthProvider()
  // provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
  // provider.addScope("https://www.googleapis.com/auth/calendar")

  const signInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        usersRef
          .doc(user.uid)
          .delete()
          .then(() => {
            console.log("User successfully deleted!")
          })
          .catch((error) => {
            console.error("Error removing User: ", error)
          })
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
            status: {
              state: "online",
              last_changed: firebase.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
      })
  }

  const signOut = () => {
    const userToDelete = user.uid
    if (usersRef.isAnonymous) {
      usersRef
        .doc(userToDelete)
        .delete()
        .then(() => {
          console.log("User successfully deleted!")
          firebase.auth().signOut().then()
        })
        .catch((error) => {
          console.error("Error removing User: ", error)
        })
    } else {
      usersRef
        .doc(user.uid)
        .set(
          {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            providerId: user.providerId,
            refreshToken: user.refreshToken,
            uid: user.uid,
            status: {
              state: "offline",
              last_changed: firebase.firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        )
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
        })
        .then(firebase.auth().signOut().then())
    }
  }

  const handleChange = (event) => {
    const firestoreUserRef = firestoreRef.doc(`users/${user.uid}/`)
    setLinkedUsers(event.target.value)
    firestoreUserRef
      .set(
        {
          linkedUsers: event.target.value,
        },
        { merge: true }
      )
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
      })
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
                      <ListItemText
                        primary={"Anonymous User"}
                        secondary="Sign In To Upgrade"
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
                    <ListItem button divider disableGutters>
                      <ListItemText
                        primary="Something Else"
                        secondary="use this later"
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="else">
                          <EditOutlinedIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
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
        <Box mt={3} mb={1}>
          <Card variant="outlined">
            <CardHeader title="User Links" />
            <CardContent>
              {users && (
                <FormControl className={classes.formControl}>
                  <InputLabel id="chip-label">Linked Users</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="chip-label"
                    id="user-links"
                    multiple
                    value={linkedUsers}
                    onChange={handleChange}
                    input={<Input id="select-user-links" />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {users.docs.map((doc) => {
                      const data = doc.data()
                      if (data.isAnonymous == false)
                        return (
                          <MenuItem key={data.uid} value={data.displayName}>
                            <Checkbox
                              checked={
                                linkedUsers.indexOf(data.displayName) > -1
                              }
                            />
                            <ListItemText
                              primary={data.displayName}
                              secondary={data.email}
                            />
                          </MenuItem>
                        )
                    })}
                  </Select>
                </FormControl>
              )}
            </CardContent>
          </Card>
        </Box>
        <Box mt={3} mb={10}>
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
export default AccountPageComponent
