import type { FC } from 'react';
import {
  HeroContainer,
  HeroImage,
  HeroOverlay,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
} from './MobileHeroSection.styles';

interface MobileHeroSectionProps {
  /** Main heading text */
  title: string;
  /** Subtitle text below the heading */
  subtitle: string;
  /** Background image source URL */
  imageSrc: string;
  /** Optional additional CSS class */
  className?: string;
}

/**
 * Mobile hero section with background image, gradient overlay, and centered text.
 * Only visible on mobile viewports (hidden on desktop via CSS).
 * Used on the "I'm New Here" page to display welcome messaging.
 */
export const MobileHeroSection: FC<MobileHeroSectionProps> = ({
  title,
  subtitle,
  imageSrc,
  className,
}) => {
  return (
    <HeroContainer role="banner" className={className}>
      <HeroImage src={imageSrc} alt="" aria-hidden="true" />
      <HeroOverlay />
      <HeroContent>
        <HeroTitle>{title}</HeroTitle>
        <HeroSubtitle>{subtitle}</HeroSubtitle>
      </HeroContent>
    </HeroContainer>
  );
};
