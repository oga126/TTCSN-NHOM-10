<script setup>
import { ref } from 'vue';
import { auth } from '@/config/firebase';
import { cartStore } from '@/stores/cart';
import { convertNumToPriceVND, convertPriceVNDToNum } from '@/utils/format';

const { cart, totalPrice, removeOutCart } = cartStore();

// lấy ra user đang đăng nhập
const user = auth.currentUser;

// biến tham chiếu tới input số lượng
const quantity = ref(cart.map((product) => product.quantity));
// hàm giảm số lượng
const descrease = (i) => {
  if (quantity.value[i] > 1) quantity.value[i]--;
  else return;
};
// hàm giảm số lượng
const increase = (i) => {
  quantity.value[i]++;
};
</script>

<template>
  <div class="flex justify-center">
    <div class="pt-16">
      <h2 class="font-bold text-xl">Xin chào {{ user.displayName }}!</h2>
    </div>
  </div>
  <!-- nếu giỏ hàng trống -->
  <div v-if="cart.length == 0" class="text-center py-24">
    <div class="mb-6">Chưa có sản phẩm nào trong giỏ hàng.</div>

    <router-link to="/" class="bg-primary py-2 px-6 text-white text-[18px] font-semibold"
      >QUAY LẠI CỬA HÀNG</router-link
    >
  </div>

  <!-- nếu giỏ hàng có sản phẩm -->
  <div v-else class="max-w-[1200px] mx-auto py-10">
    <div class="flex">
      <!-- sản phẩm -->
      <div class="relative overflow-x-auto flex-1 pr-6">
        <table class="w-full text-left">
          <!-- header -->
          <thead class="text-sm text-dark uppercase border-b-2">
            <tr class="whitespace-nowrap">
              <th scope="col" class="px-2 py-3">Sản phẩm</th>
              <th scope="col" class="px-2 py-3">Giá</th>
              <th scope="col" class="px-2 py-3">Số lượng</th>
              <th scope="col" class="px-2 py-3">Tổng</th>
            </tr>
          </thead>

          <!-- products -->
          <tbody>
            <tr class="bg-white border-b w-full" v-for="(product, i) in cart" :key="product.index">
              <td class="px-2 py-4 font-medium text-gray-900 flex items-center">
                <!-- button xóa sản phẩm khỏi giỏ hàng -->
                <div class="mr-4">
                  <button
                    @click="removeOutCart(product.index)"
                    class="text-gray-300 text-xs border border-gray-300 flex justify-center items-center w-6 h-6 rounded-full"
                  >
                    &#x2716;
                  </button>
                </div>

                <!-- link sản phẩm -->
                <router-link
                  :to="{
                    name: 'product-details',
                    params: { type: product.type, slugy: product.slugy_name },
                  }"
                  class="flex items-center"
                >
                  <div class="w-[150px] mr-4">
                    <img
                      :src="product.thumbnail"
                      alt="error"
                      class="w-full h-auto object-contain"
                    />
                  </div>
                  <p class="text-primary transition-all hover:text-dark">
                    {{ product.name }}
                  </p>
                </router-link>
              </td>

              <td class="px-2 py-4 text-header-dark font-semibold">{{ product.cur_price }}₫</td>

              <td class="px-2 py-4">
                <!-- input -->
                <div class="relative border border-gray-300">
                  <input
                    type="submit"
                    value="-"
                    class="absolute bg-gray-100 w-6 top-0 bottom-0 left-0 cursor-pointer"
                    @click="descrease(i)"
                  />
                  <input
                    type="number"
                    min="0"
                    max="999"
                    step="1"
                    required
                    class="w-[80px] h-full outline-none text-center pl-2"
                    v-model="quantity[i]"
                  />
                  <input
                    type="submit"
                    value="+"
                    class="absolute bg-gray-100 w-6 top-0 bottom-0 right-0 cursor-pointer"
                    @click="increase(i)"
                  />
                </div>
              </td>
              <!-- giá -->
              <td class="px-2 py-4 text-header-dark font-semibold">
                {{ convertNumToPriceVND(convertPriceVNDToNum(product.cur_price) * quantity[i]) }}₫
              </td>
            </tr>
          </tbody>
        </table>

        <!-- đường dẫn -->
        <div class="flex items-center py-4">
          <router-link
            to="/"
            class="px-6 py-2 border-2 border-primary transition-all hover:bg-primary hover:text-white text-primary font-semibold uppercase"
            >&#x2190; Tiếp tục xem sản phẩm</router-link
          >
          <button
            class="ml-6 px-6 py-[10px] uppercase text-white font-semibold bg-primary hover:bg-primary-hover"
          >
            Cập nhật giỏ hàng
          </button>
        </div>
      </div>

      <!-- thanh toán -->
      <div class="w-[40%] pl-6 border-l border-l-gray-300">
        <div class="text-sm font-semibold text-dark uppercase py-3">TỔNG SỐ LƯỢNG</div>

        <div class="border-t-2 border-b-2 border-t-gray-300 border-b-gray-300">
          <div class="flex justify-between items-center py-2 border-b border-b-gray-300">
            <p>Tổng phụ</p>
            <p class="font-semibold">{{ convertNumToPriceVND(totalPrice()) }}₫</p>
          </div>

          <div
            class="flex justify-between items-center py-2 border-b border-b-gray-300 text-dark-light"
          >
            <p>Giao hàng</p>
            <div class="text-sm text-right">
              <p class="pb-2">Phí ship: <span class="font-semibold">25.000₫</span></p>
              <p>Shipping options will be updated during checkout.</p>
            </div>
          </div>

          <div class="flex justify-between items-center py-2">
            <p>Tổng</p>
            <p class="font-semibold">{{ convertNumToPriceVND(totalPrice() + 250000) }}₫</p>
          </div>
        </div>

        <router-link
          :to="{
            name: 'thanh-toan',
            meta: {
              cart: cart,
            }
          }"
          class="text-white font-semibold bg-primary-hover transition-all hover:bg-primary py-2 block text-center mt-8"
          >TIẾN HÀNH ĐẶT HÀNG</router-link
        >
      </div>
    </div>
  </div>
</template>
