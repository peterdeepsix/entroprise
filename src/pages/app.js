import React from "react"
import { Router } from "@reach/router"
import Loadable from "@loadable/component"

import SEOComponent from "src/components/SEOComponent/SEOComponent"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const InterfaceLayout = Loadable(() => import("src/layouts/InterfaceLayout"), {
  fallback: <IndefiniteLoading message="InterfaceLayout" />,
})

const PrivateRouteComponent = Loadable(
  () => import("src/components/privateRoute/privateRouteComponent"),
  {
    fallback: <IndefiniteLoading message="PrivateRouteComponent" />,
  }
)

const AppPageComponent = Loadable(
  () => import("src/components/appPage/AppPageComponent"),
  {
    fallback: <IndefiniteLoading message="AppPageComponent" />,
  }
)

const SigninPageComponent = Loadable(
  () => import("src/components/SigninPage/SigninPageComponent"),
  {
    fallback: <IndefiniteLoading message="SigninPageComponent" />,
  }
)

const TreePageComponent = Loadable(
  () => import("src/components/TreePage/TreePageComponent"),
  {
    fallback: <IndefiniteLoading message="TreePageComponent" />,
  }
)

const MapPage = Loadable(() => import("src/containers/MapPage"), {
  fallback: <IndefiniteLoading message="MapPage" />,
})

const AccountPage = Loadable(() => import("src/containers/AccountPage"), {
  fallback: <IndefiniteLoading message="AccountPage" />,
})

const TensorFlowPage = Loadable(() => import("src/containers/TensorFlowPage"), {
  fallback: <IndefiniteLoading message="TensorFlowPage" />,
})

const ServicePage = Loadable(() => import("src/containers/ServicePage"), {
  fallback: <IndefiniteLoading message="ServicePage" />,
})

const IndexPage = ({ location }) => {
  return (
    <InterfaceLayout location={location}>
      <SEOComponent title="App" />
      <Router>
        <AppPageComponent path="/app" />
        <SigninPageComponent path="/app/signin" />
        <AccountPage path="/app/account" />
        <MapPage path="/app/map" />
        <TensorFlowPage path="/app/tensorflow" />
        <TreePageComponent path="/app/tree" />
        <ServicePage path="/app/service" />
        {/* <PrivateRouteComponent path="/app" component={AppPageComponent} /> */}
      </Router>
    </InterfaceLayout>
  )
}
export default IndexPage
