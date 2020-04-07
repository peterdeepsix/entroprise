import React from "react"
import Loadable from "@loadable/component"

import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const List = Loadable(() => import("./List"), {
  fallback: <IndefiniteLoading message="List" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ListPageComponent = ({ user }) => {
  const classes = useStyles()

  return (
    <Box mt={2} mb={10}>
      <List />
    </Box>
  )
}
export default ListPageComponent
