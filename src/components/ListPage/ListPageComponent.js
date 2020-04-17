import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"

import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"
const UsersList = Loadable(() => import("./UsersList"), {
  fallback: <IndefiniteLoading message="UsersList" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ListPageComponent = ({ user }) => {
  const classes = useStyles()

  const [users, usersLoading, usersError] = useCollection(
    firebase.firestore().collection("users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return (
    <Box mt={3} mb={10}>
      <UsersList />
    </Box>
  )
}
export default ListPageComponent
