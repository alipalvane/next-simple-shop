import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      const existingItem = state.cartItems.find((p) => p.id === item.id)

      if (existingItem) {
        state.cartItems = state.cartItems.map((p) =>
          p.id === existingItem.id ? item : p
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      state.itemsPrice = state.cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.qty,
        0
      )

      state.totalPrice = state.itemsPrice
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((p) => p.id !== action.payload)

      state.itemsPrice = state.cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.qty,
        0
      )

      state.totalPrice = state.itemsPrice
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
