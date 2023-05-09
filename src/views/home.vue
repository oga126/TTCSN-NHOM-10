<script setup>
import db from '../../data/index';

import Banner from '@/components/Banner.vue';
import CategoriesList from '@/components/CategoriesList.vue';

const { pha, pin, trang_tri, tru_cong_tru_cot } = db.nl_mat_troi.children;
</script>

<template>
  <Banner />
  <!-- Danh muc san pham -->
  <categories-list :products="pha" />
  <categories-list :products="trang_tri" />
  <categories-list :products="tru_cong_tru_cot" />
  <categories-list :products="pin" />
</template>
