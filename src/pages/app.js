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

const AccountPage = Loadable(() => import("src/containers/AccountPage"), {
  fallback: <IndefiniteLoading message="AccountPage" />,
})

const UsersPage = Loadable(() => import("src/containers/UsersPage"), {
  fallback: <IndefiniteLoading message="UsersPage" />,
})

const ChatPageComponent = Loadable(() => import("src/containers/ChatPage"), {
  fallback: <IndefiniteLoading message="ChatPageComponent" />,
})

const IndexPage = ({ location }) => {
  return (
    <InterfaceLayout location={location}>
      <SEOComponent title="App" />
      <Router>
        <AppPageComponent path="/app" />
        <SigninPageComponent path="/app/signin" />
        <UsersPage path="/app/users" />
        <AccountPage path="/app/account" />
        <TreePageComponent path="/app/tree" />
        <ChatPageComponent path="/app/chat" />
        {/* <PrivateRouteComponent path="/app" component={AppPageComponent} /> */}
        {/* <PrivateRouteComponent
          path="/app/graph"
          component={GraphPageComponent}
        /> */}
        {/* <PrivateRouteComponent path="/app/tree" component={TreePageComponent} /> */}
        {/* <PrivateRouteComponent path="/app/account" component={AccountPage} /> */}
      </Router>
    </InterfaceLayout>
  )
}
export default IndexPage
