import firebase from "gatsby-plugin-firebase"

const remoteConfig = firebase.remoteConfig()
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000,
}

remoteConfig.defaultConfig = {
  feature_thread_enabled: "disabled",
}

export const fetchAndActivate = () => {
  return remoteConfig
    .fetchAndActivate()
    .then(() => {
      const newConfig = remoteConfig.getAll()
      return newConfig
    })
    .catch((err) => {
      console.error(err)
    })
}
