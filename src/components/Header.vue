<script setup>
import { ref, watchEffect } from 'vue';

import { auth } from '@/config/firebase';
import { useUser } from '@/composable/useUser';

import { cartStore } from '@/stores/cart';

import { convertNumToPriceVND } from '@/utils/format';

import NavBarHeader from '@/components/NavBarHeader.vue';
import PreviewProductCart from '@/components/PreviewProductCart.vue';

const { cart, totalQuantity, totalPrice, removeOutCart, getCartInFirestore } = cartStore();


// khai báo biến tham chiếu đến dropdown, khi value của dropdown thay đổi thì seclected cũng bị thay đổi
const selected = ref('all');

// Lấy ra user hiện tại đăng nhập
const { getUser } = useUser();
const { user } = getUser();
</script>

<template>
  <div class="bg-white z-[99]">
    <div class="max-w-[1200px] mx-auto">
      <div class="flex justify-between items-center py-2">
        <!-- Logo -->
        <router-link to="/">
          <div class="w-52">
            <img
              src="https://shopreview.vn/wp-content/uploads/2020/12/logo-Copy-2.png"
              alt=""
              class="w-full h-auto"
            /></div
        ></router-link>

        <!-- Tìm kiếm -->
        <div class="flex items-center border border-primary rounded-md w-[500px] relative overflow-hidden">
          <input
            type="text"
            placeholder="Tìm kiếm các danh mục, sản phẩm..."
            class="outline-none h-full w-full py-3 pl-4 text-sm"
          />
          <button class="bg-primary-hover h-full w-full py-2 px-6 rounded-tr-md rounded-br-md w-[50px] absolute top-0 bottom-0 right-0">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-white" />
          </button>
        </div>

        <!-- Đăng nhập và giỏ hàng -->
        <div class="flex items-center text-[13px] font-semibold">
          <div v-if="!user" class="mr-4 text-dark-light">
            <router-link :to="{ name: 'dang-nhap', params: {} }">ĐĂNG NHẬP</router-link>
          </div>

          <div v-else class="mr-4 text-dark-light">
            <router-link :to="{ name: 'tai-khoan', params: {} }">{{
              user.displayName
            }}</router-link>
          </div>

          <div class="relative cart-hover">
            <!-- giỏ hang -->
            <router-link to="/gio-hang" class="py-2">
              <div class="flex items-center text-primary">
                <div class="mr-2">GIỎ HÀNG</div>

                <div
                  class="border-2 border-primary rounded-full h-8 w-8 flex justify-center items-center relative"
                >
                  <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                  <div
                    v-if="cart.length != 0"
                    class="w-5 h-5 bg-primary rounded-full absolute bottom-[80%] left-[80%] flex justify-center items-center text-white text-sm font-semibold"
                  >
                    {{ totalQuantity() }}
                  </div>
                </div>
              </div>
            </router-link>

            <!-- dropdown của giỏ hàng -->
            <div
              class="absolute w-[300px] top-full right-0 bg-white shadow-[1px_1px_15px_rgba(0,0,0,0.15)] p-4 z-[99] cart-dropdown"
            >
              <!-- nếu giỏ hàng k có sản phẩm -->
              <div v-if="cart.length == 0" class="text-center font-normal text-[16px]">
                Chưa có sản phẩm trong giỏ hàng.
              </div>

              <!-- nếu giỏ hàng có sản phẩm -->
              <div v-else>
                <!-- preview sản phẩm trong giỏ hàng trên header -->
                <div class="max-h-[400px] overflow-y-scroll">
                  <preview-product-cart
                    v-for="product in cart"
                    :key="product.index"
                    :product="product"
                    @on-remove-out-cart="removeOutCart"
                  />
                </div>

                <div class="border-t border-b border-t-gray-300 border-b-gray-300 py-3 text-center">
                  Tổng phụ: {{ convertNumToPriceVND(totalPrice()) }}₫
                </div>

                <!-- điều hướng -->
                <div class="text-center text-white">
                  <router-link
                    :to="{ name: 'gio-hang' }"
                    class="bg-primary transition-all hover:bg-primary-hover py-2 block my-4"
                    >GIỎ HÀNG</router-link
                  >

                  <router-link :to="{ name: 'thanh-toan' }" class="bg-primary-hover py-2 block"
                    >THANH TOÁN</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-bar-header />
  </div>
</template>

<style scoped>
.cart-dropdown {
  display: none;
  transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.cart-hover:hover .cart-dropdown {
  display: block;
}
</style>
