import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'trang-chu',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/the-gioi-do-cam-trai',
      name: 'the-gioi-do-cam-trai'
    },
    {
      path: '/the-gioi-may-do',
      name: 'the-gioi-may-do'
    },
    {
      path: '/phu-kien-o-to',
      name: 'phu-kien-o-to'
    },
    {
      path: '/den-nang-luong-mat-troi',
      name: 'den-nang-luong-mat-troi'
    },
    {
      path: '/:type',
      name: 'products-by-type',
      component: () => import('@/views/products-by-type.vue')
    },
    {
      path: '/:type/:slugy',
      name: 'product-details',
      component: () => import('@/views/product-details.vue')
    },
    {
      path: '/lien-he',
      name: 'lien-he',
      component: () => import('@/views/lien-he.vue')
    },
    {
      path: '/gio-hang',
      name: 'gio-hang',
      component: () => import('@/views/gio-hang.vue')
    },
    {
      path: '/thanh-toan',
      name: 'thanh-toan',
      component: () => import('@/views/thanh-toan.vue')
    },
    {
      path: '/thong-tin-don-hang',
      name: 'thong-tin-don-hang',
      component: () => import('@/views/thong-tin-don-hang.vue'),
    },
    {
      path: '/chinh-sach-van-chuyen',
      name: 'chinh-sach-van-chuyen',
      component: () => import('@/views/chinh-sach-van-chuyen.vue')
    },
    {
      path: '/chinh-sach-thanh-toan',
      name: 'chinh-sach-thanh-toan',
      component: () => import('@/views/chinh-sach-thanh-toan.vue')
    },
    {
      path: '/chinh-sach-doi-tra',
      name: 'chinh-sach-doi-tra',
      component: () => import('@/views/chinh-sach-doi-tra.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
