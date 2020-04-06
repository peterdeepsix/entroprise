import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"

import { Typography } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Channel = ({ handleClickUser }) => {
  const classes = useStyles()

  const [users] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  return (
    <>
      <Typography>Channel</Typography>
    </>
  )
}
export default Channel
