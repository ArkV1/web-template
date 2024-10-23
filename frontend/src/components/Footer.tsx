import Link from 'next/link';
import Image from 'next/image';

const footerSections = {
  about: [
    { label: 'Contact us', href: '/contact-us' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'What is HUIS', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Modify / Cancel Booking', href: '/modify-booking' },
    { label: 'Group Bookings', href: '/group-bookings' },
    { label: 'Safety and Cleanliness', href: '/safety' },
  ],
  legal: [
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Legal', href: '/legal' },
    { label: 'Luna by HUIS', href: '/luna' },
    { label: 'Modern Slavery Statement', href: '/slavery-statement' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Cookie Settings', href: '/cookie-settings' },
    { label: 'Investors', href: '/investors' },
  ],
  partner: [
    { label: 'TechnoArt @ HUIS', href: '/technoart' },
    { label: 'Content Creators', href: '/creators' },
    { label: 'Real estate', href: '/realestate' },
    { label: 'Film residency', href: '/film-residency' },
  ],
  countries: [
    { label: 'Portugal', href: '/portugal' },
    { label: 'Costa Rica', href: '/costa-rica' },
    { label: 'Israel', href: '/israel' },
    { label: 'Colombia', href: '/colombia' },
    { label: 'Mexico', href: '/mexico' },
    { label: 'Ecuador', href: '/ecuador' },
    { label: 'Panama', href: '/panama' },
    { label: 'USA', href: '/usa' },
    { label: 'Brazil', href: '/brazil' },
  ],
  destinations: [
    { label: 'Lisbon', href: '/portugal/lisbon' },
    { label: 'Cartagena', href: '/colombia/cartagena' },
    { label: 'Kinneret', href: '/israel/kinneret' },
    { label: 'Tulum', href: '/mexico/tulum' },
    { label: 'Santa Teresa', href: '/costa-rica/santa-teresa' },
    { label: 'Boquete', href: '/panama/boquete' },
    { label: 'Mancora', href: '/peru/mancora' },
    { label: 'Geres', href: '/portugal/geres' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-6 gap-8">
          {/* Logo Column */}
          <div className="col-span-1">
            <Link href="/" className="block w-28">
              <Image
                src="/assets/logo_HUIS.svg"
                alt="HUIS Logo"
                width={109}
                height={32}
                className="w-auto h-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Navigation Columns */}
          <div className="col-span-5 grid grid-cols-5 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-sm font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                {footerSections.about.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerSections.legal.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm font-semibold mt-6 mb-4">Partner</h3>
              <ul className="space-y-2">
                {footerSections.partner.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Countries Section */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Our Countries</h3>
              <ul className="space-y-2">
                {footerSections.countries.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations Section */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Our Popular Destinations</h3>
              <ul className="space-y-2">
                {footerSections.destinations.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links Section */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Follow</h3>
              <div className="flex gap-4">
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/tiktok.svg" alt="TikTok" width={24} height={24} className="w-6 h-6" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/facebook.svg" alt="Facebook" width={24} height={24} className="w-6 h-6" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/youtube.svg" alt="YouTube" width={24} height={24} className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/instagram.svg" alt="Instagram" width={24} height={24} className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/twitter.svg" alt="Twitter" width={24} height={24} className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-sm text-neutral-400">
          All rights reserved to HUIS
        </div>
      </div>
    </footer>
  );
}
