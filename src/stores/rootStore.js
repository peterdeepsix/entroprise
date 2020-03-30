import ThemeStore from "./themeStore"
import AuthStore from "./authStore"

class RootStore {
  constructor() {
    this.themeStore = new ThemeStore(this)
    this.authStore = new AuthStore(this)
  }
}
const Store = new RootStore()

export default Store
