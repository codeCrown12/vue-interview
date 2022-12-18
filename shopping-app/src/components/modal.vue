<script>
    import { VueFinalModal } from 'vue-final-modal'
    
    export default {
        components:{
            VueFinalModal,
        },
        props:{
            actions: String
        },
        name: 'CustomModal',
        inheritAttrs: false,
        emits: ['confirm', 'cancel']
    }
</script>

<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
  >
    <span class="mr-8 text-xl font-bold">
      <slot name="title"></slot>
    </span>
    <div class="flex-grow overflow-y-auto">
      <slot :params="params"></slot>
    </div>
    <div class="flex-shrink-0 flex justify-start items-center pt-4">
      <button class="border-[1px] border-gray-800 text-gray-800 px-3 py-[2px] rounded-md text-[14px]" @click="$emit('confirm', close)">close</button>
    </div>
    <button class="absolute top-0 right-0 mt-3 mr-2" @click="close">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </vue-final-modal>
</template>