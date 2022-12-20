<script>
    import product from '../components/product.vue'
    import cartItem from '../components/cartItem.vue'
    import myfooter from '../components/footer.vue'
    import modal from '../components/modal.vue'
    import toast from '../components/toast.vue'
    import { mapState, mapActions } from 'pinia'
    import { useProductStore } from '@/stores/productStore'
    import { useCartStore } from '@/stores/cartStore'

    export default {
      components: { product, myfooter, modal, toast, cartItem },
      data() {
        return {
          searchQuery: null,
          showCart: false,
          showToast: false,
          showCheckout: false,
          actionInfo: { status: '', msg: '' },
          shippingFee: 0
        }
      },
      computed: {
        ...mapState(useProductStore, {
          products: "modifiedProducts",
          fetchFailed: "fetchFailed",
          loading: "loading"
        }),
        ...mapState(useCartStore, {
          cart: "cart",
          cartCount: "cartCount",
          cartTotalPrice: "totalPrice"
        }),
        resultQuery() {
          if (this.searchQuery) {
            return this.products.filter(product => {
                return this.searchQuery
                    .toLowerCase()
                    .split(" ")
                    .every(v => product.title.toLowerCase().includes(v) || product.category.toLowerCase().includes(v)
                    || product.price.toString().toLowerCase().includes(v)
                  );
            });
          } 
          else return this.products;
        }
      },
      methods: {
        ...mapActions(useProductStore, ['getProducts']),
        confirm() {
            this.showCart = false
        },
        showMessage(info) {
          this.actionInfo = info
          this.showToast = true
          setTimeout(() => {
            this.showToast = false
          }, 3000)
        }
      },
      mounted(){
        this.getProducts()
      }
    }
</script>

<template>
  <div class="font-body">

    <!-- Header and caption -->
    <div class="text-white bg-gradient-to-tr from-purple-900 to-gray-900 h-44 pt-4">
      
      <div class="flex justify-end items-center px-8" @click="showCart = true">
        <div class="hover:cursor-pointer relative flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span class="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right m-0 pt-[2px] pb-[1px] text-white text-[11px] leading-tight text-center">
            {{ cartCount }}
          </span>
        </div>
      </div>
      
      <div class="flex justify-center items-center text-center mt-2">
        <div>
          <h2 class="text-3xl font-extrabold uppercase">our products</h2>
          <h4 class="font-cursive text-xl">Shop quality items with us.</h4>
        </div>
      </div>

    </div>
    
    <!-- Main body -->
    <div class="max-w-screen-lg mx-auto mt-10 mb-10 px-3 md:px-3 lg:px-0">
      
      <div class="mb-4 flex justify-end">
        <input v-model="searchQuery" type="search" placeholder="Search name, category, price..." class="border-[1.7px] border-gray-400 focus:border-purple-800 py-[7px] px-2 focus:outline-none text-[13px] rounded-md md:w-72 w-full">
      </div>
      
      <div v-if="loading" class="flex justify-center items-center">
        <div>
          <img src="../assets/media/loader.svg" class="w-20 mb-0 mx-auto" alt="loader">
          <p class="text-sm text-center">Loading products...</p>
        </div>
      </div>

      <div v-if="resultQuery.length < 1 && !loading" class="flex justify-center items-center">
        <div>
          <img src="../assets/media/empty.svg" class="w-20 mb-0 mx-auto" alt="empty products">
          <p class="text-sm text-center mt-3">
            <span v-if="fetchFailed">Unable to load products.</span>
            <span v-else> <strong>"{{ searchQuery }}"</strong> not found. </span>
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <product @showMessage="showMessage($event)" v-for="product in resultQuery" :key="product.id" :product="product"></product>  
      </div>

    </div>

    <!-- Cart modal -->
    <modal v-model="showCart" @confirm="confirm" @cancel="cancel" actions="false">
      <template v-slot:title> 
        <p> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline mb-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg> My Cart
        </p> 
      </template>
      <div class="w-full md:w-[700px] max-h-[400px] mt-3">
        <div class="flex flex-row flex-wrap-reverse md:flex-nowrap">
          
          <div class="md:basis-3/5 basis-full mr-2">
            <div v-if="cartCount >= 1" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <cart-item v-for="product in cart" :key="product.id" :product="product"></cart-item>
            </div>
            <div v-else class="flex justify-center items-center">
              <div>
                <img src="../assets/media/empty_cart.svg" class="w-20 mb-0 mx-auto" alt="empty cart">
                <p class="text-sm text-center mt-3">No products here.</p>
              </div>
            </div>
          </div>
          
          <div class="md:basis-2/5 basis-full md:mb-0 mb-4 text-[14px] px-3">
            <div class="sticky top-1">
              <div class="flex justify-between">
                <p>Merchandise:</p>
                <p>₦ {{ cartTotalPrice }}</p>
              </div>
              <div class="flex justify-between mt-3">
                <p>Estimated shipping:</p>
                <p>₦ 0</p>
              </div>
              <div class="flex justify-between mt-5">
                <p class="text-lg"><strong>ORDER TOTAL</strong></p>
                <p>₦ {{ cartTotalPrice + shippingFee }}</p>
              </div>
              <button @click="showCheckout = true" class="w-full mt-3 px-4 py-2 text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 rounded-md uppercase">proceed to checkout</button>
            </div>
          </div>
        
        </div>
      </div>
    </modal>

    <!-- Checkout coming soon modal -->
    <modal v-model="showCheckout" @confirm="confirm" @cancel="cancel" actions="false">
      <div class="w-full md:w-[300px] mt-3">
          <div class="flex justify-center items-center">
            <div>
              <img src="https://img.icons8.com/clouds/130/null/rocket.png"/>
              <p class="text-center">Coming soon !</p>
              <div class="flex justify-center items-center mt-2">
                <button class="border-[1px] border-gray-800 text-gray-800 px-3 py-[2px] rounded-md text-[14px]" @click="showCheckout = false">close</button>
              </div>
            </div>
          </div>
      </div>
    </modal>

    <!-- Toast notification -->
    <transition 
    enter-active-class="duration-300 transition-all ease"
    enter-from-class="translate-y-[-60px] opacity-0"
    enter-to-class="opacity-1 transalte-y-[0]"
    leave-from-class="opacity-1 transalte-y-[0]"
    leave-to-class="translate-y-[-60px] opacity-0"
    leave-active-class="duration-300 transition-all ease"
    >
      <toast v-if="showToast" :info="actionInfo"></toast> 
    </transition>

    <!-- Footer -->
    <myfooter></myfooter>

  </div>
</template>
