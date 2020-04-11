import React from "react"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import {
  useMediaQuery,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  IconButton,
} from "@material-ui/core"
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"
const Channel = Loadable(() => import("./Channel"), {
  fallback: <IndefiniteLoading message="Channel" />,
})

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "absolute",
    background: "transparent",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    // color: theme.palette.text.primary,
    // backgroundColor: "rgba(255, 255, 255, 0.54)",
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ThreadDialog = ({ user, handleClose, open, children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="back"
          >
            <ArrowBackOutlinedIcon />
          </IconButton>
          <div className={classes.grow} />
          <Channel closeThread={handleClose} user={user} />
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  )
}

export default ThreadDialog
