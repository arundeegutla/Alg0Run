import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/server/firebase/clientApp';

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const codeforcesSignIn = () => {
  window.location.href = '/api/auth/codeforces/login';
};

export const unifiedSignIn = {
  google: googleSignIn,
  codeforces: codeforcesSignIn,
};
