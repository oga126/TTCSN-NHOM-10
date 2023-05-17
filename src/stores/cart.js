import { ref } from 'vue';
import { defineStore } from 'pinia';

import { convertNumToPriceVND, convertPriceVNDToNum } from '@/utils/format';

// nơi lưu trử dữ liệu liên quan đến giỏ hàng
export const cartStore = defineStore('cart', () => {
  // nơi chứa các sản phẩm đã thêm giỏ hàng
  const cart = ref([
    // {
    //   index: 'DP35',
    //   name: 'Bộ đèn pha năng lượng mặt trời 150W bao gồm 2 pha đèn độc lập và 1 tấm pin NLMT rời (DP35)',
    //   thumbnail:
    //     'https://shopreview.vn/wp-content/uploads/2021/10/z2864574919606_878687f054665ec8c8487aa71e052bcb.jpg',
    //   cur_price: '1.350.000',
    //   slugy_name:
    //     'bo-den-pha-nang-luong-mat-troi-150w-bao-gom-2-pha-den-doc-lap-va-1-tam-pin-nlmt-roi-dp35',
    //   type: 'den-pha-nang-luong-mat-troi',
    //   quantity: 1
    // },
    // {
    //   index: 'DP42',
    //   name: 'Đèn năng lượng mặt trời hình đĩa bay với 5 pha đèn 500w, to như mâm cơm, sáng trắng và sáng vàng (DP42)',
    //   thumbnail:
    //     'https://shopreview.vn/wp-content/uploads/2021/11/z2935680023201_0b4ea7d609ee01e4a095355cce26f0fe.jpg',
    //   cur_price: '1.350.000',
    //   slugy_name:
    //     'den-nang-luong-mat-troi-hinh-dia-bay-voi-5-pha-den-500w-to-nhu-mam-com-sang-trang-va-sang-vang-dp42',
    //   type: 'den-pha-nang-luong-mat-troi',
    //   quantity: 1
    // },
    // {
    //   index: 'DP72',
    //   name: 'Đèn phi thuyền năng lượng mặt trời, pin cực khỏe, bóng led 400W siêu sáng (DP72)',
    //   thumbnail:
    //     'https://shopreview.vn/wp-content/uploads/2022/08/wholesale-price-outdoor-waterproof-100w-200w-solar-panel-led-street-light-f0ef7d3b-c105-41ce-999a-4807ac35da66-1.jpg',
    //   cur_price: '2.450.000',
    //   slugy_name: 'den-phi-thuyen-nang-luong-mat-troi-pin-cuc-khoe-bong-led-400w-sieu-sang-dp72',
    //   type: 'den-pha-nang-luong-mat-troi',
    //   quantity: 1
    // }
  ]);

  const isExits = (id) => {
    return cart.value.some((product) => product.index === id);
  };

  const getProductById = (id) => {
    for (const product of cart.value) {
      if (product.index === id) return product;
    }
    return null;
  };

  const getIndexOfProductById = (id) => {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].index === id) {
        return i;
      }
    }
    return -1;
  };

  const addToCart = (product) => {
    if (!isExits(product.index)) cart.value.push(product);
    else {
      const pos = getIndexOfProductById(product.index);
      if (pos != -1) cart.value[pos].quantity += product.quantity;
    }
  };

  const removeOutCart = (id) => {
    const pos = getIndexOfProductById(id);
    if (pos !== -1) {
      cart.value.splice(pos, 1);
    } else console.error('Not have product with this id');
  };

  const totalQuantity = () => {
    return cart.value.map((product) => product.quantity).reduce((acc, cur) => acc + cur, 0);
  };

  const totalPrice = () => {
    let total = 0;
    cart.value.forEach((product) => {
      const price = convertPriceVNDToNum(product.cur_price);
      total += price * product.quantity;
    });
    return total;
  };

  return { cart, getProductById, addToCart, removeOutCart, totalQuantity, totalPrice, isExits };
});
