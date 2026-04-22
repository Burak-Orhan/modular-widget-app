<template>
    <div class="flex h-screen w-full font-sans bg-white text-gray-800 overflow-hidden relative">

        <Transition name="sidebar-slide">
            <Sidebar v-show="isSidebarOpen" />
        </Transition>

        <div class="flex-1 flex flex-col h-full relative overflow-hidden transition-all duration-300">

            <header class="h-[72px] border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0">
                <div class="flex items-center gap-4">
                    <button @click="isSidebarOpen = !isSidebarOpen"
                        class="p-2 -ml-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <span class="text-sm font-semibold text-gray-800">Dashboard</span>
                </div>

                <button @click="saveDashboard"
                    class="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    Save Layout
                </button>
            </header>

            <main class="flex-1 p-8 overflow-y-auto bg-white">
                <div class="max-w-7xl mx-auto h-full flex flex-col gap-6">

                    <div class="grid grid-cols-3 gap-6 h-[280px] shrink-0">
                        <div v-for="zone in topZones" :key="zone.id"
                            :class="getZoneClasses(zone.id, zone.componentType, false)" :style="getZoneStyle(zone)"
                            @dragover.prevent="activeZone = zone.id" @dragleave.prevent="activeZone = null"
                            @drop="onDrop($event, zone)">

                            <template v-if="!zone.componentType">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-300">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </template>

                            <template v-else>
                                <div class="w-full h-full p-2 flex items-center justify-center relative">
                                    <component v-if="zone.componentType !== 'ColorOnly'"
                                        :is="widgetMap[zone.componentType]" :theme-color="zone.color" />
                                    <span v-else
                                        class="text-white font-bold drop-shadow-md bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm pointer-events-none">{{
                                            zone.name }}</span>
                                    <button @click="clearZone(zone)"
                                        class="absolute top-4 right-4 bg-white/30 hover:bg-red-500 hover:text-white text-gray-400 p-1.5 rounded-md shadow-sm border border-transparent transition-all opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>

                    <div :class="getZoneClasses(bottomZone.id, bottomZone.componentType, true)"
                        :style="getZoneStyle(bottomZone)" @dragover.prevent="activeZone = bottomZone.id"
                        @dragleave.prevent="activeZone = null" @drop="onDrop($event, bottomZone)">

                        <template v-if="!bottomZone.componentType">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-10 h-10 text-gray-300">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </template>

                        <template v-else>
                            <div class="w-full h-full p-2 flex items-center justify-center relative">
                                <component v-if="bottomZone.componentType !== 'ColorOnly'"
                                    :is="widgetMap[bottomZone.componentType]" :theme-color="bottomZone.color" />
                                <span v-else
                                    class="text-white font-bold text-xl drop-shadow-md bg-black/20 px-5 py-2.5 rounded-lg backdrop-blur-sm pointer-events-none">{{
                                        bottomZone.name }}</span>
                                <button @click="clearZone(bottomZone)"
                                    class="absolute top-4 right-4 bg-white/30 hover:bg-red-500 hover:text-white text-gray-400 p-2 rounded-md shadow-sm border border-transparent transition-all opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </template>
                    </div>

                </div>
            </main>
        </div>

        <Transition name="modal">
            <div v-if="isModalOpen"
                class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">

                <div
                    class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden transform transition-all">

                    <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 class="text-base font-semibold text-gray-800 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-5 h-5 text-green-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Dashboard Layout Is Saved
                        </h3>
                        <button @click="isModalOpen = false"
                            class="text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="p-6 bg-[#1e1e1e] overflow-y-auto max-h-[50vh] custom-scrollbar">
                        <pre
                            class="text-[13px] font-mono text-green-400 leading-relaxed"><code>{{ savedJsonData }}</code></pre>
                    </div>

                    <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
                        <button @click="isModalOpen = false"
                            class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            Close
                        </button>
                        <button @click="copyToClipboard"
                            class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2"
                            :class="isCopied ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-600 hover:bg-gray-700'">
                            <svg v-if="!isCopied" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {{ isCopied ? 'Copied!' : 'Copy JSON' }}
                        </button>

                        <button @click="openInViewer"
                            class="px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2">
                            Test in Viewer
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, watch, markRaw } from 'vue';
import Sidebar from '../components/Sidebar.vue';

