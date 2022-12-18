import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
    state: () => {
        return {
            cart: []
        }
    },
    getters: {
        cartCount(state) {
            return state.cart.length
        },
        totalPrice(state) {
            let total = 0
            for (let i = 0; i < state.cart.length; i++) {
                total += state.cart[i].price
            }
            return total
        }
    },
    actions: {
        add(product) {
            try {
                if(this.cart.includes(product)) {
                    return { status: 'error', msg: 'Product already exists inside the cart' }
                }
                else {
                    this.cart.push(product)
                    return { status: 'success', msg: 'Product added to cart' }
                }
            } catch (error) {
                console.log(error)
                return { status: 'error', msg: 'Sorry, an error occurs from our side while adding your product to the cart, we are currently working on it, Kindly try again' }
            }
        },
        remove(product) {
            let productIndex = this.cart.indexOf(product)
            this.cart.splice(productIndex, 1)
        }
    }
})