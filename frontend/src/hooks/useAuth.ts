import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import Cookies from 'js-cookie';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log('Auth State Changed:', currentUser ? 'logged in' : 'logged out');
    });

    return unsubscribe;
  }, []);

  // Regular email login
  const loginWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      setAuthCookie(token);
      return result;
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  };

  // Google login
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      setAuthCookie(token);
      return result;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  // Facebook login
  const loginWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      setAuthCookie(token);
      return result;
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  };

  const setAuthCookie = (token: string) => {
    Cookies.set('auth-token', token, { expires: 7 }) // Expires in 7 days
  };

  const removeAuthCookie = () => {
    Cookies.remove('auth-token')
  };

  const logout = async () => {
    await signOut(auth);
    removeAuthCookie();
  };

  return { 
    user, 
    loading, 
    loginWithEmail, 
    loginWithGoogle, 
    loginWithFacebook, 
    logout 
  };
}
