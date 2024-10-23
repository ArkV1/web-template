export interface RentalProperty {
  id: string;
  name: string;
  description: string;
  address: string;
  price: number;
  imageUrls: string[];
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  propertyType: string;
  rating: number;
  reviewCount: number;
  availableDates: {
    start: string;
    end: string;
  };
  host: {
    name: string;
    rating: number;
    responseRate: number;
  };
  area: number;
}
