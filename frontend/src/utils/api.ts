import { auth } from '../lib/firebase';
import { getAuth } from 'firebase/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  const token = await user.getIdToken();
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);

  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
}

export async function getRentalProperties() {
  const response = await fetch(`${API_BASE_URL}/api/public/rental-properties`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch rental properties');
  }

  return response.json();
}

export async function createDummyRentalProperties() {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/create-dummy-properties`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to create dummy rental properties');
  }

  return response.json();
}
