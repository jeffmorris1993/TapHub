import type { ContactInfo as ContactInfoType } from '@/types';
import {
  ContactContainer,
  ContactContent,
  AddressText,
  PhoneText,
} from './ContactInfo.styles';

export interface ContactInfoProps {
  contact: ContactInfoType;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  return (
    <ContactContainer>
      <ContactContent>
        <AddressText>
          {contact.address.street}, {contact.address.cityStateZip}
        </AddressText>
        <PhoneText>{contact.phone}</PhoneText>
      </ContactContent>
    </ContactContainer>
  );
};
