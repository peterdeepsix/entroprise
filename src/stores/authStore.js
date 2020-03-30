import { observable, action, decorate } from "mobx"
import localStorage from "mobx-localstorage"

class AuthStore {
  themeObject = null

  getThemeObject() {
    this.themeObject = localStorage.getItem("themeObject")
  }

  setThemeObject(themeObject) {
    this.themeObject = themeObject
    localStorage.setItem("themeObject", themeObject)
  }

  dehydrate() {
    return {
      themeObject: this.themeObject,
    }
  }
}

decorate(AuthStore, {
  themeObject: observable,
  getThemeObject: action,
  setThemeObject: action,
})

export default AuthStore
