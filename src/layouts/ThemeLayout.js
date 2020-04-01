import React from "react"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ThemeLayoutComponent = Loadable(
  () => import("src/components/ThemeLayout/ThemeLayoutComponent"),
  {
    fallback: <IndefiniteLoading message="ThemeLayoutComponent" />,
  }
)

const ThemeLayout = ({ children }) => {
  return <ThemeLayoutComponent>{children}</ThemeLayoutComponent>
}

export default ThemeLayout
