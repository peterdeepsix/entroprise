import React, { useCallback, useEffect, useRef, useState } from "react"
import Video, { ConnectOptions, LocalTrack, Room } from "twilio-video"

import { makeStyles } from "@material-ui/core/styles"
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const RoomDialog = () => {
  const classes = useStyles()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const [roomName, setRoomName] = useState()
  const [isConnecting, setIsConnecting] = useState(false)
  const disconnectHandlerRef = useRef(null)
  const localTracksRef = []

  const handleClickOpen = () => {
    connect()
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const connect = useCallback(() => {
    setIsConnecting(true)
    return Video.connect(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2M4OGFlNWY2OWVjMTk4ODNmMTk5NzMwYmIxNGFmNjI5LTE1ODYxMDIzNjUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJPNGdqeTZRUXZSVGxEYWg2R2xiN1ZnMmZsY04yIiwidmlkZW8iOnsicm9vbSI6InBldGVyYXJub2xkIn19LCJpYXQiOjE1ODYxMDIzNjUsImV4cCI6MTU4NjExNjc2NSwiaXNzIjoiU0tjODhhZTVmNjllYzE5ODgzZjE5OTczMGJiMTRhZjYyOSIsInN1YiI6IkFDNzViY2ZiOWMwNjA3NzFkN2NlY2FlZDc5ODcxZDVmZjUifQ.866PdjfrItylxJkcioamUJRHnxPAkjQYaYGXwe3T0yY",
      { tracks: [] }
    ).then(
      newRoom => {
        setRoomName(newRoom.name)

        newRoom.once("disconnected", () => {
          setTimeout(() => setRoomName(null))
          window.removeEventListener(
            "beforeunload",
            disconnectHandlerRef.current
          )
        })

        window.twilioRoom = newRoom
        if (localTracksRef.current) {
          localTracksRef.current.forEach(track =>
            newRoom.localParticipant.publishTrack(track, {
              priority: track.kind === "video" ? "low" : "standard",
            })
          )
        }

        disconnectHandlerRef.current = () => newRoom.disconnect()
        window.addEventListener("beforeunload", disconnectHandlerRef.current)
        setIsConnecting(false)
        console.log('Connected to Room "%s"', newRoom.name)
      },
      error => {
        console.log(error)
        setIsConnecting(false)
      }
    )
  }, [])

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Room
      </Button>
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Room
            </Typography>
            <Button autoFocus color="inherit" onClick={handleDialogClose}>
              Close Room
            </Button>
          </Toolbar>
        </AppBar>
        asd
      </Dialog>
    </>
  )
}
export default RoomDialog
