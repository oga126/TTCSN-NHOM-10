<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { cartStore } from '@/stores/cart';
import { convertNumToPriceVND } from '@/utils/format';

const router = useRouter();
const { cart, totalPrice } = cartStore();

const isLoading = ref(false);

const submitFormHandler = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    router.push({
      name: 'thong-tin-don-hang',
      
    });
  }, 2000);
};
</script>

<template>
  <div class="max-w-[1200px] mx-auto pt-10 pb-24">
    <form @submit.prevent="submitFormHandler" action="" method="POST" class="flex justify-between">
      <!-- trường nhập thông tin -->
      <div class="w-[55%] mr-10 border-t-2 border-t-gray-300">
        <h2 class="font-semibold py-4">THANH TOÁN VÀ GIAO HÀNG</h2>

        <!-- Tên -->
        <label for="name" class="block pb-4">
          <div class="font-bold text-sm mb-2">Họ và tên *</div>
          <input
            required
            type="text"
            name="name"
            id="name"
            class="w-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-gray-300 py-[2px] pl-4 outline-none appearance-none focus:shadow-[0_0_5px_#ccc] hover:shadow-none"
            placeholder="Nhập đầy đủ họ tên của bạn"
          />
        </label>

        <!-- địa chỉ -->
        <label for="address" class="block pb-4">
          <div class="font-bold text-sm mb-2">Địa chỉ *</div>
          <input
            required
            type="text"
            name="address"
            id="address"
            class="w-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-gray-300 py-[2px] pl-4 outline-none appearance-none focus:shadow-[0_0_5px_#ccc] hover:shadow-none"
            placeholder="Ví dụ: Số xxx Ngõ xxx Nguyên Xá, Minh Khai, Bắc Từ Liêm, Hà Nộ"
          />
        </label>

        <!-- sdt -->
        <label for="phone" class="block pb-4">
          <div class="font-bold text-sm mb-2">Số điện thoại *</div>
          <input
            required
            type="text"
            name="phone"
            id="phone"
            class="w-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-gray-300 py-[2px] pl-4 outline-none appearance-none focus:shadow-[0_0_5px_#ccc] hover:shadow-none"
          />
        </label>

        <!-- email - không bắt buộc -->
        <label for="email" class="block pb-4">
          <div class="font-bold text-sm mb-2">Số điện thoại *</div>
          <input
            type="email"
            name="email"
            id="email"
            class="w-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-gray-300 py-[2px] pl-4 outline-none appearance-none focus:shadow-[0_0_5px_#ccc] hover:shadow-none"
          />
        </label>
      </div>

      <!-- xem trước và xác nhận -->
      <div class="flex-1 border-2 border-primary p-6">
        <div class="font-bold pb-3">ĐƠN HÀNG CỦA BẠN</div>

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
              <td class="py-2 text-[#666]">
                {{ product.name }}
                <span class="font-semibold">x {{ product.quantity }}</span>
              </td>
              <td class="py-2 text-right font-bold whitespace-nowrap">{{ product.cur_price }}₫</td>
            </tr>

            <!-- tổng phụ -->
            <tr class="border-b border-b-gray-300 font-bold whitespace-nowrap">
              <td class="py-2">Tổng phụ</td>
              <td class="py-2 text-right">{{ convertNumToPriceVND(totalPrice()) }}₫</td>
            </tr>

            <!-- phí ship -->
            <tr class="border-b border-b-gray-300 text-[#666] whitespace-nowrap">
              <td class="py-2">Giao hàng</td>
              <td class="py-2 text-right">Phí ship: <span class="font-semibold">25.000₫</span></td>
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

        <p class="font-bold text-sm py-4">Trả tiền mặt khi nhận hàng</p>

        <button
          class="py-2 px-4 bg-primary text-white font-semibold transition-all hover:bg-primary-hover"
        >
          <div v-if="!isLoading">ĐẶT HÀNG</div>
          <div v-else>Loading...</div>
        </button>

        <p class="text-sm py-2">
          Nhân viên tư vấn sẽ liên hệ với quý khách sớm nhất ngay sau khi đặt hàng!
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
