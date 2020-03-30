import React from "react"
import { Provider } from "mobx-react"
import Loadable from "@loadable/component"

import Store from "src/stores/rootStore"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ThemeLayout = Loadable(() => import("src/layouts/ThemeLayout"), {
  fallback: <IndefiniteLoading message="ThemeLayout" />,
})

const AuthLayout = Loadable(() => import("src/layouts/AuthLayout"), {
  fallback: <IndefiniteLoading message="AuthLayout" />,
})

const RootProvider = ({ element }) => {
  return (
    <Provider store={Store}>
      <AuthLayout>
        <ThemeLayout>{element}</ThemeLayout>
      </AuthLayout>
    </Provider>
  )
}

export default RootProvider
