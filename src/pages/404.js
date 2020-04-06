import React from "react"
import Loadable from "@loadable/component"

import { Typography, Container } from "@material-ui/core"

import SEOComponent from "src/components/SEOComponent/SEOComponent"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const InterfaceLayout = Loadable(() => import("src/layouts/InterfaceLayout"), {
  fallback: <IndefiniteLoading message="InterfaceLayout" />,
})

const ForOhFour = ({ location }) => {
  return (
    <InterfaceLayout location={location}>
      <SEOComponent title="Index" />
      <Container maxWidth="sm">
        <Typography variant="h4">For Oh Four</Typography>
      </Container>
    </InterfaceLayout>
  )
}
export default ForOhFour
