"use client";

import React, { useEffect, useState } from 'react';
import { fetchProperties } from '@/utils/api';
import { RentalProperty } from '@/types/RentalProperty';
import Link from 'next/link';

interface CatalogProps {
  limit?: number;
}

const Catalog: React.FC<CatalogProps> = ({ limit }) => {
  const [properties, setProperties] = useState<RentalProperty[]>([]);

  useEffect(() => {
    const loadProperties = async () => {
      const fetchedProperties = await fetchProperties();
      setProperties(limit ? fetchedProperties.slice(0, limit) : fetchedProperties);
    };
    loadProperties();
  }, [limit]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {properties.map((property) => (
        <Link href={`/property/${property.id}`} key={property.id} className="block">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src={property.imageUrls[0]} alt={property.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{property.name}</h3>
              <p className="text-gray-600 mb-2 truncate">{property.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">${property.price} / night</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{property.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Catalog;
