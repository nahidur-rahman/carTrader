<script setup>
const props = defineProps({
    title: String,
    name: String,
    options: Array,
});

const emit = defineEmits(['changeInput']);
const state = ref("")

const onChange = () => {
    emit('changeInput', state.value, props.name)
}
</script>

<template>
    <div class="flex flex-col w-[48%] mt-2">
        <label class="text-cyan-500 mb-1 text-sm" for="">{{ title }}</label>
        <select id="" name="" class="p-2 border w-100 rounded" v-model="state" @change="onChange">
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>
