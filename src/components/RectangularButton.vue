<script setup>
const emits = defineEmits(['click']);

const onClick = () => {
  emits('click');
};
</script>

<template>
  <button @click="$emit('click')" class="block bg-primary text-white font-bold uppercase px-4 py-3 my-2 hover:bg-primary-hover transition-all">
    <slot></slot>
  </button>
</template>
