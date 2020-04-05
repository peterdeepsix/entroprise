import React from "react"
import Loadable from "@loadable/component"

import { Box } from "@material-ui/core"

import IndefiniteLoading from "src/components/loading/indefiniteLoading"

const WebRTC = Loadable(() => import("./WebRTC"), {
  fallback: <IndefiniteLoading message="WebRTC" />,
})

const UsersPageComponent = ({ user }) => {
  return (
    <>
      <Box mt={2} mb={1}>
        <WebRTC user={user} />
      </Box>
    </>
  )
}
export default UsersPageComponent
