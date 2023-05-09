<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ContactFixed from '@/components/ContactFixed.vue';
</script>

<template>
  <Header />

  <!-- chuyền các childern html vào -->
  <slot />

  <Footer />

  <!-- icon zalo, messager ở bottom -->
  <contact-fixed />
</template>
