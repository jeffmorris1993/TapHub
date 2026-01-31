import styled from '@emotion/styled';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundGradient};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
  overflow-x: hidden;
`;

export const ContentContainer = styled.main`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;
`;
