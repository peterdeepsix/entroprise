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

const AccountPageComponent = Loadable(
  () => import("src/components/AccountPage/AccountPageComponent"),
  {
    fallback: <IndefiniteLoading message="AccountPageComponent" />,
  }
)

const GraphPageComponent = Loadable(
  () => import("src/components/GraphPage/GraphPageComponent"),
  {
    fallback: <IndefiniteLoading message="GraphPageComponent" />,
  }
)

const TreePageComponent = Loadable(
  () => import("src/components/TreePage/TreePageComponent"),
  {
    fallback: <IndefiniteLoading message="TreePageComponent" />,
  }
)

const IndexPage = ({ location }) => {
  return (
    <InterfaceLayout location={location}>
      <SEOComponent title="App" />
      <Router>
        <SigninPageComponent path="/app/signin" />
        <PrivateRouteComponent path="/app" component={AppPageComponent} />
        <PrivateRouteComponent
          path="/app/graph"
          component={GraphPageComponent}
        />
        <PrivateRouteComponent path="/app/tree" component={TreePageComponent} />
        <PrivateRouteComponent
          path="/app/account"
          component={AccountPageComponent}
        />
      </Router>
    </InterfaceLayout>
  )
}
export default IndexPage
