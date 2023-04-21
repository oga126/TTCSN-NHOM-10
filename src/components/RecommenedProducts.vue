<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import db from '../../data/index';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ProductCard from './ProductCard.vue';

// lấy ra prop truyền từ
const props = defineProps(['products']);

const route = useRoute();

let productTypeName;

const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
  <Swiper
    :slides-per-view="4"
    :space-between="10"
    :autoplay="{ delay: 2000, disableOnInteraction: false }"
    :loop="true"
    :pagination="{ clickable: true }"
    :navigation="true"
    :modules="modules"
  >
    <SwiperSlide v-for="product in props.products" :key="product.index">
      <product-card :product="product" />
    </SwiperSlide>
  </Swiper>
</template>
