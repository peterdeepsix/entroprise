import React from "react"
import Loadable from "@loadable/component"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"

import { Card, CardHeader, CardContent } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Channel = Loadable(() => import("./Channel"), {
  fallback: <IndefiniteLoading message="Channel" />,
})

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}))

const Channels = () => {
  const classes = useStyles()

  const [users] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  return (
    <Card variant="outlined">
      <CardHeader title="Channels" />
      <CardContent>
        <Channel />
      </CardContent>
    </Card>
  )
}
export default Channels
