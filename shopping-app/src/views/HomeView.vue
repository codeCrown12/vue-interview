<script>
    import product from '../components/product.vue'
    import myfooter from '../components/footer.vue'
    import { mapState, mapActions } from 'pinia'
    import { useProductStore } from '@/stores/productStore'

    export default {
      components: { product, myfooter },
      data() {
        return {
          searchQuery: null
        }
      },
      computed: {
        ...mapState(useProductStore, {
          products: (store) => {
            let modifiedProducts = store.products.map(item => {
                let commission = (2.2/100) * item.price
                item.price = Math.ceil(item.price + commission)
                return item
            })
            return modifiedProducts
          },
          fetchFailed: "fetchFailed",
          loading: "loading"
        }),
        resultQuery() {
          if (this.searchQuery) {
              return this.products.filter(product => {
                  return this.searchQuery
                      .toLowerCase()
                      .split(" ")
                      .every(v => product.title.toLowerCase().includes(v) || product.category.toLowerCase().includes(v)
                      || product.price.toString().toLowerCase().includes(v) || product.description.toLowerCase().includes(v)
                    );
              });
          } 
          else return this.products;
        }
      },
      methods: {
        ...mapActions(useProductStore, ['getProducts'])
      },
      mounted(){
        this.getProducts()
      }
    }
</script>

<template>
  <div class="font-body">

    <div class="py-2">
      <div class="flex justify-end items-center px-10">
        
        <!-- cart icon -->
        <div class="hover:cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>


      </div>
    </div>

    <div class="text-white bg-gradient-to-tr from-purple-900 to-gray-900 h-32 flex justify-center items-center text-center">
      <div>
        <h2 class="text-3xl font-extrabold uppercase">our products</h2>
        <h4 class="font-cursive text-xl">Shop quality items 🚀.</h4>
      </div>
    </div>
    

    <div class="max-w-screen-lg mx-auto mt-10 mb-10 px-3 md:px-3 lg:px-0">
      
      <div class="mb-4 flex justify-end">
        <input v-model="searchQuery" type="search" placeholder="Search anything..." class="border-[1.7px] border-gray-400 focus:border-purple-800 py-[7px] px-2 focus:outline-none text-[13px] rounded-md md:w-72 w-full">
      </div>
      
      <div v-if="loading" class="flex justify-center items-center">
        <div>
          <img src="../assets/media/loader.svg" class="w-20 mb-0 mx-auto" alt="loader">
          <p class="text-sm text-center">Loading products...</p>
        </div>
      </div>

      <div v-if="resultQuery.length < 1 && !loading" class="flex justify-center items-center">
        <div>
          <img src="../assets/media/empty.svg" class="w-20 mb-0 mx-auto" alt="loader">
          <p class="text-sm text-center mt-3">
            <span v-if="fetchFailed">Unable to load products.</span>
            <span v-else> <strong>{{ searchQuery }}</strong> not found. </span>
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <product v-for="product in resultQuery" :key="product.id" :product="product"></product>  
      </div>

    </div>

    <myfooter></myfooter>

  </div>
</template>
