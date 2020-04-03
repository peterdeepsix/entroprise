import React from "react"
import Peer from "peerjs"
import Loadable from "@loadable/component"

import { Box } from "@material-ui/core"

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
    <>
      <Box mt={2} mb={1}>
        <WebRTC uid={uid} />
      </Box>
    </>
  )
}
export default UsersPageComponent
