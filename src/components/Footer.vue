<script setup>
import { TEL } from '@/constants';
</script>

<template>
  <div class="bg-white border-t border-t-gray-300 py-8">
    <div class="max-w-[1200px] mx-auto">
      <div class="flex justify-between">
        <!-- Mô tả -->
        <div class="flex-1 px-5">
          <h2 class="text-[18px] text-header-dark font-bold mb-4">SHOP REVIEW</h2>
          <p>
            Shop Review hoạt động với mục tiêu mang đến quý khách hàng những sản phẩm review chân
            thực và chất lượng nhất, thiết thực nhất, và hữu dụng nhất. Những sản phẩm mang đến cho
            quý khách sự hài lòng cao nhất. Đồng hành với đó là cắt giảm tối đa mọi chi phí để giá
            bán đến tay quý khách hàng luôn luôn thấp nhất. Sự ủng hộ và tin tưởng của khách hàng sẽ
            trở thành nguồn cảm hứng lớn lao cho shop ngày càng nâng cao chất lượng dịch vụ, mang
            đến quý khách hàng những sản phẩm tốt nhất!
          </p>
        </div>

        <!-- Địa chỉ -->
        <div class="flex-1 px-5">
          <h2 class="text-[18px] font-bold mb-4">Địa chỉ</h2>
          <ul class="text-[#0000ff] list-disc list-inside">
            <li class="marker:text-dark">VP Hà Nội: 214 Nguyễn Xiển, Thanh Xuân, Hà Nội</li>
            <li class="marker:text-dark">VP Hà Nội: 214 Nguyễn Xiển, Thanh Xuân, Hà Nội</li>
            <li class="marker:text-dark">
              VP Đà Nẵng: Số 45-47 Lê Quý Đôn, quận Hải Châu, Tp Đà Nẵng
            </li>
            <li class="marker:text-dark">
              Điện thoại: <a class="font-bold" :href="TEL.href">{{ TEL.display }}</a>
            </li>
            <li class="marker:text-dark">Email: ShopReview.vn@gmail.com</li>
          </ul>
          <div class="text-primary text-[15px] mt-2">
            - Giao hàng siêu tốc trên toàn quốc, Nhận hàng kiểm hàng và thanh toán tại nhà
          </div>
        </div>

        <!-- Thời gian làm việc -->
        <div class="flex-1 px-5">
          <h2 class="text-[18px] font-bold mb-4">Thời gian làm việc</h2>

          <!-- thời gian -->
          <div class="border-b text-[15px] border-b-gray-200 pb-4">
            <p>
              Cửa hàng làm việc từ 06h00-22h hàng ngày, nếu quý khách muốn mua số lượng lớn hoặc đặt
              sỉ vui lòng liên hệ trực tiếp qua SĐT
              <a class="text-primary transition-all hover:text-dark" :href="TEL.href">{{
                ` ${TEL.display} `
              }}</a>
              Xin cảm ơn!
            </p>
          </div>

          <!-- Các chính sách -->
          <ul>
            <li class="text-sm py-2 text-primary transition-all hover:text-dark">
              <router-link :to="{ name: 'chinh-sach-van-chuyen' }">
                Chính sách vận chuyển
              </router-link>
            </li>
            <li class="text-sm py-2 text-primary transition-all hover:text-dark">
              <router-link :to="{ name: 'chinh-sach-thanh-toan' }">
                Chính sách thanh toán
              </router-link>
            </li>
            <li class="text-sm py-2 text-primary transition-all hover:text-dark">
              <router-link :to="{ name: 'chinh-sach-doi-tra' }"> Chính sách đổi trả </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-[#F9F9F9] text-center text-gray-400 text-sm py-4">
    <p>Copyright 2019 © ShopReview.vn</p>
  </div>
</template>
