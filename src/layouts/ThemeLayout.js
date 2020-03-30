import React, { useMemo } from "react"
import { inject, observer } from "mobx-react"

import Loadable from "@loadable/component"

import { createMuiTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ThemeLayoutComponent = Loadable(
  () => import("src/components/ThemeLayout/ThemeLayoutComponent"),
  {
    fallback: <IndefiniteLoading message="ThemeLayoutComponent" />,
  }
)

const ThemeLayout = ({ children, store }) => {
  const { themeStore } = store
  const { themeObject } = themeStore

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  useMemo(() => {
    themeStore.getThemeObject()
    themeStore.getMuiThemeObject()
    themeStore.getPrefersDarkMode()
  }, [themeStore])

  useMemo(() => {
    themeStore.setPrefersDarkMode(prefersDarkMode)
  }, [prefersDarkMode, themeStore])

  useMemo(() => {
    const muiThemeObject = createMuiTheme(themeObject)

    themeStore.setThemeObject(themeObject)
    themeStore.setMuiThemeObject(muiThemeObject)
  }, [themeObject, themeStore])

  return <ThemeLayoutComponent>{children}</ThemeLayoutComponent>
}

export default inject("store")(observer(ThemeLayout))
