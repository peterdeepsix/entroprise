import React, { useState, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { fetchAndActivate } from "src/services/remoteConfig"

const RemoteConfigLayout = ({ children }) => {
  const [currentConfig, setCurrentConfig] = useState(null)

  useMemo(async () => {
    const newConfig = await fetchAndActivate()
    setCurrentConfig(newConfig)
    console.log("AnalyticsLayout: fetchAndActivate")
  }, [])

  return (
    <>
      {console.log("remoteConfig", currentConfig)}
      {children}
    </>
  )
}

export default RemoteConfigLayout
