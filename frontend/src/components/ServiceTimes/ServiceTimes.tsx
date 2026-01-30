import { Calendar } from 'lucide-react';
import type { ServiceTime } from '@/types';
import {
  ServiceTimesContainer,
  ServiceTimesHeader,
  ServiceTimesHeading,
  ServiceList,
  ServiceItem,
  ServiceInfo,
  ServiceDay,
  ServiceName,
  ServiceTimeText,
} from './ServiceTimes.styles';

export interface ServiceTimesProps {
  services: ServiceTime[];
}

export const ServiceTimes: React.FC<ServiceTimesProps> = ({ services }) => {
  // Sort services by order
  const sortedServices = [...services].sort((a, b) => a.order - b.order);

  // Helper function to get time period (Morning/Evening) from service ID
  const getTimePeriod = (serviceId: string): string => {
    if (serviceId.includes('morning')) return 'Morning';
    if (serviceId.includes('evening')) return 'Evening';
    return '';
  };

  return (
    <ServiceTimesContainer>
      <ServiceTimesHeader>
        <Calendar size={20} color="#101828" aria-hidden="true" />
        <ServiceTimesHeading>Service Times</ServiceTimesHeading>
      </ServiceTimesHeader>
      {sortedServices.length > 0 ? (
        <ServiceList role="list">
          {sortedServices.map((service) => {
            const period = getTimePeriod(service.id);
            const dayWithPeriod = period ? `${service.day} ${period}` : service.day;
            return (
              <ServiceItem key={service.id} role="listitem">
                <ServiceInfo>
                  <ServiceDay>{dayWithPeriod}</ServiceDay>
                  <ServiceName>{service.serviceName}</ServiceName>
                </ServiceInfo>
                <ServiceTimeText>{service.time}</ServiceTimeText>
              </ServiceItem>
            );
          })}
        </ServiceList>
      ) : null}
    </ServiceTimesContainer>
  );
};
