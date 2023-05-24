import { ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';

import { auth, db } from '@/config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

import { convertNumToPriceVND, convertPriceVNDToNum } from '@/utils/format';

// nơi lưu trử dữ liệu liên quan đến giỏ hàng
export const cartStore = defineStore('cart', () => {
  // nơi chứa các sản phẩm đã thêm giỏ hàng
  const cart = ref([]);

  // lấy dữ liệu trên firestore
  const getCartInFirestore = async () => {
    const user = auth.currentUser;
    if (user) {
      // lấy ra user trên firestore có uid là user đang đăng nhập
      const userRef = doc(db, 'users', user.uid);
      // lấy dữ liệu của user đó
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        cart.value = userSnap.data().cart;
      } else {
        // userSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    }
  };

  // cập nhật giỏ hàng trên firestore
  const updateCartInFirestore = async () => {
    const user = auth.currentUser;
    // lấy ra user trên firestore có uid là user đang đăng nhập
    const userRef = doc(db, 'users', `${user.uid}`);
    try {
      // update cart trên firestore = cart trên local
      await updateDoc(userRef, {
        cart: cart.value,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  // hàm kiểm tra xem sản phầm có id đã tồn tại trong cart chưa
  const isExits = (id) => {
    return cart.value.some((product) => product.index === id);
  };

  // hàm lấy ra sản phẩm theo id
  const getProductById = (id) => {
    for (const product of cart.value) {
      if (product.index === id) return product;
    }
    return null;
  };

  // hàm lấy vị trị của sản phẩm trong mảng cart theo id
  const getIndexOfProductById = (id) => {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].index === id) {
        return i;
      }
    }
    return -1;
  };

  // hàm thêm sản phẩm vào cart
  const addToCart = async (product) => {
    // kiểm tra nếu chauw tồn tại rồi thì thêm mới
    if (!isExits(product.index)) {
      cart.value.push(product);
    } else {
      // nếu tồn tại rồi thì cập nhật lại số lượng

      // tìm vị trí của nó sau đó gán lại số lượng
      const pos = getIndexOfProductById(product.index);
      if (pos !== -1) cart.value[pos].quantity += product.quantity;
    }

    // sau đó cập nhật lại trên firestore
    await updateCartInFirestore();
  };

  // hàm xóa 1 sản phẩm khỏi giỏ hàng theo id
  const removeOutCart = async (id) => {
    const pos = getIndexOfProductById(id);
    if (pos !== -1) {
      cart.value.splice(pos, 1);
    } else console.error('Not have product with this id');

    // sau đó cập nhật lại trên firestore
    await updateCartInFirestore();
  };

  // hàm tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = (products = cart.value) => {
    // tạo 1 mảng chứa các sô lượng của từng sản phẩm
    const arrQuantity = products.map((product) => product.quantity);

    // tính tổng dựa trên mảng đó
    const sum = arrQuantity.reduce((acc, cur) => acc + cur, 0);
    return sum;
  };

  // hàm tính tổng giá tiền tất cả sản phẩm trong gior hàng
  const totalPrice = (products = cart.value) => {
    let total = 0;

    // lặp từng sản phẩm
    products.forEach((product) => {
      // chuyển về giá số và tính toán
      const price = convertPriceVNDToNum(product.cur_price);
      total += price * product.quantity;
    });
    return total;
  };

  // hàm clear hết sản phẩm trong giỏ hàng
  const clearCart = () => {
    cart.value = [];
  };

  return {
    cart,
    getProductById,
    addToCart,
    removeOutCart,
    totalQuantity,
    totalPrice,
    isExits,
    getCartInFirestore,
    clearCart,
  };
});
