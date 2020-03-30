import React from "react"

import Loadable from "@loadable/component"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const InterfaceLayoutComponent = Loadable(
  () => import("src/components/InterfaceLayout/InterfaceLayoutComponent"),
  {
    fallback: <IndefiniteLoading message="InterfaceLayoutComponent" />,
  }
)

const InterfaceLayout = ({ children, location }) => {
  return (
    <InterfaceLayoutComponent location={location}>
      {children}
    </InterfaceLayoutComponent>
  )
}

export default InterfaceLayout
