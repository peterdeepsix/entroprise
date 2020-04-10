import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Button, SwipeableDrawer } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  drawer: {
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
  },
}))

const ChannelDrawer = ({ handleClose, handleOpen, open, children }) => {
  const classes = useStyles()

  return (
    <SwipeableDrawer
      className={classes.drawer}
      anchor="bottom"
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      {children}
    </SwipeableDrawer>
  )
}

export default ChannelDrawer
