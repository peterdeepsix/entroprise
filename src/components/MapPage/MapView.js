import React from "react"

import { usePosition } from "use-position"

import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const MapView = ({ user }) => {
  const classes = useStyles()
  const { latitude, longitude, timestamp, accuracy, error } = usePosition(
    true,
    { enableHighAccuracy: true }
  )

  return (
    <>
      <Typography>Location Data: {user.displayName}</Typography>
      <Typography>Latitude: {latitude}</Typography>
      <Typography>Longitude: {longitude}</Typography>
      <Typography>Accuracy: {accuracy}</Typography>
      <Typography>Timestamp: {timestamp}</Typography>
    </>
  )
}
export default MapView
