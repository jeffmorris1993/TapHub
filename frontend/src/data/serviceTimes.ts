import type { ServiceTime } from '@/types';

export const serviceTimes: ServiceTime[] = [
  {
    id: 'sunday-morning',
    day: 'Sunday',
    time: '10:00 AM',
    serviceName: 'Main Worship Service',
    order: 1,
  },
  {
    id: 'sunday-evening',
    day: 'Sunday',
    time: '6:00 PM',
    serviceName: 'Evening Service',
    order: 2,
  },
  {
    id: 'wednesday',
    day: 'Wednesday',
    time: '7:00 PM',
    serviceName: 'Bible Study',
    order: 3,
  },
];
