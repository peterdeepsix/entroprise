import React from "react"
import Peer from "peerjs"
import Loadable from "@loadable/component"

import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core"

import IndefiniteLoading from "src/components/loading/indefiniteLoading"

const WebRTC = Loadable(() => import("./WebRTC"), {
  fallback: <IndefiniteLoading message="WebRTC" />,
})

const UsersPageComponent = ({ uid }) => {
  const peer = new Peer(uid)

  peer.on("connection", conn => {
    conn.on("data", data => {
      console.log(data)
    })
    conn.on("open", () => {
      conn.send("hello!")
    })
  })
  return (
    <Box mt={2} mb={1}>
      <Card variant="outlined">
        <CardHeader title="Users Page" />
        <CardContent>
          <WebRTC uid={uid} />
        </CardContent>
      </Card>
    </Box>
  )
}
export default UsersPageComponent
