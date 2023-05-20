<script setup>
import Footer from '@/components/Footer.vue';
import ContactFixed from '@/components/ContactFixed.vue';
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import('@/components/Header.vue'));
</script>

<template>
  <Header></Header>

  <!-- chuyền các childern html vào slot -->
  <slot />

  <Footer />

  <!-- icon zalo, messager ở bottom -->
  <contact-fixed />
</template>
