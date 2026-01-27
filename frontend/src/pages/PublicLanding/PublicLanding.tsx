import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { landingPageService } from '@/services';
import { useAnalytics } from '@/hooks';
import type { PublicLandingPageData } from '@/types';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { NavigationCard } from '@/components/NavigationCard';
import { ServiceTimes } from '@/components/ServiceTimes';
import { ContactInfo } from '@/components/ContactInfo';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const NavigationGrid = styled.section`
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

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
      <HeroSection
        heading={data.hero.heading}
        subtitle={data.hero.subtitle}
        imageUrl={data.hero.imageUrl}
        imageAlt={data.hero.imageAlt}
        showOverlay={data.hero.showOverlay}
      />
      <NavigationGrid>
        {sortedNavigationItems.map((item) => (
          <NavigationCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onClick={() => handleNavigationClick(item.route, item.title)}
          />
        ))}
      </NavigationGrid>
      <ServiceTimes services={data.serviceTimes} />
      <ContactInfo contact={data.contactInfo} />
    </PageContainer>
  );
};
