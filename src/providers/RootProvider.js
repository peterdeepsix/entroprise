import React from "react"

import Loadable from "@loadable/component"

import StoreLayout from "src/layouts/StoreLayout"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const AuthLayout = Loadable(() => import("src/layouts/AuthLayout"), {
  fallback: <IndefiniteLoading message="Authentication" />,
})

const ThemeLayout = Loadable(() => import("src/layouts/ThemeLayout"), {
  fallback: <IndefiniteLoading message="Theme" />,
})

const RemoteConfigLayout = Loadable(
  () => import("src/layouts/RemoteConfigLayout"),
  {
    fallback: <IndefiniteLoading message="RemoteConfig" />,
  }
)

const AnalyticsLayout = Loadable(() => import("src/layouts/AnalyticsLayout"), {
  fallback: <IndefiniteLoading message="Analytics" />,
})

const RootProvider = ({ element }) => {
  return (
    <StoreLayout>
      <AuthLayout>
        <RemoteConfigLayout>
          <AnalyticsLayout>
            <ThemeLayout>{element}</ThemeLayout>
          </AnalyticsLayout>
        </RemoteConfigLayout>
      </AuthLayout>
    </StoreLayout>
  )
}

export default RootProvider
