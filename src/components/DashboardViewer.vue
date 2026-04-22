<template>
    <div class="w-full h-full flex flex-col gap-6">

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 h-auto xl:h-[320px] shrink-0">
            <div v-for="i in 3" :key="'top-' + i"
                class="bg-white rounded-2xl border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden flex items-center justify-center transition-all h-[280px] xl:h-auto"
                :style="getZone('top-' + i)?.componentType === 'ColorOnly' ? { backgroundColor: getZone('top-' + i).color } : {}">

                <template v-if="getZone('top-' + i)">
                    <component v-if="getZone('top-' + i).componentType !== 'ColorOnly'"
                        :is="widgetMap[getZone('top-' + i).componentType]" :theme-color="getZone('top-' + i).color"
                        class="w-full h-full" />

                    <span v-else
                        class="text-white font-bold text-2xl drop-shadow-md bg-black/20 px-6 py-3 rounded-xl backdrop-blur-sm">
                        {{ getZone('top-' + i).name }}
                    </span>
                </template>

                <span v-else class="text-gray-300 text-sm font-medium italic">Empty Zone</span>
            </div>
        </div>

        <div class="flex-1 bg-white rounded-2xl border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden flex items-center justify-center min-h-[300px]"
            :style="getZone('bottom-1')?.componentType === 'ColorOnly' ? { backgroundColor: getZone('bottom-1').color } : {}">

            <template v-if="getZone('bottom-1')">
                <component v-if="getZone('bottom-1').componentType !== 'ColorOnly'"
                    :is="widgetMap[getZone('bottom-1').componentType]" :theme-color="getZone('bottom-1').color"
                    class="w-full h-full" />

                <span v-else
                    class="text-white font-bold text-3xl drop-shadow-md bg-black/20 px-8 py-4 rounded-xl backdrop-blur-sm">
                    {{ getZone('bottom-1').name }}
                </span>
            </template>

            <span v-else class="text-gray-300 text-base font-medium italic">Empty Wide Zone</span>
        </div>

    </div>
</template>

<script setup>
import { markRaw } from 'vue';

import CounterWidget from '../math/Counter.vue';
import AdderWidget from '../math/Adder.vue';
import SubtractorWidget from '../math/Subtractor.vue';
import MultiplierWidget from '../math/Multiplier.vue';

const widgetMap = {
    CounterWidget: markRaw(CounterWidget),
    AdderWidget: markRaw(AdderWidget),
    SubtractorWidget: markRaw(SubtractorWidget),
    MultiplierWidget: markRaw(MultiplierWidget)
};

const props = defineProps({
    savedLayoutData: {
        type: Object,
        required: true,
        default: () => ({ layout: [] })
    }
});

const getZone = (positionId) => {
    if (!props.savedLayoutData || !props.savedLayoutData.layout) return null;
    return props.savedLayoutData.layout.find(item => item.position === positionId) || null;
};
</script>