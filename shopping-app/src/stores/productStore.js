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