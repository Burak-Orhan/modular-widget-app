<template>
    <div
        class="flex flex-col items-center justify-center w-full h-full bg-amber-50 border border-amber-100 rounded-lg p-4">
        <h4 class="font-bold text-amber-800 mb-4">Multiplication Widget</h4>
        <div class="flex items-center gap-2">
            <input v-model.number="num1" type="number"
                class="w-16 p-2 text-center border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500">
            <span class="font-bold text-amber-600 text-xl">×</span>
            <input v-model.number="num2" type="number"
                class="w-16 p-2 text-center border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500">
            <span class="font-bold text-amber-600 text-xl">=</span>
            <span class="text-2xl font-black text-amber-900 bg-white px-4 py-1.5 rounded shadow-sm">{{ num1 * num2
            }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const num1 = ref(0);
const num2 = ref(0);
</script>