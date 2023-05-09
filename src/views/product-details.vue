<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getListProductByType, getProductBySlugyNameInList } from '../../data/service';

import RecommenedProducts from '@/components/RecommenedProducts.vue';

const route = useRoute();
const router = useRouter();

// fake loading
const isLoading = ref(false);

// ẩn hiện mô tả
const isShowDescription = ref(true);
// biến tham chiếu tới input số lượng
const quantity = ref(1);

// // lấy ra product theo đúng đường dẫn
const products = ref({});
const product = ref({});
// nếu params của path thay đổi thì sẽ gọi làm callback truyền và watchEfect
watchEffect(() => {
  products.value = getListProductByType(route.params.type);

  product.value = getProductBySlugyNameInList(route.params.slugy, products.value.products);
});

// hàm giảm số lượng
const descrease = () => {
  if (quantity.value > 1) quantity.value--;
  else return;
};
// hàm giảm số lượng
const increase = () => {
  quantity.value++;
};
</script>

<template>
  <div class="bg-[#F8F8F8]">
    <div class="max-w-[1200px] mx-auto py-4">
      <!-- over view -->
      <div class="flex">
        <!-- images slide -->
        <div class="w-[30%]">
          <img :src="product.thumbnail" alt="" class="w-full h-auto object-contain" />
        </div>

        <!-- name, price, buy, add to cart, index, ... -->
        <div class="bg-white p-4 ml-6">
          <!-- links -->
          <div class="text-dark-light text-sm transition-all">
            <router-link class="hover:text-dark" to="/">Trang chủ</router-link>
            /
            <router-link class="hover:text-dark" to="cua-hang">Cửa hàng</router-link>
            /
            <router-link
              class="hover:text-dark"
              :to="{
                name: 'products-by-type',
                params: {
                  type: product.type,
                },
              }"
              >{{ products.name }}</router-link
            >
          </div>

          <!-- name -->
          <h2 class="font-bold text-xl text-header-dark py-2">{{ product.name }}</h2>

          <!-- price -->
          <div class="flex items-end">
            <p class="line-through text-dark-light text-md mr-2">{{ product.price }}₫</p>
            <p class="text-[#e04c78] text-2xl">{{ product.cur_price }}₫</p>
          </div>

          <!-- chọn số lượng, mua, thêm vào giỏ -->
          <div class="flex my-4">
            <!-- input -->
            <div class="relative border border-gray-300">
              <input
                type="submit"
                value="-"
                class="absolute bg-gray-100 w-10 top-0 bottom-0 left-0 cursor-pointer"
                @click="descrease"
              />
              <input
                type="number"
                min="0"
                max="999"
                step="1"
                required
                class="w-[130px] h-full outline-none text-center pl-2"
                v-model="quantity"
              />
              <input
                type="submit"
                value="+"
                class="absolute bg-gray-100 w-10 top-0 bottom-0 right-0 cursor-pointer"
                @click="increase"
              />
            </div>

            <!-- buy now -->
            <button
              @click="buyNow"
              class="bg-primary-light transition-all hover:bg-[#709E32] py-2 px-6 text-white rounded-md mx-6"
            >
              {{ isLoading ? 'Loading...' : 'MUA NGAY' }}
            </button>

            <!-- add to cart -->
            <button
              class="bg-primary transition-all hover:bg-primary-hover py-2 px-6 text-white font-bold"
              @click="onAddToCart"
            >
              {{ isLoading ? 'Loading...' : 'THÊM VÀO GIỎ' }}
              <!-- THÊM VÀO GIỎ -->
            </button>
          </div>

          <!-- id -->
          <div class="py-1 border-t border-b border-dotted">Mã: {{ product.index }}</div>

          <!-- danh mục -->
          <div class="mt-4">
            Danh mục:
            <router-link
              :to="{
                name: 'products-by-type',
                params: {
                  type: product.type,
                },
              }"
              class="text-primary transition-all hover:text-dark"
              >{{ products.name }}</router-link
            >
          </div>
        </div>
      </div>

      <!-- description -->
      <div class="border-b boder-t border-t-gray-300 border-b-gray-300">
        <!-- button -->
        <div class="flex justify-center items-center">
          <button
            @click="isShowDescription = true"
            class="mx-4 border-t-4 transition-all hover:border-t-primary py-4 font-bold text-header-dark text-xl"
            :class="{
              'border-t-primary': isShowDescription,
              'border-t-transparent': !isShowDescription,
            }"
          >
            Mô tả
          </button>
          <button
            @click="isShowDescription = false"
            class="mx-4 border-t-4 transition-all hover:border-t-primary py-4 font-bold text-header-dark text-xl"
            :class="{
              'border-t-primary': !isShowDescription,
              'border-t-transparent': isShowDescription,
            }"
          >
            Thông tin thanh toán
          </button>
        </div>

        <!-- description -->
        <ol v-if="isShowDescription" class="list-inside list-decimal marker:text-header-blue">
          <!-- Thông số kỹ thuật -->
          <div>
            <li class="mb-4 text-header-blue font-bold text-xl">
              Thông số kỹ thuật {{ product.name }}
            </li>

            <!-- specifications -->
            <div>
              <div class="font-bold text-[18px] my-2">+ Thông số kỹ thuật:</div>
              <ul class="list-inside list-disc">
                <li
                  v-for="li in product.specifications"
                  :key="li"
                  class="marker:text-black mb-2 text-[18px]"
                >
                  {{ li }}
                </li>
              </ul>
            </div>

            <!-- features -->
            <div>
              <div class="font-bold text-[18px] my-2">+ Thông số kỹ thuật:</div>
              <ul class="list-inside list-disc">
                <li
                  v-for="li in product.features"
                  :key="li"
                  class="marker:text-black mb-2 text-[18px]"
                >
                  {{ li }}
                </li>
              </ul>
            </div>

            <!-- mode -->
            <div>
              <div class="font-bold text-[18px] my-2">+ Thông số kỹ thuật:</div>
              <ul class="list-inside list-disc">
                <li v-for="li in product.mode" :key="li" class="marker:text-black mb-2 text-[18px]">
                  {{ li }}
                </li>
              </ul>
            </div>

            <!-- suitable -->
            <div>
              <div class="font-bold text-[18px] my-2">+ Thông số kỹ thuật:</div>
              <ul class="list-inside list-disc">
                <li
                  v-for="li in product.suitable"
                  :key="li"
                  class="marker:text-black mb-2 text-[18px]"
                >
                  {{ li }}
                </li>
              </ul>
            </div>
          </div>

          <!-- bảo hành -->
          <div>
            <li class="mb-4 text-header-blue font-bold text-xl">
              Chế độ bảo hành {{ product.name }}
            </li>
            <ul class="list-inside list-disc">
              <li class="marker:text-black mb-2 text-[18px]">
                Bảo hành 2 năm mọi lỗi của sản phẩm
              </li>
              <li class="marker:text-black mb-2 text-[18px]">
                Bảo hành hoàn tiền 100% trong 7 ngày đầu nếu quý khách mua về không hài lòng về sản
                phẩm
              </li>
            </ul>
          </div>

          <!-- cam kết -->
          <div>
            <li class="mb-4 text-header-blue font-bold text-xl">
              Cam kết về sản phẩm và chính sách giao hàng {{ product.name }}
            </li>
            <ul class="list-inside list-disc">
              <li class="marker:text-black mb-2 text-[18px]">
                Đây là sản phẩm model mới cao cấp, sử dụng bền bỉ, là một lựa chọn tuyệt vời của quý
                khách
              </li>
              <li class="marker:text-black mb-2 text-[18px]">
                Shop bán hàng có TÂM, lấy UY TÍN làm trọng, 100% giá gốc tại kho
              </li>
              <li class="marker:text-black mb-2 text-[18px] text-red font-bold">
                100% ảnh thật, video thật, review thật, chất lượng thật nên quý khách hoàn toàn yên
                tâm khi mua sản phẩm của shop
              </li>
              <li class="marker:text-black mb-2 text-[18px] text-red font-bold">
                CAM KẾT GIÁ BÁN LUÔN RẺ NHẤT KHÔNG GIAN MẠNG QUÝ KHÁCH HOÀN TOÀN YÊN TÂM MUA SẮM
              </li>
              <li class="marker:text-black mb-2 text-[18px] text-red font-bold">
                QUÝ KHÁCH NHẬN HÀNG, KIỂM TRA HÀNG ĐẦY ĐỦ ĐÚNG SỐ LƯỢNG CHỦNG LOẠI VÀ CHẤT LƯỢNG MỚI
                THANH TOÁN.
              </li>
            </ul>
          </div>

          <!-- video -->
          <div>
            <li class="mb-4 text-header-blue font-bold text-xl">
              Video giới thiệu {{ product.name }}
            </li>
            <!-- vid 1 -->
            <div class="flex justify-center mb-4">
              <div v-html="product.videos[0]"></div>
            </div>
            <!-- vid 2 nếu có -->
            <div v-if="product.videos[1]">
              <div class="font-bold py-4">Video ánh sáng buổi tối:</div>
              <div class="flex justify-center mb-4">
                <div v-html="product.videos[1]"></div>
              </div>
            </div>
          </div>

          <!-- ảnh -->
          <div>
            <li class="mb-4 text-header-blue font-bold text-xl">
              Hình ảnh về sản phẩm {{ product.name }}

              <div class="">
                <div
                  v-for="(img, index) in product.images"
                  :key="index"
                  class="flex justify-center my-5"
                >
                  <img :src="img" alt="" class="w-[70%]" />
                </div>
              </div>
            </li>
          </div>
        </ol>
      </div>

      <!-- recommended products: slide -->
      <recommened-products :products="products.products" />
    </div>
  </div>
</template>
