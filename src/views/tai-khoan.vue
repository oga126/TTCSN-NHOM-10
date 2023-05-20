<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { auth } from '@/config/firebase';
import { useLogout } from '@/composable/onLogout';

import RectangularButton from '@/components/RectangularButton.vue';

// lấy ra user đang đăng nhập để hiển thị tên
const user = computed(() => auth.currentUser);

const router = useRouter();

const { onLogout } = useLogout();

// hàm bấm button đăng xuất
const logoutHandler = async () => {
  await onLogout();
  router.push({ name: 'dang-nhap', params: {} });
};
</script>

<template>
  <div class="flex justify-center">
    <div class="py-16">
      <h2 class="font-bold text-xl">Xin chào {{ user.displayName }}!</h2>
      <div>Số điện thoại: {{ user.phoneNumber }}</div>
      <div>Địa chỉ email: {{ user.email }}</div>

      <div class="flex">
        <rectangular-button class="mr-4">Cập nhật thông tin</rectangular-button>

        <rectangular-button @click="logoutHandler">ĐĂNG XUẤT</rectangular-button>
      </div>
    </div>
  </div>
</template>
