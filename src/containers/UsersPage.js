import React, { useState, useEffect } from "react"
import Loadable from "@loadable/component"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import Peer from "peerjs"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

import Badge from "@material-ui/core/Badge"
import Avatar from "@material-ui/core/Avatar"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import { makeStyles, withStyles } from "@material-ui/core/styles"

import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core"

const UsersPageComponent = Loadable(
  () => import("src/components/UsersPage/UsersPageComponent"),
  {
    fallback: <IndefiniteLoading message="UsersPage" />,
  }
)

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

const UsersPage = () => {
  const classes = useStyles()

  const [users] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const [user, loading, error] = useAuthState(firebase.auth())

  const [peer, setPeer] = useState(new Peer())

  useEffect(() => {
    if (user) setPeer(new Peer(user.uid))
  }, [user])

  const handleCall = uid => {
    console.log("try handle call", uid)
    const conn = peer.connect(uid)
    conn.on("open", () => {
      conn.send("hi!")
    })
  }

  peer.on("connection", conn => {
    conn.on("data", data => {
      console.log(data)
    })
    conn.on("open", () => {
      conn.send("hello!")
    })
  })

  return (
    <Container maxWidth="sm">
      {user && <UsersPageComponent uid={user.uid} />}
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="User List" />
          <CardContent>
            <List className={classes.root}>
              {error && <Typography>Error: {error.code}}</Typography>}
              {loading && <IndefiniteLoading message="UserList" />}
              {users && (
                <>
                  {users.docs.map(doc => {
                    const data = doc.data()
                    if (data.status) {
                      if (
                        data.displayName == null &&
                        data.status.state == "offline"
                      )
                        return
                    }
                    return (
                      <ListItem
                        disableGutters
                        key={doc.id}
                        onClick={() => {
                          handleCall(doc.id)
                        }}
                      >
                        {doc.data().status && (
                          <>
                            {(doc.data().status.state == "online" && (
                              <ListItemAvatar>
                                <StyledBadge
                                  overlap="circle"
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  variant="dot"
                                >
                                  <Avatar
                                    src={data.photoURL}
                                    alt={data.displayName}
                                  />
                                </StyledBadge>
                              </ListItemAvatar>
                            )) || (
                              <ListItemAvatar>
                                <Avatar
                                  src={data.photoURL}
                                  alt={data.displayName}
                                />
                              </ListItemAvatar>
                            )}
                          </>
                        )}
                        <ListItemText
                          primary={
                            (data.isAnonymous && "Anonymous User") ||
                            data.displayName
                          }
                          secondary={doc.id}
                        />
                      </ListItem>
                    )
                  })}
                </>
              )}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
export default UsersPage
