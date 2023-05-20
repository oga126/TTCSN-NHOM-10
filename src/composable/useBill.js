import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

const user = auth.currentUser;

// hàm tạo ra 1 đơn hàng mới firestore cho user
const createNewBill = async (newBill) => {
  if (user) {
    // lấy ra user trên firestore có uid là user đang đăng nhập
    const userRef = doc(db, 'users', user.uid);
    // lấy dữ liệu của user đó
    const userSnap = await getDoc(userRef);

    // nếu userSnap tồn tại
    if (userSnap.exists()) {
      // lấy ra tất cả các đơn hàng
      const oldBill = await getAllBill();
      // lưu lại bằng cách gộp đơn cũ và đơn mới
      const payload = [...oldBill, newBill];
      try {
        // sau đó gửi dữ liệu lên firestore
        await updateDoc(userRef, {
          bill: payload,
        });
      } catch (error) {}

      return newBill;
    } else {
      // userSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }
};

// hàm lấy ra tất cả đơn hàng trên firestore
const getAllBill = async () => {
  if (user) {
    // lấy ra user trên firestore có uid là user đang đăng nhập
    const userRef = doc(db, 'users', user.uid);
    // lấy dữ liệu của user đó
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data().bill;
    } else {
      // userSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }
};

// hàm lấy ra đơn hàng theo id trên firestore
const getBillById = async (id) => {
  if (user) {
    // lấy ra tất cả bill trên firestore của user
    const bills = await getAllBill();
    // trả về bill có id truyền vào
    return bills.find((bill) => bill.id === id);
  }
};

export const useBill = () => ({ getAllBill, createNewBill, getBillById });
