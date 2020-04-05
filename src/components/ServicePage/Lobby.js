import React from "react"

import {
  Box,
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core"

const Lobby = ({ roomName, handleRoomNameChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Connect To A Room" />
          <CardContent>
            <TextField
              type="text"
              id="room"
              label="Room Name"
              value={roomName}
              onChange={handleRoomNameChange}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              Connect To Room
            </Button>
          </CardContent>
        </Card>
      </Box>
    </form>
  )
}

export default Lobby
