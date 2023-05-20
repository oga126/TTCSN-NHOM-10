import { auth } from '@/config/firebase';
import { createRouter, createWebHistory } from 'vue-router';

const beforeAppEnter = (to, from, next) => {
  const user = auth.currentUser;
  if (!user) next({ name: 'dang-nhap', params: {} });
  else next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'trang-chu',
      component: () => import('@/views/trang-chu.vue'),
    },
    {
      path: '/the-gioi-do-cam-trai',
      name: 'the-gioi-do-cam-trai',
    },
    {
      path: '/the-gioi-may-do',
      name: 'the-gioi-may-do',
    },
    {
      path: '/phu-kien-o-to',
      name: 'phu-kien-o-to',
    },
    {
      path: '/den-nang-luong-mat-troi',
      name: 'den-nang-luong-mat-troi',
    },
    /**
     * path: '/:type' tức là các đường dẫn có dạng linh động, :type tức là có thể thay đổi type
     * thì khi có đường dẫn như thế sẽ gọi đến file products-by-type.vue và hiển thị ra màn hình
     */
    {
      path: '/:type',
      name: 'products-by-type',
      component: () => import('@/views/san-pham-theo-loai.vue'),
    },
    /**
     * path: '/:type' tức là các đường dẫn có dạng linh động, :type tức là có thể thay đổi type
     * :slugy là slugy name của sản phẩm
     * thì khi có đường dẫn như thế sẽ gọi đến file products-by-type.vue và hiển thị ra màn hình
     */
    {
      path: '/:type/:slugy',
      name: 'product-details',
      component: () => import('@/views/san-pham-chi-tiet.vue'),
    },
    // trang liên hệ
    {
      path: '/lien-he',
      name: 'lien-he',
      component: () => import('@/views/lien-he.vue'),
    },
    // trang giỏ hàng
    {
      path: '/gio-hang',
      name: 'gio-hang',
      component: () => import('@/views/gio-hang.vue'),
      beforeEnter: beforeAppEnter,
    },
    // trang thanh toán
    {
      path: '/thanh-toan',
      name: 'thanh-toan',
      component: () => import('@/views/thanh-toan.vue'),
      // beforeEnter: 
    },
    // trang thông tin đơn hàng
    {
      path: '/thong-tin-don-hang/:id',
      name: 'thong-tin-don-hang',
      component: () => import('@/views/thong-tin-don-hang.vue'),
      beforeEnter: beforeAppEnter,
    },
    // trnag chính sách vận chuyển
    {
      path: '/chinh-sach-van-chuyen',
      name: 'chinh-sach-van-chuyen',
      component: () => import('@/views/chinh-sach-van-chuyen.vue'),
    },
    // trnag chính sách thanh toán
    {
      path: '/chinh-sach-thanh-toan',
      name: 'chinh-sach-thanh-toan',
      component: () => import('@/views/chinh-sach-thanh-toan.vue'),
    },
    // trang chính sách đổi trả
    {
      path: '/chinh-sach-doi-tra',
      name: 'chinh-sach-doi-tra',
      component: () => import('@/views/chinh-sach-doi-tra.vue'),
    },
    // trang dang nhap
    {
      path: '/dang-nhap',
      name: 'dang-nhap',
      component: () => import('@/views/dang-nhap.vue'),
    },
    // trang đăng ký
    {
      path: '/dang-ky',
      name: 'dang-ky',
      component: () => import('@/views/dang-ky.vue'),
    },
    // trang quên mật khẩu
    {
      path: '/quen-mat-khau',
      name: 'quen-mat-khau',
      component: () => import('@/views/quen-mat-khau.vue'),
    },
    {
      path: '/tai-khoan',
      name: 'tai-khoan',
      component: () => import('@/views/tai-khoan.vue'),
      beforeEnter: beforeAppEnter,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
