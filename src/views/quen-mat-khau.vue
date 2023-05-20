<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { auth } from '@/config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

import RectangularButton from '@/components/RectangularButton.vue';

const error = ref(null);
const isPending = ref(false);

const router = useRouter();
const emailInput = ref('');

const onSubmit = async () => {
  isPending.value = true;
  try {
    // gửi thư xác nhận đặt lại mật khẩu (firebase authentication service)
    await sendPasswordResetEmail(auth, emailInput.value);

    alert(
      `Chúng tôi đã thư đến địa chỉ ${emailInput.value} của bạn, vui lòng xác nhận tại hộp thư`,
    );
    router.push({ name: 'dang-nhap', params: {} });
  } catch (err) {
    error.value = err.message;
    console.log(error.value);
  } finally {
    isPending.value = false;
  }
};
</script>

<template>
  <div class="flex justify-center py-16">
    <div>
      <div>
        Quên mật khẩu? Vui lòng nhập tên đăng nhập hoặc địa chỉ email. Bạn sẽ nhận được một liên kết
        tạo mật khẩu mới qua email.
      </div>

      <form action="" @submit.prevent="onSubmit">
        <label for="email">
          <div class="font-bold">Địa chỉ email</div>
          <input
            class="border border-gray-400 block w-full outline-none appearance-none pl-4 py-1 hover:shadow-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] focus:shadow-[0_0_5px_#ccc]"
            type="email"
            name="email"
            id="email"
            required
            v-model="emailInput"
          />
        </label>

        <div class="text-red" v-if="error">{{ error }}</div>

        <rectangular-button>{{
          !isPending ? 'Đặt lại mật khẩu' : 'Loading...'
        }}</rectangular-button>
      </form>
    </div>
  </div>
</template>
