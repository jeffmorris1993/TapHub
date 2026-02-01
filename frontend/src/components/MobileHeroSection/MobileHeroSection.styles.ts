import styled from '@emotion/styled';

export const HeroContainer = styled.header`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  z-index: 1;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(196, 149, 108, 0.4) 0%, rgba(139, 111, 71, 0.4) 100%);
  z-index: 2;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  margin: 0;
  line-height: 28px;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`;

export const HeroSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 16px;
  text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);
`;
