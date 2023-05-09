<script setup>
import ProductCard from '@/components/ProductCard.vue';

// khai báo prop truyền vào component là 1 mảng các sản phẩm
const props = defineProps({
  products: Object,
});
const { products } = props;
</script>

<template>
  <div class="max-w-[1200px] mx-auto mb-12">
    <div class="mb-6 flex justify-between items-stretch">
      <h1 class="text-primary uppercase font-bold text-2xl border-b-2 border-b-primary pb-2">
        {{ products.name }}
      </h1>
      <div class="flex-1 text-right border-b-2 border-b-gray-300 pb-1">
        <router-link
          :to="{
            name: 'products-by-type',
            params: {
              type: products.slugy,
            },
          }"
          class="py-1 px-4 text-white bg-primary rounded-lg hover:bg-[#ffb700] transition-all"
        >
          + Xem tất cả</router-link
        >
      </div>
    </div>

    <div class="flex flex-wrap">
      <product-card
        v-for="product in products.products"
        :product="product"
        :key="product.name"
        class="w-[25%]"
      />
    </div>
  </div>
</template>
