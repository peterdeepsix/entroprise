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

const UsersList = () => {
  return <>asd</>
}
export default UsersList
