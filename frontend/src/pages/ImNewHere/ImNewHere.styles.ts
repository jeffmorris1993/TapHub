import styled from '@emotion/styled';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundGradient};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
  overflow-x: hidden;
`;

export const ContentContainer = styled.main`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.xl};
  }
`;
