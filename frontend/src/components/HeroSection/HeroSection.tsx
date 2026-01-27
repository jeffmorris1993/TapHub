import { useState } from 'react';
import {
  HeroContainer,
  HeroImage,
  HeroOverlay,
  HeroContent,
  HeroHeading,
  HeroSubtitle,
} from './HeroSection.styles';

export interface HeroSectionProps {
  heading: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  showOverlay: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subtitle,
  imageUrl,
  imageAlt,
  showOverlay,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <HeroContainer>
      {!imageError && (
        <HeroImage src={imageUrl} alt={imageAlt} onError={handleImageError} loading="lazy" />
      )}
      {showOverlay && <HeroOverlay data-testid="hero-overlay" />}
      <HeroContent>
        <HeroHeading>{heading}</HeroHeading>
        <HeroSubtitle>{subtitle}</HeroSubtitle>
      </HeroContent>
    </HeroContainer>
  );
};
