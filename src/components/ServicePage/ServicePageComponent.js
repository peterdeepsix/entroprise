import React from "react"
import Loadable from "@loadable/component"

import { makeStyles } from "@material-ui/core/styles"
import { Container, Box } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Channels = Loadable(() => import("./Channels"), {
  fallback: <IndefiniteLoading message="Channels" />,
})

const VideoChat = Loadable(() => import("./VideoChat"), {
  fallback: <IndefiniteLoading message="VideoChat" />,
})

const UsersList = Loadable(() => import("./UsersList"), {
  fallback: <IndefiniteLoading message="UsersList" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ServicePageComponent = ({ user }) => {
  const classes = useStyles()

  return (
    <Box mt={2} mb={10}>
      <Channels user={user} />
      <Container maxWidth="sm">
        <VideoChat user={user} />
        <Box mt={3}>
          <UsersList />
        </Box>
      </Container>
    </Box>
  )
}
export default ServicePageComponent
