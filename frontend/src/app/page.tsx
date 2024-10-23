import HeroSection from '@/components/home/HeroSection';
import DestinationsSection from '@/components/home/DestinationsSection';
import ExperiencesSection from '@/components/home/ExperiencesSection';
import CommunitySection from '@/components/home/CommunitySection';
import AppDownloadSection from '@/components/home/AppDownloadSection';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <DestinationsSection />
      <ExperiencesSection />
      <CommunitySection />
      <AppDownloadSection />
    </main>
  );
}
