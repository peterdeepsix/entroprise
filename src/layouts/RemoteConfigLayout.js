import React, { useEffect, useState, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"

const RemoteConfigLayout = ({ children }) => {
  const [currentConfig, setCurrentConfig] = useState(null)

  const remoteConfig = firebase.remoteConfig()
  remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
  }

  remoteConfig.defaultConfig = {
    loot_enabled: false,
  }

  useMemo(() => {
    remoteConfig
      .fetchAndActivate()
      .then(() => {
        console.log("currentConfig", currentConfig)
        const newConfig = remoteConfig.getAll()
        console.log("newConfig", newConfig)
        setCurrentConfig(newConfig)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [remoteConfig])

  return (
    <>
      {console.log("currentConfig", currentConfig)}
      {children}
    </>
  )
}

export default RemoteConfigLayout
