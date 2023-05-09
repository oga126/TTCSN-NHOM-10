<script setup>
import { ref } from 'vue';

// khai báo prop truyền vào component là 1 product: kiểu object
const props = defineProps({
  product: Object,
});

const { product } = props;

const isHaveInCart = ref(false);
const fakePending = ref(false);

// hàm xử lý khi nhấn mua ngay
const addToCartHandler = () => {
  fakePending.value = true;
  setTimeout(() => {
    isHaveInCart.value = true;
    fakePending.value = false;
  }, 500);
};
</script>

<template>
  <div class="px-2">
    <div
      class="overflow-hidden rounded-md border border-gray-300 mb-5 hover:shadow-[0px_0px_20px_#eaeaea] transition-all duration-300 relative"
    >
      <router-link
        :to="{
          name: 'product-details',
          params: {
            slugy: product.slugy_name,
            type: product.type,
          },
        }"
      >
        <div class="overflow-hidden relative h-[300px]">
          <img
            :src="product.thumbnail"
            alt=""
            class="w-full h-full object-cover transition-all duration-700"
          />
          <div
            v-if="product.quantity == 0"
            class="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 py-4 text-center uppercase font-bold text-gray-600 bg-[rgba(255,255,255,0.7)]"
          >
            Hết hàng
          </div>
        </div>

        <div class="text-center p-4 pb-0">
          <h2 class="h2_hover text-primary-hover font-bold">{{ product.name }}</h2>
        </div>
      </router-link>

      <div class="text-center">
        <div class="flex items-center justify-center">
          <p class="line-through text-dark-light text-sm mr-2">{{ product.price }}₫</p>
          <p class="text-[#e04c78] text-xl">{{ product.cur_price }}₫</p>
        </div>

        <button
          v-if="!isHaveInCart"
          @click="addToCartHandler(product.index)"
          class="mt-2 text-xs text-white bg-primary-light py-1 px-4 rounded-full mb-4"
        >
          {{ !fakePending ? 'MUA NGAY' : 'Loading...' }}
        </button>
        <button
          v-else
          @click="addToCartHandler(product.index)"
          class="mt-2 text-xs text-white bg-primary-light py-1 px-4 rounded-full mb-4"
        >
          Xem giỏ hàng &#x2192;
        </button>
      </div>

      <div
        class="absolute top-2 left-2 w-10 h-10 bg-primary rounded-full flex justify-center items-center text-white text-xs"
      >
        -{{ product.discount }}
      </div>
    </div>
  </div>
</template>

<style>
a:hover .h2_hover {
  color: var(--color-primary);
}
</style>

<style scoped>
a:hover img {
  transform: scale(1.1);
  opacity: 0.8;
  transform-origin: 50% 50%;
}
</style>
