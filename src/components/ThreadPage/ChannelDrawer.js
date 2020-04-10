import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Button, SwipeableDrawer } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  dialogPaper: { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
}))

const ChannelDrawer = ({ handleClose, handleOpen, open, children }) => {
  const classes = useStyles()

  return (
    <SwipeableDrawer
      PaperProps={{ classes: { root: classes.dialogPaper } }}
      anchor="bottom"
      open={open}
      onClose={handleClose}
    >
      {children}
    </SwipeableDrawer>
  )
}

export default ChannelDrawer
