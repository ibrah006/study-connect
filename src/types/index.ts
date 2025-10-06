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