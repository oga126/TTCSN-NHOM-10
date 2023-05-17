<script setup>
import { cartStore } from '@/stores/cart';
import { convertNumToPriceVND } from '@/utils/format';
import { useRoute } from 'vue-router';

const { cart, totalPrice } = cartStore();

const route = useRoute();
console.log(route);
</script>

<template>
  <div class="max-w-[1200px] mx-auto pt-10 pb-24">
    <div class="flex justify-between items-start">
      <div class="w-[55%] mr-10">
        <h2 class="font-semibold text-2xl py-4">Chi tiết đơn hàng</h2>

        <table class="w-full">
          <!-- tiêu đề -->
          <thead class="text-sm font-semibold border-b-2 border-b-gray-300 whitespace-nowrap">
            <tr class="">
              <td class="py-2">SẢN PHẨM</td>
              <td class="text-right py-2">TỔNG</td>
            </tr>
          </thead>

          <tbody class="text-sm text-dark">
            <!-- sản phẩm -->
            <tr class="border-b border-b-gray-300" v-for="product in cart" :key="product.index">
              <td class="py-2 text-primary">
                {{ product.name }}
                <span class="font-semibold text-[#666]">x {{ product.quantity }}</span>
              </td>
              <td class="py-2 text-right font-bold whitespace-nowrap">{{ product.cur_price }}₫</td>
            </tr>

            <!-- tổng phụ -->
            <tr class="border-b border-b-gray-300 font-bold whitespace-nowrap">
              <td class="py-2">Tổng phụ</td>
              <td class="py-2 text-right">{{ convertNumToPriceVND(totalPrice()) }}₫</td>
            </tr>

            <!-- phí ship -->
            <tr class="border-b border-b-gray-300 font-bold whitespace-nowrap">
              <td class="py-2">Giao nhận hàng:</td>
              <td class="py-2 text-right flex items-center">
                <span class="">25.000₫</span>
                <span class="text-dark-light font-normal text-xs ml-2">qua Phí ship</span>
              </td>
            </tr>
          </tbody>

          <!-- tổng tất cả -->
          <tfoot class="text-sm font-semibold border-b-2 border-b-gray-300 whitespace-nowrap">
            <tr class="">
              <td class="py-2">Tổng</td>
              <td class="py-2 text-right">{{ convertNumToPriceVND(totalPrice() + 25000) }}₫</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div
        class="flex-1 px-6 pt-6 pb-10 bg-[#FAFAFA] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),0_1px_0_rgba(0,0,0,0.07),inset_0_0_0_1px_rgba(0,0,0,0.05)]"
      >
        <div class="text-primary-light font-semibold pb-4">
          Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
        </div>
        <ul class="list-disc list-inside">
          <li class="py-2">Mã đơn hàng: <b>xxxx</b></li>
          <li class="py-2">Ngày: <b>15/04/2023</b></li>
          <li class="py-2">
            Tổng cộng: <b>{{ convertNumToPriceVND(totalPrice() + 25000) }}₫ </b>
          </li>
          <li class="py-2">Phương thức thanh toán: <b>Trả tiền mặt khi nhận hàng</b></li>
        </ul>
      </div>
    </div>
  </div>
</template>
