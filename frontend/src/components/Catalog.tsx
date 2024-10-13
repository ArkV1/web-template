"use client";

import React, { useEffect, useState } from 'react';
import { getRentalProperties } from '@/utils/api';
import { RentalProperty } from '@/types/RentalProperty';

const Catalog: React.FC = () => {
  const [properties, setProperties] = useState<RentalProperty[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getRentalProperties();
        setProperties(data);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!properties || properties.length === 0) return <div>No properties found.</div>;

  return (
    <div>
      <h1>Rental Properties</h1>
      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <p>Price: ${property.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
