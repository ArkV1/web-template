"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from 'react';
import { GlobeAltIcon, UserCircleIcon, MoonIcon } from '@heroicons/react/24/outline'

type Location = {
  name: string;
  slug: string;
};

type Destination = {
  country: string;
  hasCountryPage: boolean;
  locations: Location[];
  image?: string;
};

type Region = {
  name: string;
  destinations: Destination[];
};

type BrandLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'he', name: 'עִברִית' },
];

// Add this new component at the top of the file
const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="h-full px-4 flex items-center text-[13px] text-neutral-900 hover:text-black"
    >
      <span className="relative group">
        {children}
        <div className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-neutral-900 transition-all duration-300 group-hover:w-full" />
      </span>
    </Link>
  );
};

// Update the NavButton component for dropdowns
const NavButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
  return (
    <button
      onClick={onClick}
      className="h-full px-4 flex items-center text-[13px] text-neutral-900 hover:text-black"
    >
      <span className="relative group">
        {children}
        <div className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-neutral-900 transition-all duration-300 group-hover:w-full" />
      </span>
    </button>
  );
};

export default function Header() {
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("Central America");
  const destinationsRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]); // Default to English
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const regions: Region[] = [
    {
      name: "Central America",
      destinations: [
        {
          country: "Costa Rica",
          hasCountryPage: true,
          locations: [
            { name: "Jaco", slug: "costa-rica/jaco" },
            { name: "La Fortuna", slug: "costa-rica/la-fortuna" },
            { name: "Monteverde", slug: "costa-rica/monteverde" },
            { name: "Nosara", slug: "costa-rica/nosara" },
            { name: "Puerto Viejo", slug: "costa-rica/puerto-viejo" },
            { name: "San Jose", slug: "costa-rica/san-jose" },
          ]
        },
        {
          country: "Guatemala",
          hasCountryPage: false,
          locations: [
            { name: "Antigua", slug: "guatemala/antigua" },
            { name: "Atitlan", slug: "guatemala/atitlan" },
          ]
        },
        // Add more destinations...
      ]
    },
    // Add more regions...
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationsRef.current && !destinationsRef.current.contains(event.target as Node)) {
        setIsDestinationsOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDestinationsClick = () => {
    setIsDestinationsOpen(!isDestinationsOpen);
    setIsAccountOpen(false);
    setIsAboutOpen(false);
  };

  const handleAccountClick = () => {
    setIsAccountOpen(!isAccountOpen);
    setIsDestinationsOpen(false);
    setIsAboutOpen(false);
  };

  const handleAboutClick = () => {
    setIsAboutOpen(!isAboutOpen);
    setIsDestinationsOpen(false);
    setIsAccountOpen(false);
  };

  const handleLanguageClick = () => {
    setIsLanguageOpen(!isLanguageOpen);
    setIsDestinationsOpen(false);
    setIsAccountOpen(false);
    setIsAboutOpen(false);
  };

  // Add brandLinks array with proper typing
  const brandLinks: BrandLink[] = [
    { id: "what_is_brand", label: "What is Huis?", href: "/about" },
    { id: "faq", label: "FAQs", href: "/contact-us" },
    { id: "investors", label: "Investors", href: "https://investors.yourbrand.com", external: true },
    { id: "stay", label: "Stay", href: "/stay" },
    { id: "cowork", label: "CoWork", href: "/cowork" },
    { id: "wellness", label: "Wellness", href: "/wellness" },
    { id: "impact", label: "Impact", href: "/impact", external: true },
    { id: "technoart", label: "TechnoArt", href: "/technoart", external: true },
  ];

  // Add mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav className="bg-white h-14"> {/* Removed border-b border-neutral-200 */}
        {/* Mobile Header */}
        <div className="md:hidden w-full h-full px-4 flex items-center justify-between">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMobileMenu}
            className="p-2"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-neutral-900 transition-all duration-300 origin-left
                ${isMobileMenuOpen ? 'rotate-45 translate-x-px' : ''}`} />
              <span className={`w-full h-0.5 bg-neutral-900 transition-opacity duration-300
                ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-neutral-900 transition-all duration-300 origin-left
                ${isMobileMenuOpen ? '-rotate-45 translate-x-px' : ''}`} />
            </div>
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/">
              <Image
                src="/assets/logo_HUIS.svg"
                alt="Your Brand Logo"
                width={70}
                height={22}
                className="h-[22px] w-auto"
                priority
              />
            </Link>
          </div>

          {/* Account Icon */}
          <button
            onClick={handleAccountClick}
            className="p-2"
            aria-label="Account menu"
          >
            <div className="w-[19px] h-[19px] border border-neutral-900 rounded-full overflow-hidden bg-white">
              <UserCircleIcon className="w-full h-full text-neutral-900" />
            </div>
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex mx-auto px-4 lg:px-8 h-full relative"> {/* Reduced from px-8 lg:px-12 */}
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo_HUIS.svg"
                alt="Your Brand Logo"
                width={70}
                height={22}
                className="h-[22px] w-auto"
                priority
              />
            </Link>
          </div>

          {/* Center - Push everything else to the right */}
          <div className="flex-1"></div>

          {/* Right side - Navigation and Controls */}
          <div className="flex items-center h-full">
            {/* Navigation Items */}
            <div className="flex h-full items-center space-x-2"> {/* Changed to space-x-2 */}
              {/* Destinations Dropdown */}
              <div ref={destinationsRef} className="relative h-full">
                <button
                  onClick={handleDestinationsClick}
                  className="h-full px-4 flex items-center text-[13px] text-white bg-neutral-900 hover:bg-black transition-colors duration-200"
                >
                  <span className="flex items-center">
                    Destinations
                    <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isDestinationsOpen && (
                  <div className="absolute top-full left-0 w-[800px] bg-white shadow-lg border border-neutral-200">
                    <div className="flex">
                      {/* Region List */}
                      <div className="w-48 border-r border-neutral-200 p-4">
                        {regions.map(region => (
                          <button
                            key={region.name}
                            onClick={() => setSelectedRegion(region.name)}
                            className={`w-full text-left px-4 py-2 rounded ${selectedRegion === region.name ? 'bg-neutral-100' : ''
                              }`}
                          >
                            {region.name}
                          </button>
                        ))}
                      </div>

                      {/* Destinations Grid */}
                      <div className="flex-1 p-6">
                        <div className="grid grid-cols-2 gap-6">
                          {regions
                            .find(r => r.name === selectedRegion)
                            ?.destinations.map(destination => (
                              <div key={destination.country} className="space-y-2">
                                {destination.hasCountryPage ? (
                                  <Link href={`/${destination.country.toLowerCase()}`} className="font-medium text-neutral-900 hover:text-black">
                                    {destination.country}
                                  </Link>
                                ) : (
                                  <span className="font-medium text-neutral-900">{destination.country}</span>
                                )}
                                <ul className="space-y-1">
                                  {destination.locations.map(location => (
                                    <li key={location.slug}>
                                      <Link href={`/${location.slug}`} className="text-sm text-neutral-600 hover:text-black">
                                        {location.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Events & Groups */}
              <div className="h-full">
                <NavLink href="/group-bookings">
                  Events & Groups
                </NavLink>
              </div>

              {/* What is Brand? Dropdown */}
              <div ref={aboutRef} className="relative h-full">
                <NavButton onClick={handleAboutClick}>
                  What is Huis?
                </NavButton>
                {isAboutOpen && (
                  <div className="absolute top-full -right-8 w-max bg-white shadow-lg border border-neutral-200 z-50">
                    <ul className="py-2">
                      {brandLinks.map((link) => (
                        <li key={link.id} className="hover:bg-neutral-50">
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-sm text-neutral-900 hover:text-black whitespace-nowrap"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="block px-4 py-2 text-sm text-neutral-900 hover:text-black whitespace-nowrap"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Contact us */}
              <div className="h-full">
                <NavLink href="/contact-us">
                  Contact us
                </NavLink>
              </div>

              {/* CoLive */}
              <div className="h-full">
                <NavLink href="/colive">
                  CoLive
                </NavLink>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center h-full space-x-4 ml-16">
              {/* Language Selector */}
              <div ref={languageRef} className="relative h-full flex items-center">
                <button
                  onClick={handleLanguageClick}
                  className="flex items-center space-x-1 p-1.5 hover:bg-neutral-50 rounded-lg" // Reduced from p-2 and space-x-2
                  aria-label="Select language"
                >
                  <GlobeAltIcon className="h-5 w-5 text-neutral-900" />
                  <span className="text-sm text-neutral-900 uppercase">{currentLanguage.code}</span>
                </button>

                {isLanguageOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-32 bg-white shadow-lg border border-neutral-200 z-50 py-2">
                    <ul>
                      {languages.map((language) => (
                        <li
                          key={language.code}
                          className="px-4 py-2 hover:bg-neutral-50"
                        >
                          <button
                            onClick={() => {
                              setCurrentLanguage(language);
                              setIsLanguageOpen(false);
                            }}
                            className="w-full flex items-center justify-between text-sm"
                          >
                            {language.name}
                            {currentLanguage.code === language.code && (
                              <svg
                                className="h-4 w-4 text-neutral-900"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Account Button */}
              <div ref={accountRef} className="relative h-full flex items-center">
                <button
                  onClick={handleAccountClick}
                  className={`flex items-center space-x-1 px-2 py-1.5 h-full transition-colors duration-200
                    ${isAccountOpen 
                      ? 'bg-neutral-900 text-white hover:bg-black' 
                      : 'hover:bg-neutral-50 text-neutral-900'
                    }`}
                >
                  <UserCircleIcon className={`h-5 w-5 ${isAccountOpen ? 'text-white' : 'text-neutral-900'}`} />
                  <span className={`text-sm ${isAccountOpen ? 'text-white' : 'text-neutral-900'}`}>
                    My account
                  </span>
                </button>

                {isAccountOpen && (
                  <div className="absolute top-full right-0 w-[310px] bg-white shadow-lg border border-neutral-200 z-50">
                    <div className="p-4">
                      <p className="text-neutral-900 font-medium mb-4">Enhance your travels</p>

                      {/* Membership Card */}
                      <div className="relative mb-4">
                        <div className="border border-neutral-900 bg-white p-4 relative z-10">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 mr-2 flex items-center justify-center">
                              <MoonIcon className="w-6 h-6 text-neutral-900" />
                            </div>
                            <p className="text-sm font-medium uppercase">Luna membership</p>
                          </div>
                          <p className="text-sm text-neutral-700">Enjoy our lowest rates, all the time</p>
                        </div>
                        <div className="absolute inset-0 bg-neutral-900 transform translate-x-1 translate-y-1" />
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <button className="w-full px-4 py-3 bg-neutral-900 text-white text-sm uppercase font-medium rounded">
                          Become a member
                        </button>
                        <button className="w-full px-4 py-3 border border-neutral-900 text-neutral-900 text-sm uppercase font-medium rounded">
                          Log in
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Add mobile menu items */}
              <Link
                href="/destinations"
                className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-50"
              >
                Destinations
              </Link>
              {/* Add other mobile menu items */}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
