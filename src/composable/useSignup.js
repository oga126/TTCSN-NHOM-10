import { ref } from 'vue';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '@/config/firebase';

const error = ref(null);
const isPending = ref(false);

const onSignup = async (email, password, name) => {
  error.value = null;
  isPending.value = true;
  try {
    // tạo user trên firebase authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // update tên cho user
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });

    // tạo user trên firestore
    await setDoc(doc(db, 'users', `${user.uid}`), {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      // nơi lưu trữ giỏ hàng
      cart: [],
      // nơi lưu trữ đơn hàng
      bill: [],
    });
  } catch (err) {
    const errorMessage = err.message;

    switch (err.code) {
      // err.code là do firebase authentication trả về
      case 'auth/email-already-in-use':
        error.value =
          'Địa chỉ email cung cấp đã được sử dụng. Mỗi người dùng phải có một địa chỉ email duy nhất.';
        break;
      case 'auth/weak-password':
        error.value =
          'Giá trị đã cung cấp cho thuộc tính mật khẩu người dùng không hợp lệ. Nó phải là một chuỗi có ít nhất 6 ký tự.';
        break;
      default:
        error.value = errorMessage;
    }
  } finally {
    isPending.value = false;
  }
};

export const useSignup = () => ({ error, isPending, onSignup });
