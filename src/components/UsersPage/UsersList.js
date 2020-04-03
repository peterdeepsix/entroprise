import React, { useState, useEffect } from "react"
import Loadable from "@loadable/component"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

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

const UsersList = ({ callUser }) => {
  const classes = useStyles()

  const [users] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  return (
    <Card variant="outlined">
      <CardHeader title="User List" />
      <CardContent>
        <List className={classes.root}>
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
                      callUser(doc)
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
  )
}
export default UsersList
