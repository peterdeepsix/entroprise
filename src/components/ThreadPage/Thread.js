import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Thread = () => {
  const classes = useStyles()
  const theme = useTheme()

  return <Typography>Hello Thread</Typography>
}

export default Thread
