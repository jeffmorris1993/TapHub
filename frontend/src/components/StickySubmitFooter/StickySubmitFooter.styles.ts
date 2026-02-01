import styled from '@emotion/styled';

export const FooterContainer = styled.footer`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;
  z-index: 10;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: relative;
    background-color: transparent;
    padding: ${({ theme }) => theme.spacing.lg} 0 0 0;
  }
`;

export const FooterButton = styled.div`
  width: 100%;
  max-width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: none;
  }

  /* Override SubmitButton styles for mobile footer */
  button {
    border-radius: ${({ theme }) => theme.radii.lg};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    min-height: 60px;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      border-radius: ${({ theme }) => theme.radii.full};
      min-height: 59px;
    }
  }
`;
