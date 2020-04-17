import React from "react"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const UpperNavigation = Loadable(() => import("./UpperNavigation"), {
  fallback: <IndefiniteLoading message="Upper Navigation" />,
})

const LowerNavigation = Loadable(() => import("./LowerNavigation"), {
  fallback: <IndefiniteLoading message="Lower Navigation" />,
})

const NotificationsDialog = Loadable(() => import("./NotificationsDialog"), {
  fallback: <IndefiniteLoading message="Notifications Dialog" />,
})

const InterfaceLayoutComponent = ({ children, location }) => {
  return (
    <>
      <UpperNavigation />
      <LowerNavigation location={location} />
      {children}
      <NotificationsDialog />
    </>
  )
}

export default InterfaceLayoutComponent
