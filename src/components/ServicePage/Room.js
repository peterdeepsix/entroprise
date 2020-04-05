import React, { useState, useEffect } from "react"
import Video from "twilio-video"
import Participant from "./Participant"

import { Box, Button, Card, CardHeader, CardContent } from "@material-ui/core"

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null)
  const [participants, setParticipants] = useState([])

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant])
    }

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      )
    }

    Video.connect(token, {
      name: roomName,
    }).then(room => {
      setRoom(room)
      room.on("participantConnected", participantConnected)
      room.on("participantDisconnected", participantDisconnected)
      room.participants.forEach(participantConnected)
    })

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function(
            trackPublication
          ) {
            trackPublication.track.stop()
          })
          currentRoom.disconnect()
          return null
        } else {
          return currentRoom
        }
      })
    }
  }, [roomName, token])

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ))

  return (
    <>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title={`Room: ${roomName}`} />
          <CardContent>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Exit Room
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Local Participant" />
          <CardContent>
            {room ? (
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
              />
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </Box>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Remote Participants" />
          <CardContent>{remoteParticipants}</CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Room
