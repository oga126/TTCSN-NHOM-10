import { ref } from 'vue';
import { auth } from '@/config/firebase';

const user = ref(auth.currentUser);

auth.onAuthStateChanged((_user) => {
  if (_user) user.value = _user;
  else user.value = null;
});

const getUser = () => ({ user });

export const useUser = () => ({ getUser });
