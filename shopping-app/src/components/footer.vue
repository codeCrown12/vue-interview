<script>
    export default {
        computed:{
          getYear(){
            const date = new Date()
            return date.getFullYear()
          }
        }
    }
</script>

<template>
    <div class="flex justify-center items-center mb-10 text-[14px] text-center">
      <div>
        <p>Made with ❤️ and React JS</p>
        <p>&copy; {{ getYear }}</p>
      </div>
    </div>
</template>
