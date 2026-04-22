<template>
    <div class="flex h-screen w-full font-sans bg-gray-100 overflow-hidden">

        <div
            class="w-[400px] bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">

            <div class="px-6 py-6 border-b border-gray-100 bg-gray-50">
                <h1 class="text-xl font-bold text-gray-900 mb-1">Live Viewer</h1>
                <p class="text-xs text-gray-500 leading-relaxed">
                    Paste your JSON payload below. The dashboard will instantly render on the right.
                </p>
            </div>

            <div class="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-3.5 h-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                    JSON Data
                </span>
                <button @click="loadSample"
                    class="text-[11px] bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded font-semibold transition-colors">
                    Load Sample
                </button>
            </div>

            <textarea v-model="jsonInput" @input="parseJson" placeholder="Paste your JSON here..."
                class="flex-1 w-full p-5 text-[13px] font-mono text-gray-800 bg-[#fbfbfc] focus:outline-none focus:bg-white transition-colors resize-none custom-scrollbar"
                spellcheck="false"></textarea>

            <div v-if="jsonError"
                class="bg-red-50 text-red-600 text-xs px-5 py-3 border-t border-red-100 flex items-center gap-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Invalid JSON Format! Please check your syntax.
            </div>
        </div>

        <div class="flex-1 flex flex-col h-full bg-[#f3f4f6] relative overflow-hidden">
            <div class="h-14 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm z-10 shrink-0">
                <span class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4 text-green-500">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                    Rendered Output
                </span>
            </div>

            <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <DashboardViewer :saved-layout-data="parsedData" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DashboardViewer from '../components/DashboardViewer.vue';

const jsonInput = ref('');
const parsedData = ref({ layout: [] });
const jsonError = ref(false);

const parseJson = () => {
    if (!jsonInput.value.trim()) {
        parsedData.value = { layout: [] };
        jsonError.value = false;
        return;
    }
    try {
        const data = JSON.parse(jsonInput.value);
        parsedData.value = data;
        jsonError.value = false;
    } catch (error) {
        jsonError.value = true;
    }
};

const loadSample = () => {
    const sample = {
        "userId": 1,
        "timestamp": new Date().toISOString(),
        "layout": [
            {
                "position": "top-1",
                "componentType": "CounterWidget",
                "name": "Live Counter",
                "color": "#6366f1"
            },
            {
                "position": "top-2",
                "componentType": "MultiplierWidget",
                "name": "Multiplier",
                "color": "#8b5cf6"
            },
            {
                "position": "top-3",
                "componentType": "AdderWidget",
                "name": "Quick Calc",
                "color": "#10b981"
            },
            {
                "position": "bottom-1",
                "componentType": "ColorOnly",
                "name": "Full Width Analytics Area",
                "color": "#f59e0b"
            }
        ]
    };
    jsonInput.value = JSON.stringify(sample, null, 2);
    parseJson();
};

onMounted(() => {
    const sharedLayout = localStorage.getItem('sharedDashboardLayout');

    if (sharedLayout) {
        jsonInput.value = sharedLayout;
        parseJson();

        localStorage.removeItem('sharedDashboardLayout');
    } else {
        loadSample();
    }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>