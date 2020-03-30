import React from "react"
import { Helmet } from "react-helmet"

import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"

const ThemeLayoutComponent = ({ children }) => {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <ThemeProvider>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default ThemeLayoutComponent
