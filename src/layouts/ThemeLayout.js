import React, { useContext, useMemo } from "react"
import { inject } from "mobx-react"

import Loadable from "@loadable/component"

import { createMuiTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import IndefiniteLoading from "../components/loading/indefiniteLoading"

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
  }, [prefersDarkMode])

  useMemo(() => {
    const muiThemeObject = createMuiTheme(themeObject)

    themeStore.setThemeObject(themeObject)
    themeStore.setMuiThemeObject(muiThemeObject)
  }, [themeStore.themeObject])

  return <ThemeLayoutComponent>{children}</ThemeLayoutComponent>
}

export default inject("store")(ThemeLayout)
