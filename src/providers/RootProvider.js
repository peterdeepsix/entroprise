import React from "react"
import { Provider } from "mobx-react"
import Loadable from "@loadable/component"

import Store from "src/stores/rootStore"

import IndefiniteLoading from "src/components/loading/indefiniteLoading"

const ThemeLayout = Loadable(() => import("src/layouts/ThemeLayout"), {
  fallback: <IndefiniteLoading message="ThemeLayout" />,
})

const RootProvider = ({ element }) => {
  return (
    <Provider store={Store}>
      <ThemeLayout>{element}</ThemeLayout>
    </Provider>
  )
}

export default RootProvider
