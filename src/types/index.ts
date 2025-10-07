export interface User {
  id: string;
  email: string;
  name: string;
  university: string;
  major: string;
  graduationYear: number;
  bio: string;
  skills: string[];
  interests: string[];
  profileImage?: string;
  createdAt: string;
  connections?: Connection[];
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  user?: User;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  course: string;
  university: string;
  visibility: 'public' | 'private' | 'university-only';
  creatorId: string;
  members: GroupMember[];
  createdAt: string;
}

export interface GroupMember {
  id: string;
  userId: string;
  groupId: string;
  role: 'admin' | 'member';
  joinedAt: string;
  user?: User;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  type: 'internship' | 'full-time' | 'part-time' | 'contract';
  postedAt: string;
  expiresAt: string;
  companyLogo?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
  content: string;
  createdAt: string;
  sender?: User;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  university: string;
  memberCount: number;
  isActive: boolean;
  tags: string[];
  meetingSchedule: string;
  contactEmail: string;
  clubImage?: string;
  createdAt: string;
  president?: User;
  members?: ClubMember[];
}

export interface ClubMember {
  id: string;
  userId: string;
  clubId: string;
  role: 'president' | 'officer' | 'member';
  joinedAt: string;
  user?: User;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'social' | 'career' | 'sports' | 'cultural' | 'volunteer';
  date: string;
  time: string;
  location: string;
  university: string;
  organizerId: string;
  clubId?: string;
  maxAttendees?: number;
  currentAttendees: number;
  isVirtual: boolean;
  meetingLink?: string;
  tags: string[];
  eventImage?: string;
  createdAt: string;
  organizer?: User;
  club?: Club;
  attendees?: EventAttendee[];
}

export interface EventAttendee {
  id: string;
  userId: string;
  eventId: string;
  status: 'going' | 'interested' | 'not-going';
  rsvpAt: string;
  user?: User;
}