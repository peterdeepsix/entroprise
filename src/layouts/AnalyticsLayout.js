import React, { useMemo } from "react"
import { login } from "src/services/analytics"

const AnalyticsLayout = ({ children }) => {
  useMemo(() => {
    login()
    console.log("AnalyticsLayout: login")
  }, [])

  return <>{children}</>
}

export default AnalyticsLayout
