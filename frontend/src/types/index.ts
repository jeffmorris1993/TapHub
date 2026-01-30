export interface NavigationItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  route: string;
  order: number;
  enabled: boolean;
}

export interface ServiceTime {
  id: string;
  day: string;
  time: string;
  serviceName: string;
  order: number;
}

export interface ContactInfo {
  churchName: string;
  tagline: string;
  address: {
    street: string;
    cityStateZip: string;
    full: string;
  };
  phone: string;
  email?: string;
  website?: string;
}

export interface HeroContent {
  imageUrl: string;
  imageAlt: string;
  heading: string;
  subtitle: string;
  showOverlay: boolean;
}

export interface PublicLandingPageData {
  contactInfo: ContactInfo;
  hero: HeroContent;
  navigationItems: NavigationItem[];
  serviceTimes: ServiceTime[];
}
