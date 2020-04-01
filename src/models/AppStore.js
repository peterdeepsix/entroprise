import { types } from "mobx-state-tree"

const AppStore = types
  .model({
    user: types.string,
    userToken: types.string,
  })
  .actions(self => {
    function setUser(newUser) {
      self.user = newUser
    }

    function setUserToken(newUserToken) {
      self.userToken = newUserToken
    }

    return {
      setUser,
      setUserToken,
    }
  })

export default AppStore
