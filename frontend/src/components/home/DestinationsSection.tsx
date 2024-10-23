import Image from 'next/image';
import Link from 'next/link';

export default function DestinationsSection() {
  const destinations = [
    {
      name: 'Costa Rica',
      image: 'https://placehold.co/800x1000/3a3a3a/ffffff?text=Costa+Rica',
      locations: ['Jaco', 'La Fortuna', 'Nosara'],
      slug: 'costa-rica'
    },
    {
      name: 'Guatemala',
      image: 'https://placehold.co/800x1000/3a3a3a/ffffff?text=Guatemala',
      locations: ['Antigua', 'Atitlan'],
      slug: 'guatemala'
    },
    // Add more destinations
  ];

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Popular Destinations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Link 
              key={destination.slug}
              href={`/${destination.slug}`}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-sm opacity-90">
                    {destination.locations.join(' · ')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
