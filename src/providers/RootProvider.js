import React from "react"
import Loadable from "@loadable/component"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ThemeLayout = Loadable(() => import("src/layouts/ThemeLayout"), {
  fallback: <IndefiniteLoading message="ThemeLayout" />,
})

const AuthLayout = Loadable(() => import("src/layouts/AuthLayout"), {
  fallback: <IndefiniteLoading message="AuthLayout" />,
})

const RootProvider = ({ element }) => {
  return (
    <>
      <AuthLayout>
        <ThemeLayout>{element}</ThemeLayout>
      </AuthLayout>
    </>
  )
}

export default RootProvider
