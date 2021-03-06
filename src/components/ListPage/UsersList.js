import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"

import {
  Badge,
  Avatar,
  Card,
  List,
  CardHeader,
  CardContent,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import { makeStyles, withStyles } from "@material-ui/core/styles"

import LinkComponent from "src/components/LinkComponent/LinkComponent"

const StyledBadge = withStyles((theme) => ({
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}))

const UsersList = () => {
  const classes = useStyles()

  const [users] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const handleClickUser = () => {
    console.log("clicked user")
  }

  return (
    <Card variant="outlined">
      <CardHeader title="User List" />

      {(users && (
        <List className={classes.root}>
          {users.docs.map((doc) => {
            const data = doc.data()
            if (data.status) {
              if (data.displayName == null && data.status.state == "offline")
                return
            }
            return (
              <ListItem
                component={LinkComponent}
                button
                to={`/app/thread/${data.uid}`}
                key={doc.id}
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
                          <Avatar src={data.photoURL} alt={data.displayName} />
                        </StyledBadge>
                      </ListItemAvatar>
                    )) || (
                      <ListItemAvatar>
                        <Avatar src={data.photoURL} alt={data.displayName} />
                      </ListItemAvatar>
                    )}
                  </>
                )}
                <ListItemText
                  primary={
                    (data.isAnonymous && "Anonymous User") || data.displayName
                  }
                  secondary={doc.id}
                />
              </ListItem>
            )
          })}
        </List>
      )) || (
        <CardContent>
          <Skeleton variant="text" />
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="rect" width={210} height={118} />
        </CardContent>
      )}
    </Card>
  )
}
export default UsersList
