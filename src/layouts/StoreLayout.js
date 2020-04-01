import React from "react"
import { useProvider, createStore } from "mobx-store-provider"

import firebase from "gatsby-plugin-firebase"

import AppStore from "src/models/AppStore"

const StoreLayout = ({ children }) => {
  const appStore = createStore(() =>
    AppStore.create({ user: "Peter", userToken: "" })
  )
  const Provider = useProvider()

  return <Provider value={appStore}>{children}</Provider>
}

export default StoreLayout
