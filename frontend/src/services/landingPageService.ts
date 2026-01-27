import { navigationItems, serviceTimes, contactInfo, heroContent } from '@/data';
import type { PublicLandingPageData } from '@/types';

export const landingPageService = {
  /**
   * Get all landing page data
   * Currently returns static data from local files
   * Can be swapped to API call later without changing components
   */
  async getLandingPageData(): Promise<PublicLandingPageData> {
    return {
      contactInfo,
      hero: heroContent,
      navigationItems,
      serviceTimes,
    };
  },
};
