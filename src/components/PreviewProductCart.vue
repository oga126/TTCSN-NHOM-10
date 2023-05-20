<script setup>
// khai báo prop truyền vào component là 1 product: kiểu object
const props = defineProps({
  product: Object,
});

const { product } = props;

const emit = defineEmits(['onRemoveOutCart']);

const removeOutCartHandler = () => {
  emit('onRemoveOutCart', product.index);
};
</script>

<template>
  <div class="flex border-b boredr-b-gray-300 py-3">
    <router-link
      :to="{
        name: 'product-details',
        params: {
          type: product.type,
          slugy: product.slugy_name,
        },
      }"
      class="flex"
    >
      <div class="mr-4 w-[30%]">
        <img :src="product.thumbnail" alt="" class="w-full h-auto object-contain" />
      </div>

      <div class="flex-1">
        <span class="text-primary transition-all hover:text-dark text-sm font-normal">{{
          product.name
        }}</span>
        <div class="whitespace-nowrap mt-2">
          <span class="text-dark-light mx-2">{{ product.quantity }} x</span>
          <span class="text-rose-400">{{ product.cur_price }}₫</span>
        </div>
      </div>
    </router-link>

    <!-- button xóa sản phẩm khỏi giỏ hàng -->
    <div class="mr-4">
      <button
        @click="removeOutCartHandler"
        class="text-gray-300 text-xs border border-gray-300 flex justify-center items-center w-6 h-6 rounded-full"
      >
        &#x2716;
      </button>
    </div>
  </div>
</template>
