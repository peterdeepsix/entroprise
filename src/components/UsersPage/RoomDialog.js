import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import {
  Container,
  Typography,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const RoomDialog = ({ open, handleClose, children }) => {
  const classes = useStyles()

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} color="inherit">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Web RTC
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Container className={classes.root} maxWidth="sm" disableGutters>
          {children}
        </Container>
      </Dialog>
    </>
  )
}

export default RoomDialog
