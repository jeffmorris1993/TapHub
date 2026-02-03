/**
 * A scheduled event for the current day.
 * Events are displayed in chronological order by time.
 */
export interface ScheduleEvent {
  /** Unique identifier (UUID from backend) */
  id: string;

  /** Event name (e.g., "Sunday School") */
  name: string;

  /** Location within the church (e.g., "Sanctuary", "Fellowship Hall") */
  location: string;

  /** Display time in 12-hour format (e.g., "10:00 AM") - pre-formatted */
  time: string;

  /** Sort order for display (lower = earlier in day) */
  order: number;
}

/**
 * A church announcement with icon, title, and description.
 * Announcements are time-sensitive communications to members.
 */
export interface Announcement {
  /** Unique identifier (UUID from backend) */
  id: string;

  /** Announcement title (e.g., "Individual Spiritual Growth Plan") */
  title: string;

  /** Full description text with call-to-action */
  description: string;

  /** Icon name from lucide-react icon set (e.g., "users", "calendar", "bell") */
  icon: string | null;

  /** Optional color for styling (e.g., "#c4956c") */
  color: string | null;

  /** Date when announcement should be published (ISO format) */
  publishDate: string | null;

  /** Announcement status */
  status: 'draft' | 'pending' | 'changes_requested' | 'approved' | 'rejected' | 'published';

  /** Timestamp when created (ISO format) */
  createdAt: string;

  /** Timestamp when last updated (ISO format) */
  updatedAt: string;
}

/**
 * Complete data for the Today page, returned by todayService.
 */
export interface TodayPageData {
  /** Today's scheduled events */
  schedule: ScheduleEvent[];

  /** Current announcements */
  announcements: Announcement[];

  /** The date this data is for (ISO format) */
  date: string;
}

/**
 * State returned by useTodayData hook.
 */
export interface UseTodayDataState {
  /** Schedule events for today */
  schedule: ScheduleEvent[];

  /** Current announcements */
  announcements: Announcement[];

  /** Whether data is currently loading */
  isLoading: boolean;

  /** Error message if fetch failed */
  error: string | null;

  /** Retry function to refetch data */
  retry: () => void;
}

/**
 * Props for ScheduleItem component
 */
export interface ScheduleItemProps {
  /** The schedule event to display */
  event: ScheduleEvent;
}

/**
 * Props for ScheduleList component
 */
export interface ScheduleListProps {
  /** List of schedule events */
  events: ScheduleEvent[];

  /** Whether data is loading */
  isLoading: boolean;

  /** Error message if any */
  error: string | null;

  /** Callback to retry fetching */
  onRetry: () => void;
}

/**
 * Props for AnnouncementCard component
 */
export interface AnnouncementCardProps {
  /** The announcement to display */
  announcement: Announcement;
}

/**
 * Props for AnnouncementsList component
 */
export interface AnnouncementsListProps {
  /** List of announcements */
  announcements: Announcement[];

  /** Whether data is loading */
  isLoading: boolean;

  /** Error message if any */
  error: string | null;

  /** Callback to retry fetching */
  onRetry: () => void;
}

/**
 * Props for Card component
 */
export interface CardProps {
  /** Optional card heading */
  heading?: string;

  /** Card content */
  children: React.ReactNode;

  /** Optional additional className */
  className?: string;
}

/**
 * Props for EmptyState component
 */
export interface EmptyStateProps {
  /** Message to display */
  message: string;

  /** Optional icon component */
  icon?: React.ReactNode;
}

/**
 * Props for ErrorState component
 */
export interface ErrorStateProps {
  /** Error message to display */
  message: string;

  /** Callback when retry button is clicked */
  onRetry: () => void;
}
