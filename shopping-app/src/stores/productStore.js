import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('productStore', {
    state: () => {
        return {
            products: [],
            loading: true,
            fetchFailed: false
        }
    },
    getters: {
        modifiedProducts(state) {
            let modifiedProducts = state.products.map(item => {
                let commission = (2.2/100) * item.price
                item.price = Math.ceil(item.price + commission)
                return item
            })
            return modifiedProducts
        }
    },
    actions: {
        async getProducts(){
            try {
                const results = await axios.get('https://fakestoreapi.com/products')
                this.products = results.data
                this.loading = false
            } catch (error) {
                console.log(error)
                this.fetchFailed = true
                this.loading = false
            }
        }
    }
})