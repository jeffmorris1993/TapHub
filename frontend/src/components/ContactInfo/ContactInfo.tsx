import type { ContactInfo as ContactInfoType } from '@/types';
import {
  ContactContainer,
  ContactContent,
  AddressText,
  ContactLink,
  ContactDivider,
} from './ContactInfo.styles';

export interface ContactInfoProps {
  contact: ContactInfoType;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  // Format phone number for tel: link (remove formatting)
  const phoneHref = `tel:${contact.phone.replace(/[^\d]/g, '')}`;

  return (
    <ContactContainer>
      <ContactContent>
        <AddressText>
          {contact.address.street}
          <br />
          {contact.address.cityStateZip}
        </AddressText>
        <div>
          <ContactLink href={phoneHref} aria-label={`Call ${contact.phone}`}>
            {contact.phone}
          </ContactLink>
          {contact.email && (
            <>
              <ContactDivider>|</ContactDivider>
              <ContactLink href={`mailto:${contact.email}`} aria-label={`Email ${contact.email}`}>
                {contact.email}
              </ContactLink>
            </>
          )}
        </div>
      </ContactContent>
    </ContactContainer>
  );
};
