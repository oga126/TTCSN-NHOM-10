<script setup>
import defaultLayout from './layouts/default-layout.vue';
import { cartStore } from './stores/cart';

// const { getCartInFirestore } = cartStore(); 

// await getCartInFirestore();
</script>

<template>
  <default-layout>
    <router-view></router-view>
  </default-layout>
</template>
