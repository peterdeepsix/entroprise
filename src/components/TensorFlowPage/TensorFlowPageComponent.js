import React from "react"
import Loadable from "@loadable/component"

import { Box } from "@material-ui/core"

import IndefiniteLoading from "src/components/loading/indefiniteLoading"

const TensorFlow = Loadable(() => import("./TensorFlow"), {
  fallback: <IndefiniteLoading message="TensorFlow" />,
})

const UsersPageComponent = ({ user }) => {
  return (
    <>
      <Box mt={2} mb={1}>
        <TensorFlow user={user} />
      </Box>
    </>
  )
}
export default UsersPageComponent
