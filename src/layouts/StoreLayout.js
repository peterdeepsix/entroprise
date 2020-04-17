import React from "react"

import Provider from "src/models/Root"

const StoreLayout = ({ children }) => {
  return <Provider>{children}</Provider>
}

export default StoreLayout
