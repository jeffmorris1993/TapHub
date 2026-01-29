import type { ContactInfo as ContactInfoType } from '@/types';
import {
  ContactContainer,
  ContactContent,
  AddressText,
  PhoneLink,
  EmailLink,
} from './ContactInfo.styles';

export interface ContactInfoProps {
  contact: ContactInfoType;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  // Format phone number for tel: link (remove non-digits)
  const phoneDigits = contact.phone.replace(/\D/g, '');

  return (
    <ContactContainer>
      <ContactContent>
        <AddressText>
          {contact.address.street}, {contact.address.cityStateZip}
        </AddressText>
        <PhoneLink href={`tel:${phoneDigits}`}>{contact.phone}</PhoneLink>
        {contact.email && (
          <EmailLink href={`mailto:${contact.email}`}>{contact.email}</EmailLink>
        )}
      </ContactContent>
    </ContactContainer>
  );
};
