import styled from '@emotion/styled';

/**
 * Main page container with fixed header/footer layout on mobile,
 * split-panel layout on desktop.
 */
export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

/**
 * Desktop split-panel layout container.
 * Left side: form content, Right side: decorative panel.
 */
export const DesktopLayout = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex: 1;
    min-height: 0;
  }
`;

/**
 * Left panel for desktop - contains title, form, and submit button.
 */
export const DesktopLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing['2xl']};
  padding-left: ${({ theme }) => theme.spacing['2xl']};
  overflow: hidden;
`;

/**
 * Desktop header section with title and subtitle.
 */
export const DesktopHeader = styled.div`
  flex-shrink: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

/**
 * Desktop title styling.
 */
export const DesktopTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: 42px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  line-height: 52px;
`;

/**
 * Desktop subtitle styling.
 */
export const DesktopSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 28px;
`;

/**
 * Scrollable form container for desktop.
 */
export const DesktopFormScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: ${({ theme }) => theme.spacing.sm};

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }
`;

/**
 * Mobile layout container - only visible on mobile.
 */
export const MobileLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

/**
 * Mobile scrollable content area - the form scroll container.
 */
export const MobileContentScroll = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.colors.background};

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`;

/**
 * Inner padding container for mobile form content.
 */
export const MobileFormContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
`;

/**
 * Desktop-only success wrapper.
 */
export const DesktopSuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: ${({ theme }) => theme.spacing['2xl']};
`;

/**
 * Mobile-only success wrapper.
 */
export const MobileSuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;
