import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

const onLogout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};

export const useLogout = () => ({ onLogout });
