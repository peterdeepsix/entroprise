import { types, getParent, destroy } from "mobx-state-tree"

export const Tag = types.model({
  name: types.string,
})

export const CartItem = types
  .model({
    name: types.string,
    price: types.number,
    tags: types.optional(types.array(Tag), []),
  })
  .actions((self) => ({
    changeName(newName) {
      self.name = newName
    },
    changePrice(newPrice) {
      self.price = newPrice
    },
    remove() {
      getParent(self, 2).remove(self)
    },
  }))

export const Cart = types
  .model({
    items: types.optional(types.array(CartItem), []),
  })
  .actions((self) => ({
    addCartItem(cartItem) {
      self.items.push(cartItem)
    },
    remove(item) {
      destroy(item)
    },
  }))
  .views((self) => ({
    get totalItems() {
      return self.items.length
    },
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0)
    },
  }))
