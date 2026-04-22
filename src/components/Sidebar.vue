<template>
    <div
        class="w-[260px] bg-[#f8f9fa] flex flex-col h-full flex-shrink-0 border-r border-gray-200 transition-all duration-300">

        <div class="px-5 py-6 flex items-center gap-3">
            <div class="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
            </div>
            <span class="font-bold text-[15px] text-gray-800">Widget Tool</span>
        </div>

        <div class="flex-1 px-3 overflow-y-auto flex flex-col gap-6">

            <div>
                <h3 class="text-[11px] font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider">Platform</h3>
                <div class="flex items-center gap-3 px-3 py-2 bg-gray-200/70 rounded-lg text-gray-800 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4 opacity-70">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    <span class="text-sm font-medium">Dashboard</span>
                </div>
            </div>

            <div>
                <h3 @click="isComponentsOpen = !isComponentsOpen"
                    class="text-[11px] font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider flex justify-between items-center cursor-pointer hover:text-gray-600 transition-colors">
                    <div class="flex items-center gap-1.5">
                        Components
                        <span class="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">{{ menuItems.length
                        }}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': !isComponentsOpen }"
                        class="h-3.5 w-3.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </h3>

                <Transition name="dropdown">
                    <div v-show="isComponentsOpen" class="overflow-hidden">

                        <TransitionGroup name="list" tag="ul"
                            class="flex flex-col gap-1 mb-3 relative min-h-[60px] py-2"
                            @dragover.prevent="e => e.dataTransfer.dropEffect = 'move'" @dragenter.prevent
                            @drop="onDropList">

                            <li v-for="(item, index) in menuItems" :key="item.id" draggable="true"
                                @dragstart="onDragStart($event, item, index)" @dragenter.prevent="dragOverIndex = index"
                                @dragover.prevent="e => e.dataTransfer.dropEffect = 'move'" @dragend="onDragEnd"
                                class="flex items-center justify-between px-3 py-2 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-200 border group z-10 relative"
                                :class="[
                                    { 'opacity-0': draggedIndex === index },
                                    { 'drop-zone-top': dragOverIndex === index && draggedIndex > index },
                                    { 'drop-zone-bottom': dragOverIndex === index && draggedIndex < index },
                                    editingId === item.id ? '' : 'border-transparent bg-[#f8f9fa] hover:bg-white hover:border-gray-200 hover:shadow-sm'
                                ]"
                                :style="editingId === item.id ? { backgroundColor: item.color + '26', borderColor: item.color } : {}">

                                <div class="flex items-center gap-3 pointer-events-none">
                                    <div class="w-3.5 h-3.5 rounded shadow-sm" :style="{ backgroundColor: item.color }">
                                    </div>
                                    <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900"
                                        :class="{ 'font-bold': editingId === item.id }">{{ item.name }}</span>
                                </div>

                                <div
                                    class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button @click.stop="startEdit(item)"
                                        class="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                        title="Edit Component">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>

                                    <button @click.stop="deleteMenuItem(item.id)"
                                        class="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                        title="Delete Component">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>

                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 text-gray-400 pointer-events-none ml-0.5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </li>
                        </TransitionGroup>

                        <div class="bg-white p-2.5 rounded-lg border shadow-sm flex flex-col gap-2 mx-1 mb-2 relative transition-all duration-300"
                            :class="editingId ? '' : 'border-gray-200'"
                            :style="editingId ? { borderColor: formColor, boxShadow: `0 0 0 3px ${formColor}33` } : {}">

                            <button v-if="editingId" @click="cancelEdit"
                                class="absolute -top-2 -right-2 bg-white hover:bg-gray-100 text-gray-500 rounded-full p-1 shadow-sm border border-gray-200 transition-colors z-20"
                                title="Cancel The Arrangement">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>

                            <input v-model="formName" type="text"
                                :placeholder="editingId ? 'Edit the component...' : 'The new component name...'"
                                @keyup.enter="submitForm"
                                class="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors">

                            <div class="flex gap-2 h-7">
                                <input v-model="formColor" type="color"
                                    class="w-8 h-full p-0 border border-gray-200 rounded cursor-pointer">

                                <button @click="submitForm"
                                    class="flex-1 text-white text-xs font-medium rounded transition-all duration-300"
                                    :class="editingId ? 'hover:brightness-110' : 'bg-gray-800 hover:bg-gray-700'"
                                    :style="editingId ? { backgroundColor: formColor } : {}">
                                    {{ editingId ? 'Update' : 'Add' }}
                                </button>
                            </div>
                        </div>

                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isComponentsOpen = ref(true);
const draggedIndex = ref(null);
const dragOverIndex = ref(null);
const editingId = ref(null);

const formName = ref('');
const formColor = ref('#0f172af2');

const menuItems = ref([
    { id: 1, name: 'Counter Tool', color: '#6366f1', componentType: 'CounterWidget' },
    { id: 2, name: 'Adder Tool', color: '#10b981', componentType: 'AdderWidget' },
    { id: 3, name: 'Subtractor Tool', color: '#f43f5e', componentType: 'SubtractorWidget' },
    { id: 4, name: 'Multiplier Tool', color: '#f59e0b', componentType: 'MultiplierWidget' },
]);

const startEdit = (item) => {
    editingId.value = item.id;
    formName.value = item.name;
    formColor.value = item.color;
};

const cancelEdit = () => {
    editingId.value = null;
    formName.value = '';
    formColor.value = '#0f172af2';
};

const submitForm = () => {
    const trimmedName = formName.value.trim();
    if (!trimmedName) return;

    if (editingId.value) {
        const item = menuItems.value.find(i => i.id === editingId.value);
        if (item) {
            item.name = trimmedName;
            item.color = formColor.value;
        }
        cancelEdit();
    } else {
        menuItems.value.push({
            id: Date.now(),
            name: trimmedName,
            color: formColor.value,
            componentType: 'ColorOnly'
        });
        formName.value = '';
    }
};

const deleteMenuItem = (id) => {
    menuItems.value = menuItems.value.filter(item => item.id !== id);
    if (editingId.value === id) cancelEdit();
};

const onDragStart = (e, item, index) => {
    draggedIndex.value = index;
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'all';
    e.dataTransfer.setData('draggedItem', JSON.stringify(item));
};

const onDragEnd = () => {
    draggedIndex.value = null;
    dragOverIndex.value = null;
};

const onDropList = () => {
    if (draggedIndex.value !== null && dragOverIndex.value !== null && draggedIndex.value !== dragOverIndex.value) {
        const itemToMove = menuItems.value.splice(draggedIndex.value, 1)[0];
        menuItems.value.splice(dragOverIndex.value, 0, itemToMove);
    }
    onDragEnd();
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 500px;
    opacity: 1;
}

.dropdown-enter-from,
.dropdown-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(-15px);
}

.list-leave-active {
    position: absolute;
    width: 100%;
}

.drop-zone-top {
    margin-top: 2.75rem;
}

.drop-zone-bottom {
    margin-bottom: 2.75rem;
}

.drop-zone-top::before,
.drop-zone-bottom::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2.25rem;
    pointer-events: none;
    border: 2px dashed #94a3b8;
    background-color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
}

.drop-zone-top::before {
    top: -2.75rem;
}

.drop-zone-bottom::after {
    bottom: -2.75rem;
}
</style>