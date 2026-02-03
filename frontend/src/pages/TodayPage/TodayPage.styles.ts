import styled from '@emotion/styled';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentContainer = styled.main`
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing['2xl']};
  }
`;

export const SectionSpacing = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
