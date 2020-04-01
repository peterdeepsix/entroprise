import React from "react"

import Loadable from "@loadable/component"

import StoreLayout from "src/layouts/StoreLayout"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const AuthLayout = Loadable(() => import("src/layouts/AuthLayout"), {
  fallback: <IndefiniteLoading message="AuthLayout" />,
})

const ThemeLayout = Loadable(() => import("src/layouts/ThemeLayout"), {
  fallback: <IndefiniteLoading message="ThemeLayout" />,
})

const RootProvider = ({ element }) => {
  return (
    <StoreLayout>
      <AuthLayout>
        <ThemeLayout>{element}</ThemeLayout>
      </AuthLayout>
    </StoreLayout>
  )
}

export default RootProvider
