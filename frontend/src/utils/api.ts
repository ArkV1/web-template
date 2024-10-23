import { auth } from '../lib/firebase';
import { getAuth } from 'firebase/auth';
import { RentalProperty } from '@/types/RentalProperty';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Mock data for demonstration purposes
const mockProperties: RentalProperty[] = [
  {
    id: '1',
    name: 'Cozy Beach House',
    description: 'A beautiful beach house with stunning ocean views in Malibu',
    address: '123 Ocean Drive, Malibu, CA 90265',
    price: 250,
    imageUrls: [
      'https://example.com/beach-house-1.jpg',
      'https://example.com/beach-house-2.jpg',
      'https://example.com/beach-house-3.jpg'
    ],
    amenities: ['Beach access', 'Ocean view', 'Wi-Fi', 'Air conditioning', 'Full kitchen'],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Malibu, California',
    propertyType: 'House',
    rating: 4.8,
    reviewCount: 52,
    availableDates: {
      start: '2024-06-01',
      end: '2024-09-30'
    },
    host: {
      name: 'Sarah Johnson',
      rating: 4.9,
      responseRate: 98
    },
    area: 2500
  },
  {
    id: '2',
    name: 'Mountain Retreat',
    description: 'A cozy ski-in/ski-out retreat with breathtaking mountain views in Aspen',
    address: '456 Mountain View Road, Aspen, CO 81611',
    price: 300,
    imageUrls: [
      'https://example.com/mountain-retreat-1.jpg',
      'https://example.com/mountain-retreat-2.jpg',
      'https://example.com/mountain-retreat-3.jpg'
    ],
    amenities: ['Ski-in/Ski-out', 'Fireplace', 'Hot tub', 'Mountain view', 'Heated floors'],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    location: 'Aspen, Colorado',
    propertyType: 'Chalet',
    rating: 4.9,
    reviewCount: 78,
    availableDates: {
      start: '2024-12-01',
      end: '2025-03-31'
    },
    host: {
      name: 'Michael Brown',
      rating: 4.7,
      responseRate: 95
    },
    area: 3200
  },
  {
    id: '3',
    name: 'Modern City Loft',
    description: 'A sleek and stylish loft in the heart of New York City with skyline views',
    address: '789 5th Avenue, Manhattan, NY 10022',
    price: 200,
    imageUrls: [
      'https://example.com/city-loft-1.jpg',
      'https://example.com/city-loft-2.jpg',
      'https://example.com/city-loft-3.jpg'
    ],
    amenities: ['City view', 'Gym access', 'High-speed internet', 'Smart home features', 'Doorman'],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    location: 'Manhattan, New York City',
    propertyType: 'Apartment',
    rating: 4.6,
    reviewCount: 104,
    availableDates: {
      start: '2024-05-01',
      end: '2024-12-31'
    },
    host: {
      name: 'Emily Chen',
      rating: 4.8,
      responseRate: 99
    },
    area: 1100
  }
];

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

export const fetchProperties = async (): Promise<RentalProperty[]> => {
  // In a real application, you would fetch data from your API here
  // For now, we'll return the mock data
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProperties), 500); // Simulate network delay
  });
};
