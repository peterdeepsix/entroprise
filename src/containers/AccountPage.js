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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
]

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const AccountPage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])
  const [user, loading, error] = useAuthState(firebase.auth())
  const [isOnline, setIsOnline] = useState(false)

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
    setPersonName(event.target.value)
  }

  const handleChangeMultiple = (event) => {
    const { options } = event.target
    const value = []
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setPersonName(value)
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
                        secondary={user.uid}
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
        <Box mt={2} mb={1}>
          <Card variant="outlined">
            <CardHeader title="User Links" />
            <CardContent>
              <FormControl className={classes.formControl}>
                <InputLabel id="chip-label">Linked Users</InputLabel>
                <Select
                  className={classes.select}
                  labelId="chip-label"
                  id="user-links"
                  multiple
                  value={personName}
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
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
