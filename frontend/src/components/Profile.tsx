"use client";

import { useAuthContext } from '@/app/auth/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-secondary rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-foreground">Profile</h1>
        <p className="text-center text-foreground">Email: {user.email}</p>
        <button
          onClick={handleLogout}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
