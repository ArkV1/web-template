import Image from 'next/image';

interface SocialIconProps {
  platform: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'tiktok';
  url: string;
}

export const SocialIcon = ({ platform, url }: SocialIconProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
    >
      <Image
        src={`/assets/${platform}.svg`}
        alt={`${platform} icon`}
        width={20}
        height={20}
        className="w-5 h-5"
      />
    </a>
  );
};
