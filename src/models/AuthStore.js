import { types } from "mobx-state-tree"
import Todo from "./Todo"

const AuthStore = types
  .model("Todo", {
    Todo: types.array(Todo),
  })
  .actions(self => ({
    add(task) {
      self.Todo.push(task)
    },
  }))

export default AuthStore
