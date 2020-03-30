import React from "react"
import Loadable from "@loadable/component"

import SEOComponent from "src/components/SEOComponent/SEOComponent"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const InterfaceLayout = Loadable(() => import("src/layouts/InterfaceLayout"), {
  fallback: <IndefiniteLoading message="InterfaceLayout" />,
})

const IndexComponent = Loadable(
  () => import("src/components/IndexComponent/IndexComponent"),
  {
    fallback: <IndefiniteLoading message="IndexComponent" />,
  }
)

const IndexPage = ({ location }) => {
  return (
    <InterfaceLayout location={location}>
      <SEOComponent title="Index" />
      <IndexComponent />
    </InterfaceLayout>
  )
}
export default IndexPage
