import styled from '@emotion/styled';

export const PanelContainer = styled.aside`
  display: none;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const PanelImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.7;
  z-index: 1;
`;

export const PanelContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing.xl};
  box-sizing: border-box;
`;

export const IconCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  svg {
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.colors.textOnPrimary};
  }
`;

export const PanelHeading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: 42px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  line-height: 52px;
`;

export const PanelQuote = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: 28px;
`;

export const PanelAttribution = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 24px;
`;
