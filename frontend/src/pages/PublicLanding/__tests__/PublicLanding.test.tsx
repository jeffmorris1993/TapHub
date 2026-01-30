import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/theme';
import { PublicLanding } from '../PublicLanding';
import { landingPageService } from '@/services';

// Mock the landing page service
vi.mock('@/services', () => ({
  landingPageService: {
    getLandingPageData: vi.fn(),
  },
}));

describe('PublicLanding', () => {
  const mockData = {
    contactInfo: {
      churchName: "Nehemiah's Temple of the Apostolic Faith",
      tagline: 'Come As You Are and Change As You Come',
      address: {
        street: '27303 Palmer St',
        cityStateZip: 'Madison Heights, MI 48071',
        full: '27303 Palmer St, Madison Heights, MI 48071',
      },
      phone: '(555) 123-4567',
      email: 'info@nehtemple.org',
      website: 'https://nehtemple.org',
    },
    hero: {
      imageUrl: '/hero-image.jpg',
      imageAlt: 'Church leadership welcoming visitors',
      heading: 'Welcome! 👋',
      subtitle: 'Choose an option below to get started',
      showOverlay: true,
    },
    navigationItems: [
      {
        id: 'new-here',
        icon: 'user',
        title: "I'm New Here",
        subtitle: 'Connect with us',
        route: '/new-visitor',
        order: 1,
        enabled: true,
      },
      {
        id: 'today',
        icon: 'calendar',
        title: 'Today at Nehemiah',
        subtitle: "See what's happening",
        route: '/today',
        order: 2,
        enabled: true,
      },
    ],
    serviceTimes: [
      {
        id: 'sunday-morning',
        day: 'Sunday',
        time: '10:00 AM',
        serviceName: 'Main Worship Service',
        order: 1,
      },
    ],
  };

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <ThemeProvider>{ui}</ThemeProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.mocked(landingPageService.getLandingPageData).mockResolvedValue(mockData);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loads and displays landing page data from service', async () => {
    renderWithProviders(<PublicLanding />);

    await waitFor(() => {
      expect(landingPageService.getLandingPageData).toHaveBeenCalledTimes(1);
    });
  });

  it('renders hero section with correct content', async () => {
    renderWithProviders(<PublicLanding />);

    // Wait for page content to load by checking for navigation card content
    await waitFor(() => {
      expect(screen.getByText("I'm New Here")).toBeInTheDocument();
    });

    // Welcome text appears in both HeroSection and WelcomeSection
    const welcomeElements = screen.getAllByText(/Welcome!/);
    expect(welcomeElements.length).toBeGreaterThanOrEqual(1);
    // Subtitle text also appears in multiple places
    const subtitleElements = screen.getAllByText('Choose an option below to get started');
    expect(subtitleElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders all navigation cards', async () => {
    renderWithProviders(<PublicLanding />);

    await waitFor(() => {
      expect(screen.getByText("I'm New Here")).toBeInTheDocument();
      expect(screen.getByText('Today at Nehemiah')).toBeInTheDocument();
    });
  });

  it('renders service times section', async () => {
    renderWithProviders(<PublicLanding />);

    await waitFor(() => {
      expect(screen.getByText('Service Times')).toBeInTheDocument();
      // Service times are rendered as separate elements
      expect(screen.getByText('Sunday Morning')).toBeInTheDocument();
      expect(screen.getByText('Main Worship Service')).toBeInTheDocument();
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    });
  });

  it('renders contact information', async () => {
    renderWithProviders(<PublicLanding />);

    await waitFor(() => {
      expect(screen.getByText(/27303 Palmer St/i)).toBeInTheDocument();
      expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    renderWithProviders(<PublicLanding />);

    // Should show some loading indicator before data loads
    expect(screen.queryByText('Welcome! 👋')).not.toBeInTheDocument();
  });

  it('handles service error gracefully', async () => {
    vi.mocked(landingPageService.getLandingPageData).mockRejectedValue(new Error('Failed to load'));

    renderWithProviders(<PublicLanding />);

    await waitFor(() => {
      // Should still render without crashing
      expect(landingPageService.getLandingPageData).toHaveBeenCalled();
    });
  });

  // User Story 5: Remove Bottom Navigation
  describe('US5: No Bottom Navigation', () => {
    it('does not render BottomNavigation component', async () => {
      const { container } = renderWithProviders(<PublicLanding />);

      await waitFor(() => {
        expect(screen.getByText("I'm New Here")).toBeInTheDocument();
      });

      // BottomNavigation should not be present
      const bottomNav = container.querySelector('[aria-label="Mobile navigation"]');
      expect(bottomNav).not.toBeInTheDocument();
    });
  });
});
