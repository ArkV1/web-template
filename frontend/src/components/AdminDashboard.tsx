"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/auth/AuthProvider';
import { fetchWithAuth } from '@/utils/api';
import { RentalProperty } from '@/types/RentalProperty';
import LoadingSpinner from './LoadingSpinner';
import Image from 'next/image';

export default function AdminDashboard() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [properties, setProperties] = useState<RentalProperty[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        fetchProperties();
      }
    }
  }, [user, loading, router]);

  const fetchProperties = async () => {
    try {
      const response = await fetchWithAuth('/api/rental-properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.error('Failed to fetch properties');
        setProperties([]);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createDummyProperties = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const response = await fetchWithAuth('/api/create-dummy-properties', {
        method: 'POST',
      });
      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
        fetchProperties();
      } else {
        setMessage('Failed to create dummy properties');
      }
    } catch (error) {
      console.error('Error creating dummy properties:', error);
      setMessage('An error occurred while creating dummy properties');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-secondary rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Rental Properties</h2>
          <button
            onClick={createDummyProperties}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="small" /> : 'Create Dummy Properties'}
          </button>
        </div>
        {message && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingSpinner size="large" />
          </div>
        ) : properties === null ? (
          <p className="text-center text-foreground">Loading properties...</p>
        ) : properties.length > 0 ? (
          <ul className="space-y-4">
            {properties.map((property) => (
              <li key={property.id} className="bg-background p-4 rounded-md shadow">
                <h3 className="text-lg font-semibold">{property.name}</h3>
                <p className="text-foreground">{property.description}</p>
                <p className="text-foreground">{property.address}</p>
                <p className="text-primary font-bold">${property.price}/month</p>
                <p className="text-foreground">Bedrooms: {property.bedrooms}</p>
                <p className="text-foreground">Bathrooms: {property.bathrooms}</p>
                <p className="text-foreground">Area: {property.area} sq ft</p>
                {property.imageUrls.length > 0 && (
                  <Image src={property.imageUrls[0]} alt={property.name} width={500} height={300} />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-foreground">No properties found.</p>
        )}
      </div>
    </div>
  );
}
