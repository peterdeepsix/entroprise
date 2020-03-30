import React from "react"
import { AuthStore, ThemeStore } from "src/stores"

export const storesContext = React.createContext({
  authStore: new AuthStore(),
  themeStore: new ThemeStore(),
})
