import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

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

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar>
          <Button
            className={classes.button}
            startIcon={<CloseIcon />}
            variant="outlined"
            autoFocus
            color="inherit"
            onClick={handleClose}
          >
            Exit Thread
          </Button>
          <div className={classes.grow} />
          <Channel user={user} />
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  )
}

export default ThreadDialog
