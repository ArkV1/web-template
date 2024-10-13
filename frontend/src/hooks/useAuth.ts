import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { User, signInWithEmailAndPassword, signOut } from 'firebase/auth';

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

  const login = (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return { user, loading, login, logout };
}
