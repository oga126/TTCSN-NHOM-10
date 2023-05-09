<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import { getListProductByType } from '../../data/service';
import { convertNumToPriceVND, convertPriceVNDToNum } from '@/utils/format';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

import ProductCard from '@/components/ProductCard.vue';

const route = useRoute();
const selection = ref('default');

// lấy ra obj có type giống với trên đường dẫn(path)
const target = ref([]);

// Tìm giá thấp nhất và cao nhất trong danh sách sản phẩm cùng loại
const min = ref(0);
const max = ref(0);
// gán vào giá trị để làm range slider
const value = ref([]);

// khởi tạo mảng chứa các products
const filteredProducts = ref([]);

// theo dõi khi type trên đường dẫn path thay đổi thì thay đổi lại các value cho phù hợp
watchEffect(() => {
  // lấy ra mảng sản phẩm có type giống với type trên đường dẫn route.params.type
  target.value = getListProductByType(route.params.type).products;

  // khởi tạo mảng đã lọc
  filteredProducts.value = [...target.value];

  // đầu tiên là trả về mảng chứa các phần tử là giá của sản phẩm
  const priceArr = target.value.map((pro) => convertPriceVNDToNum(pro.cur_price));
  // sau đó sử dụng Math.min và max để tim giá thấp nhất và cao nhất
  min.value = Math.min(...priceArr);
  max.value = Math.max(...priceArr);

  // gán vào cho biến value để hiển thị range slide
  value.value = [min.value, max.value];
});

// hàm xử lý khi thay đổi ở dropdown
const selectOnChange = () => {
  switch (selection.value) {
    case 'default':
      console.log('default');
      filteredProducts.value = [...target.value].filter(
        ({ cur_price }) =>
          convertPriceVNDToNum(cur_price) >= value.value[0] &&
          convertPriceVNDToNum(cur_price) < value.value[1],
      );
      break;
    case 'popular':
      console.log('popular');
      break;
    case 'rating':
      console.log('rating');
      break;
    case 'latest':
      console.log('latest');
      break;
    case 'price-from-cheap':
      // sắp xếp lại mảng filteredProducts theo thứ tự tăng dần của giá (phải convert từ chuỗi dạng 1.000.000 về số)
      filteredProducts.value.sort(
        (a, b) => convertPriceVNDToNum(a.cur_price) - convertPriceVNDToNum(b.cur_price),
      );
      break;
    case 'price-from-expensive':
      // sắp xếp lại mảng filteredProducts theo thứ tự giảm dần của giá (phải convert từ chuỗi dạng 1.000.000 về số)
      filteredProducts.value.sort(
        (a, b) => convertPriceVNDToNum(b.cur_price) - convertPriceVNDToNum(a.cur_price),
      );
      break;

    default:
      break;
  }
};

// hàm xử lý khi thay đổi giá trị của thanh range slider và bấm lọc
const filterByPriceLimition = () => {
  // lấy mảng sản phẩm ban đầu lọc ra sản phẩm có giá từ value[0] đến value[1]
  filteredProducts.value = [...target.value].filter(
    ({ cur_price }) =>
      convertPriceVNDToNum(cur_price) >= value.value[0] &&
      convertPriceVNDToNum(cur_price) <= value.value[1],
  );
};
</script>

<template>
  <!-- top -->
  <div class="max-w-[1200px] mx-auto">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="font-bold text-header-dark text-2xl my-4">{{ target.name }}</h2>

        <div class="text-gray-500 text-sm mb-4">
          <router-link to="/" class="transition-all hover:text-dark">Trang chủ</router-link>
          /
          <router-link to="/cua-hang" class="transition-all hover:text-dark">Cửa hàng</router-link>
          /
          <span class="uppercase text-dark">{{ target.name }}</span>
        </div>
      </div>

      <!-- dropdown -->
      <div class="flex justify-between items-center">
        <div class="mr-6">Hiển thị một kết quả duy nhất</div>
        <select
          class="outline-none bg-white p-2 border border-gray-200 shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)]"
          v-model="selection"
          @change="selectOnChange"
        >
          <option value="default">Thứ tự mặc định</option>
          <option value="popular">Thứ tự theo thứ tự phổ biến</option>
          <option value="rating">Thứ tự theo điểm đánh giá</option>
          <option value="latest">Mới nhất</option>
          <option value="price-from-cheap">Thứ tự theo giá: thấp đến cao</option>
          <option value="price-from-expensive">Thứ tự theo giá: cao đến thấp</option>
        </select>
      </div>
    </div>
  </div>

  <!-- content -->
  <div class="bg-[#FAFAFA] pt-10">
    <div class="max-w-[1200px] mx-auto">
      <div class="flex">
        <!-- filter -->
        <div class="w-[23%] mr-6">
          <!-- filter by price limition -->
          <div class="mb-10 bg-white py-2 px-4">
            <h3 class="text-dark text-xl mb-2">Lọc theo giá</h3>

            <!-- range slider -->
            <div class="mb-4">
              <VueSlider
                :min="min"
                :max="max"
                :min-range="1000"
                v-model="value"
                :dot-options="{
                  style: {
                    background: '#666666',
                    'border-color': '#666666',
                  },
                }"
                :process-style="{
                  background: '#ABABAB',
                }"
              />
            </div>

            <div class="flex justify-between items-center">
              <button
                @click="filterByPriceLimition"
                class="text-white bg-[#666] transition-all hover:bg-[#525252] py-1 px-3 rounded-full uppercase text-xs font-semibold"
              >
                Lọc
              </button>

              <div class="max-w-[80%]">
                Giá:
                <span class="font-semibold text-dark">{{ convertNumToPriceVND(value[0]) }}₫</span>
                -
                <span class="font-semibold text-dark">{{ convertNumToPriceVND(value[1]) }}₫</span>
              </div>
            </div>
          </div>

          <!-- filter by power -->
          <div class="bg-white py-2 px-4">
            <h3 class="text-dark text-xl mb-2">Công suất</h3>
            <ul>
              <li
                class="border-t border-t-gray-200 py-2"
                v-for="product in target"
                :key="product.index"
              >
                {{ product.power }} W
              </li>
            </ul>
          </div>
        </div>

        <!-- products -->
        <div class="flex-1 flex flex-wrap">
          <product-card
            v-for="product in filteredProducts"
            :product="product"
            :key="product.name"
            class="w-[25%]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
