<script>
    export default {
        props: {
            info: {
                status: String,
                msg: String
            }
        }
    }
</script>

<template>
    <div :class="{ 'border-green-500': info.status === 'success', 'border-red-500': info.status === 'error' }" class="rounded-lg fixed left-5 top-4 px-5 py-4 border-r-8 bg-white drop-shadow-lg">
        <div class="flex justify-between items-center">
            <div :class="{ 'bg-green-500': info.status === 'success', 'bg-red-500': info.status === 'error' }" class="mr-2 inline-block px-2 py-2 rounded-full text-white font-extrabold">
                <svg v-if="info.status === 'success'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <p class="text-sm">{{ info.msg }}</p>
        </div>
    </div>
</template>