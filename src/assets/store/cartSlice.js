import {createSlice} from '@reduxjs/toolkit'

let wishListProducts = JSON.parse(localStorage.getItem("cart"))

const cartSlice = createSlice( {
    name : "cart",
    initialState : wishListProducts,
    reducers : {
        addItem(state, action){
            state.push(action.payload)
            localStorage.setItem("cart", JSON.stringify([...state]))
        },
        removeItem(state, action){
            let remainingWishListProducts = state.filter( cartProduct => cartProduct.id !== action.payload)
            localStorage.setItem("cart", JSON.stringify([...remainingWishListProducts]))
            return (remainingWishListProducts)   
        }
    }
})

export default cartSlice.reducer

export let {addItem, removeItem} = cartSlice.actions
