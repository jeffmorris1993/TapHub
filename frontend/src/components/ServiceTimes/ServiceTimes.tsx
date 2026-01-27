import type { ServiceTime } from '@/types';
import {
  ServiceTimesContainer,
  ServiceTimesHeader,
  ClockIcon,
  ServiceTimesHeading,
  ServiceList,
  ServiceItem,
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
        <ClockIcon data-icon="clock" aria-hidden="true">
          🕐
        </ClockIcon>
        <ServiceTimesHeading>Service Times</ServiceTimesHeading>
      </ServiceTimesHeader>
      {sortedServices.length > 0 ? (
        <ServiceList role="list">
          {sortedServices.map((service) => {
            const period = getTimePeriod(service.id);
            const dayWithPeriod = period ? `${service.day} ${period}` : service.day;
            return (
              <ServiceItem key={service.id} role="listitem">
                {dayWithPeriod} - {service.serviceName} - {service.time}
              </ServiceItem>
            );
          })}
        </ServiceList>
      ) : null}
    </ServiceTimesContainer>
  );
};
