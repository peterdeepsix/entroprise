import React from "react"
import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const UpperNavigation = Loadable(() => import("./UpperNavigation"), {
  fallback: <IndefiniteLoading message="UpperNavigation" />,
})

const LowerNavigation = Loadable(() => import("./LowerNavigation"), {
  fallback: <IndefiniteLoading message="LowerNavigation" />,
})

const InterfaceLayoutComponent = ({ children, location }) => {
  return (
    <>
      <UpperNavigation />
      <LowerNavigation location={location} />
      {children}
    </>
  )
}

export default InterfaceLayoutComponent
