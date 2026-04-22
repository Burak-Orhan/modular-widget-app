<template>
    <div
        class="flex flex-col items-center justify-center w-full h-full bg-indigo-50 border border-indigo-100 rounded-lg p-4">
        <h4 class="font-bold text-indigo-800 mb-4">Counter Widget</h4>
        <div class="flex items-center gap-4">
            <button @click="count--"
                class="w-10 h-10 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-bold text-xl transition-colors">-</button>
            <span class="text-3xl font-black text-indigo-900 w-12 text-center">{{ count }}</span>
            <button @click="count++"
                class="w-10 h-10 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-bold text-xl transition-colors">+</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>