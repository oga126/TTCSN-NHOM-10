<script setup>
import { ref } from 'vue';
import { TEL } from '@/constants/index';

const NAVBAR_LINK_ITEMS = [
  {
    title: 'Trang chủ',
    router: {
      name: 'trang-chu'
    }
  },
  {
    title: 'Đèn pha năng lượng mặt trời',
    router: {
      name: 'products-by-type',
      params: { type: 'den-pha-nang-luong-mat-troi' }
    }
  },
  {
    title: 'Đèn trang trí năng lượng mặt trời',
    router: {
      name: 'products-by-type',
      params: { type: 'den-trang-tri-nang-luong-mat-troi' }
    }
  },
  {
    title: 'Đèn trụ cổng, trụ cột',
    router: {
      name: 'products-by-type',
      params: { type: 'den-tru-cong-tru-cot' }
    }
  },
  {
    title: 'Tấm pin năng lượng mặt trời',
    router: {
      name: 'products-by-type',
      params: { type: 'tam-pin-nang-luong-mat-troi' }
    }
  },
  {
    title: 'Liên hệ',
    router: {
      name: 'lien-he'
    }
  }
];

const NAVBAR_CATEGORY = [
  {
    title: 'Thế giới đồ cắm trại',
    router: {
      name: 'the-gioi-do-cam-trai'
    }
  },
  {
    title: 'Đèn năng lượng mặt trời',
    router: {
      name: 'den-nang-luong-mat-troi'
    }
  },
  {
    title: 'Thế giới máy đo',
    router: {
      name: 'the-gioi-may-do'
    }
  },
  {
    title: 'Phụ kiện ô tô',
    router: {
      name: 'phu-kien-o-to'
    }
  }
];

// biển để kiểm tra button đã click để show dropdown hay không
const isShowProductCategories = ref(false);
</script>

<template>
  <div class="border-t border-t-gray-200 shadow-[0px_10px_13px#0000000d]">
    <div class="max-w-[1200px] mx-auto">
      <div class="flex items-center">
        <!-- navbar dropdown-->
        <div class="w-80 relative">
          <button
            @click="isShowProductCategories = !isShowProductCategories"
            class="text-white bg-primary w-full flex items-center justify-center py-4"
          >
            <font-awesome-icon icon="fa-solid fa-bars" />
            <p class="font-bold uppercase ml-4">Danh mục sản phẩm</p>
          </button>

          <div
            v-if="isShowProductCategories"
            class="z-10 absolute bg-white top-full left-0 right-0"
          >
            <router-link
              v-for="link in NAVBAR_CATEGORY"
              :key="link.title"
              :to="link.router"
              class="py-2 px-6 border border-t-0 border-gray-300 flex justify-between items-center hover:bg-gray-200 transition-all"
            >
              <p>{{ link.title }}</p>
              <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-gray-400 text-sm" />
            </router-link>
          </div>
        </div>

        <!-- Link -->
        <ul class="flex justify-center items-center flex-wrap">
          <li
            v-for="link in NAVBAR_LINK_ITEMS"
            :key="link.title"
            class="mr-4 hover:text-primary-light transition-all"
          >
            <router-link :to="link.router">{{ link.title }}</router-link>
          </li>
        </ul>

        <!-- Telephone number -->
        <a
          :href="TEL.href"
          class="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all"
          >{{ TEL.display }}</a
        >
      </div>
    </div>
  </div>
</template>
