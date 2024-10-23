import Image from 'next/image';
import Link from 'next/link';

const experiences = [
  {
    title: 'CoLive',
    description: 'Live and connect with like-minded individuals in our global community',
    image: 'https://placehold.co/800x800/2a2a2a/ffffff?text=CoLive',
    link: '/colive'
  },
  {
    title: 'CoWork',
    description: 'Work from inspiring spaces designed for productivity and collaboration',
    image: 'https://placehold.co/800x800/2a2a2a/ffffff?text=CoWork',
    link: '/cowork'
  },
  {
    title: 'Wellness',
    description: 'Nurture your mind and body with our curated wellness experiences',
    image: 'https://placehold.co/800x800/2a2a2a/ffffff?text=Wellness',
    link: '/wellness'
  }
];

export default function ExperiencesSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiences</h2>
        <p className="text-xl text-neutral-600 mb-12">Discover our unique offerings</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <Link 
              key={experience.title} 
              href={experience.link}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>
              <p className="text-neutral-600">{experience.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
