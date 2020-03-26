import React from "react"
import { inject, observer } from "mobx-react"
import { Helmet } from "react-helmet"

import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"

const ThemeLayoutComponent = ({ store, children }) => {
  const { themeStore } = store
  const { muiThemeObject } = themeStore

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <ThemeProvider theme={muiThemeObject}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default inject("store")(observer(ThemeLayoutComponent))
