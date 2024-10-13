"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/auth/AuthProvider';
import Profile from '@/components/Profile';

export default function ProfilePage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Only render the Profile component when we're sure the user is authenticated
  if (loading || !user) {
    return null;
  }

  return <Profile />;
}