import Counter from '../math/Counter.vue';
import Adder from '../math/Adder.vue';
import Subtractor from '../math/Subtractor.vue';
import Multiplier from '../math/Multiplier.vue';

const widgetMap = {
    CounterWidget: markRaw(Counter),
    AdderWidget: markRaw(Adder),
    SubtractorWidget: markRaw(Subtractor),
    MultiplierWidget: markRaw(Multiplier)
};

const savedSidebarState = localStorage.getItem('sidebarState');
const isSidebarOpen = ref(savedSidebarState !== null ? JSON.parse(savedSidebarState) : true);

watch(isSidebarOpen, (newValue) => {
    localStorage.setItem('sidebarState', JSON.stringify(newValue));
});

const activeZone = ref(null);

const topZones = ref([
    { id: 'top-1', componentType: null, name: null, color: null },
    { id: 'top-2', componentType: null, name: null, color: null },
    { id: 'top-3', componentType: null, name: null, color: null },
]);

const bottomZone = ref({ id: 'bottom-1', componentType: null, name: null, color: null });

const isModalOpen = ref(false);
const savedJsonData = ref('');
const isCopied = ref(false);

const getZoneClasses = (zoneId, componentType, isBottom) => {
    return [
        'rounded-xl border transition-all duration-300 relative overflow-hidden flex items-center justify-center group bg-white',
        isBottom ? 'flex-1 min-h-[300px]' : '',
        activeZone.value === zoneId ? `border-gray-400 shadow-md ${isBottom ? 'scale-[1.01]' : 'scale-[1.02]'}` : '',
        !componentType ? 'hatched-bg border-gray-200' : 'shadow-sm border-transparent'
    ];
};

const getZoneStyle = (zone) => {
    return zone.componentType === 'ColorOnly' ? { backgroundColor: zone.color } : {};
};

const onDrop = (e, zone) => {
    activeZone.value = null;
    try {
        const data = e.dataTransfer.getData('draggedItem');
        if (!data) return;
        const item = JSON.parse(data);
        Object.assign(zone, { componentType: item.componentType, name: item.name, color: item.color });
    } catch (error) {
        console.error("Drop Error:", error);
    }
};

const clearZone = (zone) => {
    Object.assign(zone, { componentType: null, name: null, color: null });
};

const saveDashboard = () => {
    const payload = {
        userId: 1,
        timestamp: new Date().toISOString(),
        layout: [
            ...topZones.value.map((zone, index) => ({
                position: `top-${index + 1}`,
                componentType: zone.componentType,
                name: zone.name,
                color: zone.color
            })),
            {
                position: 'bottom-1',
                componentType: bottomZone.value.componentType,
                name: bottomZone.value.name,
                color: bottomZone.value.color
            }
        ]
    };

    savedJsonData.value = JSON.stringify(payload, null, 2);
    isCopied.value = false;
    isModalOpen.value = true;
};

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(savedJsonData.value);
        isCopied.value = true;
        setTimeout(() => {
            isCopied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Copying failed:', err);
    }
};

const openInViewer = () => {
    localStorage.setItem('sharedDashboardLayout', savedJsonData.value);
    window.open('/viewer', '_blank');
}

</script>

<style scoped>
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
    margin-left: -260px;
}

.hatched-bg {
    background-color: #ffffff;
    background-image: repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.02) 8px, rgba(0, 0, 0, 0.02) 9px);
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .transform,
.modal-leave-to .transform {
    transform: scale(0.95) translateY(10px);
}

.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #1e1e1e;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}
</style>