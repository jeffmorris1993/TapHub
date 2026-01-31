import { type FC, useState, useRef, useCallback } from 'react';
import { Header } from '@/components/Header';
import { SuccessConfirmation } from '@/components/SuccessConfirmation';
import { MobileHeroSection } from '@/components/MobileHeroSection';
import { DesktopDecorativePanel } from '@/components/DesktopDecorativePanel';
import { StickySubmitFooter } from '@/components/StickySubmitFooter';
import { VisitorForm, type VisitorFormRef } from './VisitorForm';
import {
  PageContainer,
  DesktopLayout,
  DesktopLeftPanel,
  DesktopHeader,
  DesktopTitle,
  DesktopSubtitle,
  DesktopFormScroll,
  MobileLayout,
  MobileContentScroll,
  MobileFormContainer,
  DesktopSuccessWrapper,
  MobileSuccessWrapper,
} from './ImNewHere.styles';

// Image paths - these would typically come from a CMS or config
const HERO_IMAGE = '/im_new_here.png';
const DECORATIVE_IMAGE = '/im_new_here.png';

/**
 * I'm New Here page for visitor registration.
 * Features a split layout on desktop (form left, decorative panel right)
 * and a fixed header/footer with scrollable form on mobile.
 *
 * Architecture: Both desktop and mobile layouts render separately in the DOM
 * but only one is visible at a time (controlled via CSS media queries).
 * Each layout has its own VisitorForm instance, but they share state at the
 * page level via callbacks.
 */
export const ImNewHerePage: FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const desktopFormRef = useRef<VisitorFormRef>(null);
  const mobileFormRef = useRef<VisitorFormRef>(null);

  const handleSuccess = useCallback(() => {
    setIsSuccess(true);
    setIsLoading(false);
  }, []);

  const handleSubmitAnother = useCallback(() => {
    setIsSuccess(false);
  }, []);

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  // Submit both forms - only the visible one will have data
  const handleDesktopSubmitClick = useCallback(() => {
    desktopFormRef.current?.submit();
  }, []);

  const handleMobileSubmitClick = useCallback(() => {
    mobileFormRef.current?.submit();
  }, []);

  // Content for different states
  const formTitle = "We're glad you're here!";
  const formSubtitle = 'Tell us a bit about yourself so we can connect';
  const successTitle = 'Welcome!';
  const successSubtitle = "We're excited to connect with you";

  return (
    <PageContainer>
      <Header />

      {/* Desktop Layout - Split Panel */}
      <DesktopLayout>
        <DesktopLeftPanel>
          <DesktopHeader>
            <DesktopTitle>{isSuccess ? successTitle : formTitle}</DesktopTitle>
            <DesktopSubtitle>{isSuccess ? successSubtitle : formSubtitle}</DesktopSubtitle>
          </DesktopHeader>

          {isSuccess ? (
            <DesktopSuccessWrapper>
              <SuccessConfirmation onSubmitAnother={handleSubmitAnother} />
            </DesktopSuccessWrapper>
          ) : (
            <>
              <DesktopFormScroll>
                <VisitorForm
                  ref={desktopFormRef}
                  onSuccess={handleSuccess}
                  onLoadingChange={handleLoadingChange}
                />
              </DesktopFormScroll>
              <StickySubmitFooter isLoading={isLoading} onClick={handleDesktopSubmitClick} />
            </>
          )}
        </DesktopLeftPanel>

        <DesktopDecorativePanel imageSrc={DECORATIVE_IMAGE} />
      </DesktopLayout>

      {/* Mobile Layout - Fixed Header/Footer with Scrollable Form */}
      <MobileLayout>
        <MobileHeroSection
          title={isSuccess ? successTitle : formTitle}
          subtitle={isSuccess ? successSubtitle : '"Come As You Are and Change As You Come"'}
          imageSrc={HERO_IMAGE}
        />

        <MobileContentScroll>
          <MobileFormContainer>
            {isSuccess ? (
              <MobileSuccessWrapper>
                <SuccessConfirmation onSubmitAnother={handleSubmitAnother} />
              </MobileSuccessWrapper>
            ) : (
              <VisitorForm
                ref={mobileFormRef}
                onSuccess={handleSuccess}
                onLoadingChange={handleLoadingChange}
              />
            )}
          </MobileFormContainer>
        </MobileContentScroll>

        {!isSuccess && (
          <StickySubmitFooter isLoading={isLoading} onClick={handleMobileSubmitClick} />
        )}
      </MobileLayout>
    </PageContainer>
  );
};
