import React, { useEffect, useRef, useState } from "react"
import { Provider } from "react-dims"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection, useDocument } from "react-firebase-hooks/firestore"

import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  Button,
  IconButton,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import CallEndOutlinedIcon from "@material-ui/icons/CallEndOutlined"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Tree = Loadable(() => import("./Tree"), {
  fallback: <IndefiniteLoading message="Tree" />,
})

const useStyles = makeStyles((theme) => ({
  root: { height: "100vh" },
}))

const TreePageComponent = () => {
  const classes = useStyles()
  const [users, userLoading, usersError] = useCollection(
    firebase.firestore().collection("users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const [usersDocs, setUsersDocs] = useState([])

  useEffect(() => {
    if (users) {
      const tempUsersDocs = users.docs.filter(
        (doc) => doc.data().isAnonymous == false
      )
      setUsersDocs(tempUsersDocs)
    }
  }, [users])

  return (
    <Box className={classes.root}>
      <Provider>
        {userLoading && <IndefiniteLoading message="Users" />}
        {usersError && <Typography>{usersError}</Typography>}
        {users && <Tree usersDocs={usersDocs} />}
      </Provider>
    </Box>
  )
}
export default TreePageComponent
