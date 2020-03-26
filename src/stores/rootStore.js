import ThemeStore from "./themeStore"

class RootStore {
  constructor() {
    this.themeStore = new ThemeStore(this)
  }
}
const Store = new RootStore()

export default Store
