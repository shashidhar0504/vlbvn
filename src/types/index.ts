export type UserRole = 'SUPER_ADMIN' | 'COMMUNITY_ADMIN' | 'COORDINATOR' | 'MEMBER' | 'VISITOR';

export type MemberStatus =
  | 'PENDING_REVIEW'
  | 'INFO_REQUIRED'
  | 'APPROVED'
  | 'ACTIVATED'
  | 'SUSPENDED'
  | 'REJECTED';

export type ReferralStatus =
  | 'CREATED'
  | 'RECEIVED'
  | 'CONTACTED'
  | 'IN_DISCUSSION'
  | 'CONVERTED'
  | 'NOT_CONVERTED'
  | 'CLOSED';

export type CollaborationStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'DECLINED';
export type CollaborationType = 'LOOKING_FOR' | 'CAN_HELP_WITH';

export type MeetingType = 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
export type AttendanceStatus = 'PRESENT' | 'LATE' | 'ABSENT';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  role: UserRole;
  status: MemberStatus;
  city: string;
  state: string;
  businessName: string;
  profession: string;
  category: string;
  services: string[];
  experienceYears: number;
  website?: string;
  linkedin?: string;
  aboutBio: string;
  howICanHelp: string;
  whatImLookingFor: string;
  chapter: string;
  joinedDate: string;
  stats: {
    referralsGiven: number;
    referralsReceived: number;
    successfulReferrals: number;
    collaborationsCount: number;
    attendancePercentage: number;
    contributionPoints: number;
    thankYouNotesReceived: number;
  };
  badges: string[];
}

export interface MembershipApplication {
  id: string; // e.g. VLBVN-2026-8942
  applicantName: string;
  email: string;
  phone: string;
  city: string;
  photoUrl: string;
  businessName: string;
  profession: string;
  category: string;
  services: string;
  experienceYears: number;
  website?: string;
  linkedin?: string;
  referralSource: string;
  referredByMemberId?: string;
  motivation: string;
  contributions: string;
  desiredCollaborations: string;
  submittedAt: string;
  status: MemberStatus;
  adminNotes: {
    id: string;
    authorName: string;
    note: string;
    timestamp: string;
  }[];
  history: {
    status: MemberStatus;
    updatedBy: string;
    timestamp: string;
    comment?: string;
  }[];
}

export interface Referral {
  id: string; // e.g. REF-2026-104
  referrerId: string;
  referrerName: string;
  referrerPhoto: string;
  receiverId: string;
  receiverName: string;
  receiverPhoto: string;
  prospectName: string;
  prospectPhone: string;
  prospectEmail: string;
  businessOpportunity: string;
  description: string;
  estimatedValue: string;
  status: ReferralStatus;
  createdAt: string;
  updatedAt: string;
  timeline: {
    status: ReferralStatus;
    updatedBy: string;
    timestamp: string;
    note?: string;
  }[];
  notes: string[];
  thankYouSent: boolean;
  testimonialSubmitted: boolean;
}

export interface Collaboration {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  authorBusiness: string;
  type: CollaborationType;
  title: string;
  category: string;
  description: string;
  tags: string[];
  status: CollaborationStatus;
  createdAt: string;
  applicantsCount: number;
}

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  description: string;
  presenter: string;
  durationMinutes: number;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  virtualLink?: string;
  type: MeetingType;
  coordinatorName: string;
  agenda: AgendaItem[];
  attendeesCount: number;
  qrCodeToken: string;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface AttendanceRecord {
  meetingId: string;
  memberId: string;
  status: AttendanceStatus;
  checkedInAt: string;
  verificationMethod: 'QR_SCAN' | 'MANUAL';
}

export interface ThankYouNote {
  id: string;
  referralId: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  receiverId: string;
  receiverName: string;
  template: string;
  message: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  authorBusiness: string;
  rating: number; // 1 to 5
  testimonialText: string;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  category: 'ALL' | 'IMPORTANT' | 'ACTIVITIES' | 'MEETINGS' | 'REFERRALS';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  audience: 'ALL' | 'CHAPTER' | 'CATEGORY';
  channels: ('IN_APP' | 'EMAIL' | 'WHATSAPP' | 'SMS')[];
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}
