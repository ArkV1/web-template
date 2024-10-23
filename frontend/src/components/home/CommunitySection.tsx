import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const stats = [
  { number: '150+', label: 'Locations' },
  { number: '50+', label: 'Countries' },
  { number: '500K+', label: 'Community Members' }
];

export default function CommunitySection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Global Community
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Connect with travelers, digital nomads, and creative minds from around the world. 
              Share experiences, create memories, and build lasting friendships.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <button className="group flex items-center space-x-2 text-neutral-900 font-medium">
              <span>Learn more about our community</span>
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right side - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="https://placehold.co/600x800/2a2a2a/ffffff?text=Community+1"
                  alt="Community member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://placehold.co/800x800/2a2a2a/ffffff?text=Community+2"
                  alt="Community event"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://placehold.co/800x800/2a2a2a/ffffff?text=Community+3"
                  alt="Coworking space"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="https://placehold.co/600x800/2a2a2a/ffffff?text=Community+4"
                  alt="Community gathering"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
