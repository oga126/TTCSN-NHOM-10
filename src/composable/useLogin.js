import { ref } from 'vue';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';

const error = ref(null);

// đang đợi
const isPending = ref(false);

const onLogin = async (email, password) => {
  error.value = null;
  // bắt đầu đăng nhập thì cho đang đợi là true
  isPending.value = true;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log(user);
  } catch (err) {
    const errorMessage = err.message;

    switch (err.code) {
      case 'auth/wrong-password':
        error.value = 'Mật khẩu nhập vào không đúng.';
        break;
      case 'auth/user-not-found':
        error.value = 'Không có hồ sơ người dùng hiện có tương ứng với địa chỉ email nhập vào.';
        break;
      case 'auth/too-many-requests':
        error.value =
          'Quyền truy cập vào tài khoản này đã tạm thời bị vô hiệu hóa do nhiều lần đăng nhập không thành công. Bạn có thể khôi phục ngay lập tức bằng cách đặt lại mật khẩu của mình hoặc bạn có thể thử lại sau.';
        break;
      default:
        error.value = errorMessage;
    }
  } finally {
    // đăng nhập thành công hay thất bại thì gán lại bằng false
    isPending.value = false;
  }
};

export const useLogin = () => ({ error, isPending, onLogin });
