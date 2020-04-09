import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Channel = () => {
  const classes = useStyles()
  const theme = useTheme()

  return <Typography>Hello Channel</Typography>
}

export default Channel
