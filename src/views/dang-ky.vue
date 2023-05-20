<script setup>
import { ref } from 'vue';
import RectangularButton from '@/components/RectangularButton.vue';
import { useSignup } from '@/composable/useSignup';
import { useRouter } from 'vue-router';

const router = useRouter();

const { error, isPending, onSignup } = useSignup();

const nameInput = ref('');
const emailInput = ref('');
const passwordInput = ref('');

const onSubmitSignupForm = async () => {
  // gọi hàm đăng ký
  await onSignup(emailInput.value, passwordInput.value, nameInput.value);

  // nếu không lỗi thì đăng ký xong bay về trang chủ
  if (!error.value) {
    router.push({ name: 'trang-chu', params: {} });
  }
};
</script>

<template>
  <div class="flex justify-center">
    <div class="py-16 w-[700px]">
      <h2 class="font-bold text-xl my-2">ĐĂNG KÝ</h2>
      <form action="" @submit.prevent="onSubmitSignupForm">
        <label class="py-2 block" for="name">
          <div class="font-bold">Họ và tên *</div>
          <input
            class="border border-gray-400 block w-full outline-none appearance-none pl-4 py-2 hover:shadow-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] focus:shadow-[0_0_5px_#ccc]"
            type="text"
            name="name"
            id="name"
            required
            v-model="nameInput"
          />
        </label>

        <label class="py-2 block" for="email">
          <div class="font-bold">Địa chỉ email *</div>
          <input
            class="border border-gray-400 block w-full outline-none appearance-none pl-4 py-2 hover:shadow-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] focus:shadow-[0_0_5px_#ccc]"
            type="email"
            name="email"
            id="email"
            required
            v-model="emailInput"
          />
        </label>

        <label class="py-2 block" for="password">
          <div class="font-bold">Mật khẩu *</div>
          <input
            class="border border-gray-400 block w-full outline-none appearance-none pl-4 py-2 hover:shadow-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] focus:shadow-[0_0_5px_#ccc]"
            type="password"
            name="password"
            id="password"
            required
            v-model="passwordInput"
          />
        </label>

        <div class="text-red" v-if="error">{{ error }}</div>

        <rectangular-button> {{ !isPending ? 'ĐĂNG KÝ' : 'Loading...' }} </rectangular-button>

        <router-link class="hover:text-primary" :to="{ name: 'dang-nhap', params: {} }"
          >Đã có tài khoản? Đăng nhập</router-link
        >
      </form>
    </div>
  </div>
</template>
