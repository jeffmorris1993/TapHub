import { FC, useState } from 'react';
import { Header } from '@/components/Header';
import { PageHeader } from '@/components/PageHeader';
import { SuccessConfirmation } from '@/components/SuccessConfirmation';
import { VisitorForm } from './VisitorForm';
import { PageContainer, ContentContainer } from './ImNewHere.styles';

/**
 * I'm New Here page for visitor registration.
 * Toggles between form and success confirmation state.
 */
export const ImNewHerePage: FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const handleSubmitAnother = () => {
    setIsSuccess(false);
  };

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <PageHeader
          title={isSuccess ? 'Welcome!' : "I'm New Here"}
          subtitle={
            isSuccess
              ? "We're excited to connect with you"
              : "We're so glad you're here!"
          }
        />
        {isSuccess ? (
          <SuccessConfirmation onSubmitAnother={handleSubmitAnother} />
        ) : (
          <VisitorForm onSuccess={handleSuccess} />
        )}
      </ContentContainer>
    </PageContainer>
  );
};
