import React from "react"
import Loadable from "@loadable/component"

import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const D3Layout = Loadable(() => import("./D3Layout"), {
  fallback: <IndefiniteLoading message="D3Layout" />,
})

const GraphPageComponent = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Hierarchy Graph" />
          <CardContent>
            <D3Layout />
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
export default GraphPageComponent
