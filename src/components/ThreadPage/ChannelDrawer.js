import React, { useState } from "react"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import { useMediaQuery, Container, SwipeableDrawer } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  dialogPaper: { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
}))

const ChannelDrawer = ({ handleClose, handleOpen, open, children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <SwipeableDrawer
      PaperProps={{ classes: { root: classes.dialogPaper } }}
      anchor="bottom"
      BackdropProps={{ invisible: true }}
      open={open}
      onClose={handleClose}
    >
      {children}
    </SwipeableDrawer>
  )
}

export default ChannelDrawer
