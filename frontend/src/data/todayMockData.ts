import type { ScheduleEvent, Announcement } from '@/types/today';

export const mockScheduleEvents: ScheduleEvent[] = [
  { id: '1', time: '10:00 AM', name: 'Sunday School', location: 'Sanctuary', order: 1 },
  { id: '2', time: '11:30 AM', name: 'Coffee & Fellowship', location: 'Fellowship Hall', order: 2 },
  { id: '3', time: '12:00 PM', name: 'Afternoon Service', location: 'Sanctuary', order: 3 },
  { id: '4', time: '2:00 PM', name: 'Dinner', location: 'Fellowship Hall', order: 4 },
  { id: '5', time: '4:00 PM', name: 'Youth Service', location: 'Youth Room', order: 5 },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Individual Spiritual Growth Plan',
    description: 'The ISGP has been released! Please make sure to fill in your intake form by Jan 31st 2026. Reach out to the support team for help!',
    icon: 'users',
    color: '#c4956c',
    publishDate: '2026-01-15',
    status: 'published',
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
];
