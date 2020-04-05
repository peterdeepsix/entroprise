import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  video: { width: "100%" },
}))

const LocalTracks = ({ stream }) => {
  const classes = useStyles()

  return <>{console.log(stream)}</>
}
export default LocalTracks
