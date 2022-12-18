<script>
    import { useCartStore } from '@/stores/cartStore'
    import { mapActions } from 'pinia'
    
    export default {
        props:{
            product: {
                id: Number,
                title: String,
                price: Number,
                description: String,
                category: String,
                image: String,
                rating: {
                    rate: Number,
                    count: Number
                }
            }
        },
        methods: {
            ...mapActions(useCartStore, ['add']),
            addToCart(product){
                let info = this.add(product)
                this.$emit('showMessage', info)
            }
        },
    }
</script>

<template>
    <div class="p-1 bg-white rounded-md border-[1px]">
        <div>
            <img class="h-32 w-full object-cover rounded-md" :src="product.image" alt="">
        </div>
        <div class="mt-2 px-1 text-[13px]">
        <p>{{ product.title }}.</p>
        <p class="mt-1 text-[10px] border-[1px] border-gray-800 text-gray-800 w-fit px-2 py-[3px] rounded-full"><strong> {{ product.category }} </strong></p>
        <div class="flex justify-between items-center mt-2 mb-2">
            <div><button @click="addToCart(product)" class="px-4 py-1 text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 rounded-md">Add to cart</button></div>
            <div><p class="text-[14px]">₦ {{ product.price }}</p></div>
        </div>
        </div>
    </div>
</template>