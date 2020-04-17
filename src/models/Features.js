import { types } from "mobx-state-tree"

const Features = types
  .model({
    featureThread: types.boolean,
  })
  .actions((self) => {
    function setFeatureThread(isEnabled) {
      self.featureThread = isEnabled
    }

    return {
      setFeatureThread,
    }
  })

export default Features
