<script setup>
import { TEL } from '@/constants';
</script>

<template>
  <div class="fixed right-4 bottom-4">
    <!-- Messenger -->
    <a
      target="_blank"
      href="https://fb.com/msg/ShopReview.vn"
      class="mb-4 w-12 h-12 rounded-full flex justify-center items-center bg-[#4267b2] shadow-[0_0_10px_-2px_rgba(0,0,0,0.7)]"
    >
      <img
        class="w-[60%] h-auto object-contain"
        src="https://shopreview.vn/wp-content/uploads/2021/10/messenger.png"
        alt=""
      />
    </a>

    <!-- Zalo -->
    <a
      target="_blank"
      href="https://zalo.me/0982888431"
      class="w-12 h-12 rounded-full flex justify-center items-center bg-[#5ac5ef] shadow-[0_0_10px_-2px_rgba(0,0,0,0.7)]"
    >
      <img
        class="w-[60%] h-auto object-contain"
        src="https://shopreview.vn/wp-content/uploads/2021/10/zalo.png"
        alt=""
      />
    </a>
  </div>

  <!-- Fixed Telephone Button -->
  <div class="fixed bottom-8 left-10">
    <a :href="TEL.href" class="flex items-center bg-primary-light rounded-full text-white">
      <div class="w-12 h-12 bg-primary rounded-full flex justify-center items-center relative">
        <font-awesome-icon icon="fa-solid fa-phone" class="ring_icon" />
        <div class="absolute w-[70px] h-[70px] bg-black rounded-full z-[-1] circle_fill"></div>
        <div class="absolute w-[120px] h-[120px] border border-black rounded-full circle_border"></div>
      </div>
      <p class="px-2">{{ TEL.display }}</p>
    </a>
  </div>
</template>

<style scoped>
.ring_icon {
  animation: ring 1s infinite ease-in-out;
}
.circle_fill {
  animation: fil 2s infinite ease-in-out;
}

.circle_border {
  animation: borderr 2s infinite ease-in-out;
}

@keyframes ring {
  0% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
  }

  10% {
    -webkit-transform: rotate(-25deg) scale(1) skew(1deg);
  }
  20% {
    -webkit-transform: rotate(25deg) scale(1) skew(1deg);
  }
  30% {
    -webkit-transform: rotate(-25deg) scale(1) skew(1deg);
  }
  40% {
    -webkit-transform: rotate(25deg) scale(1) skew(1deg);
  }
  50% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
  }
  100% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
  }
}

@keyframes fil {
  0% {
    -webkit-transform: rotate(0) scale(0.7) skew(1deg);
    opacity: 0.2;
  }

  50% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
    opacity: 0.2;
  }
  100% {
    -webkit-transform: rotate(0) scale(0.7) skew(1deg);
    opacity: 0.2;
  }
}

@keyframes borderr {
  0% {
    -webkit-transform: rotate(0) scale(0.5) skew(1deg);
    -webkit-opacity: 0.1;
  }

  30% {
    -webkit-transform: rotate(0) scale(0.7) skew(1deg);
    -webkit-opacity: 0.5;
  }
  100% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
    -webkit-opacity: 0.1;
  }
}
</style>
