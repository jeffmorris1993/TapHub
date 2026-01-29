import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '@/services';
import { useAnalytics } from '@/hooks';
import type { PublicLandingPageData } from '@/types';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { NavigationCard } from '@/components/NavigationCard';
import { ServiceTimes } from '@/components/ServiceTimes';
import { ContactInfo } from '@/components/ContactInfo';
import { BottomNavigation } from '@/components/BottomNavigation';
import {
  PageContainer,
  ContentContainer,
  WelcomeSection,
  WelcomeHeading,
  WelcomeSubtitle,
  NavigationList,
  Footer,
  FooterLink,
  LoadingContainer,
} from './PublicLanding.styles';

export const PublicLanding: React.FC = () => {
  const [data, setData] = useState<PublicLandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const landingPageData = await landingPageService.getLandingPageData();
        setData(landingPageData);
      } catch (err) {
        console.error('Failed to load landing page data:', err);
        setError('Failed to load page data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Track page view
  useEffect(() => {
    trackEvent({
      type: 'page_view',
      data: { timestamp: Date.now() },
    });
  }, [trackEvent]);

  const handleNavigationClick = (route: string, cardTitle: string) => {
    // Track navigation card click
    trackEvent({
      type: 'navigation_card_click',
      data: { cardTitle, timestamp: Date.now() },
    });
    navigate(route);
  };

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (error || !data) {
    return (
      <LoadingContainer>
        Unable to load page. Please try again later.
      </LoadingContainer>
    );
  }

  // Sort navigation items by order
  const sortedNavigationItems = [...data.navigationItems]
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <HeroSection
          heading={data.hero.heading}
          subtitle={data.hero.subtitle}
          imageUrl={data.hero.imageUrl}
          imageAlt={data.hero.imageAlt}
          showOverlay={data.hero.showOverlay}
        />
        <WelcomeSection>
          <WelcomeHeading>Welcome! 👋</WelcomeHeading>
          <WelcomeSubtitle>Choose an option below to get started</WelcomeSubtitle>
        </WelcomeSection>
        <NavigationList>
          {sortedNavigationItems.map((item, index) => (
            <NavigationCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              gradientIndex={index}
              onClick={() => handleNavigationClick(item.route, item.title)}
            />
          ))}
        </NavigationList>
        <ServiceTimes services={data.serviceTimes} />
        <ContactInfo contact={data.contactInfo} />
      </ContentContainer>
      <Footer>
        <FooterLink to="/help">Need help?</FooterLink>
      </Footer>
      <BottomNavigation />
    </PageContainer>
  );
};
