<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLogin } from '@/composable/useLogin';
import RectangularButton from '@/components/RectangularButton.vue';

const router = useRouter();

const { isPending, error, onLogin } = useLogin();

const emailInput = ref('');
const passwordInput = ref('');

const onSubmitLoginForm = async () => {
  await onLogin(emailInput.value, passwordInput.value);

  // nếu không lỗi đăng nhập xong bay về trang chủ
  if (!error.value) {
    router.go({ name: 'trang-chu', params: {} });
  }
};
</script>

<template>
  <div class="flex justify-center">
    <div class="py-16 w-[700px]">
      <h2 class="font-bold text-xl my-2">ĐĂNG NHẬP</h2>
      <form action="" @submit.prevent="onSubmitLoginForm">
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

        <rectangular-button> {{ isPending ? 'Loading...' : 'ĐĂNG NHẬP' }} </rectangular-button>

        <div class="flex items-center">
          <router-link
            class="text-primary mr-4 hover:text-dark"
            :to="{ name: 'quen-mat-khau', params: {} }"
            >Quên mật khẩu ?</router-link
          >

          <router-link class="ml-4 hover:text-primary" :to="{ name: 'dang-ky', params: {} }"
            >Chưa có tài khoản? Đăng ký</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
