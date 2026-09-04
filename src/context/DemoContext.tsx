import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  MemberStatus,
  ReferralStatus,
  UserProfile,
  MembershipApplication,
  Referral,
  Collaboration,
  Meeting,
  ThankYouNote,
  Testimonial,
  NotificationItem,
  Announcement,
  AuditLogItem,
  AttendanceStatus,
} from '../types';
import {
  mockCurrentUsers,
  mockMembersDirectory,
  mockApplications,
  mockReferrals,
  mockCollaborations,
  mockMeetings,
  mockThankYouNotes,
  mockTestimonials,
  mockNotifications,
  mockAnnouncements,
  mockAuditLogs,
} from '../mock/demoData';

interface ToastState {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

interface DemoContextType {
  currentRole: UserRole;
  currentUser: UserProfile;
  members: UserProfile[];
  applications: MembershipApplication[];
  referrals: Referral[];
  collaborations: Collaboration[];
  meetings: Meeting[];
  thankYouNotes: ThankYouNote[];
  testimonials: Testimonial[];
  notifications: NotificationItem[];
  announcements: Announcement[];
  auditLogs: AuditLogItem[];
  toasts: ToastState[];
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  switchRole: (role: UserRole) => void;
  submitApplication: (appData: Omit<MembershipApplication, 'id' | 'submittedAt' | 'status' | 'adminNotes' | 'history'>) => string;
  updateApplicationStatus: (appId: string, status: MemberStatus, comment?: string) => void;
  addAdminNote: (appId: string, noteText: string) => void;
  giveReferral: (refData: { receiverId: string; prospectName: string; prospectPhone: string; prospectEmail: string; businessOpportunity: string; description: string; estimatedValue: string }) => void;
  updateReferralStatus: (refId: string, status: ReferralStatus, note?: string) => void;
  sendThankYouNote: (noteData: { referralId: string; receiverId: string; template: string; message: string }) => void;
  submitTestimonial: (testData: { rating: number; testimonialText: string }) => void;
  approveTestimonial: (id: string) => void;
  rejectTestimonial: (id: string) => void;
  createCollaboration: (colData: Omit<Collaboration, 'id' | 'authorId' | 'authorName' | 'authorPhoto' | 'authorBusiness' | 'createdAt' | 'applicantsCount'>) => void;
  createMeeting: (mtgData: Omit<Meeting, 'id' | 'qrCodeToken' | 'attendeesCount' | 'status'>) => void;
  recordAttendance: (meetingId: string, memberId: string, method?: 'QR_SCAN' | 'MANUAL') => void;
  createAnnouncement: (ancData: Omit<Announcement, 'id' | 'authorName' | 'createdAt'>) => void;
  updateMemberStatus: (memberId: string, status: MemberStatus) => void;
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  activeMeetingQrModal: Meeting | null;
  setActiveMeetingQrModal: (meeting: Meeting | null) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockCurrentUsers.SUPER_ADMIN);
  const [members, setMembers] = useState<UserProfile[]>(mockMembersDirectory);
  const [applications, setApplications] = useState<MembershipApplication[]>(mockApplications);
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [collaborations, setCollaborations] = useState<Collaboration[]>(mockCollaborations);
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [thankYouNotes, setThankYouNotes] = useState<ThankYouNote[]>(mockThankYouNotes);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [activeMeetingQrModal, setActiveMeetingQrModal] = useState<Meeting | null>(null);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(mockCurrentUsers[role] || mockCurrentUsers.MEMBER);
    showToast(`Switched user role to ${role.replace('_', ' ')} mode`, 'info');
    
    // Auto navigate to relevant area based on role switch if appropriate
    if (role === 'VISITOR') {
      setCurrentRoute('/');
    } else if (role === 'MEMBER') {
      setCurrentRoute('/member/dashboard');
    } else {
      setCurrentRoute('/admin/dashboard');
    }
  };

  const addAuditLog = (action: string, target: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentRole,
      action,
      target,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '192.168.1.45',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // 1. Membership Application Submission
  const submitApplication = (appData: Omit<MembershipApplication, 'id' | 'submittedAt' | 'status' | 'adminNotes' | 'history'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const id = `VLBVN-2026-${randomNum}`;
    const newApp: MembershipApplication = {
      ...appData,
      id,
      submittedAt: new Date().toISOString(),
      status: 'PENDING_REVIEW',
      adminNotes: [],
      history: [
        {
          status: 'PENDING_REVIEW',
          updatedBy: appData.applicantName,
          timestamp: new Date().toISOString(),
          comment: 'Application submitted online.',
        },
      ],
    };

    setApplications((prev) => [newApp, ...prev]);
    addAuditLog('MEMBERSHIP_APPLICATION_SUBMITTED', `Applicant: ${appData.applicantName} (${id})`, `New multi-step membership request.`);
    showToast(`Membership application ${id} submitted successfully!`, 'success');
    return id;
  };

  // 2. Update Application Status (Admin Approval / Request Info / Reject)
  const updateApplicationStatus = (appId: string, status: MemberStatus, comment?: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedHistory = [
            ...app.history,
            {
              status,
              updatedBy: currentUser.name,
              timestamp: new Date().toISOString(),
              comment,
            },
          ];

          // If approved, also create member profile in members directory
          if (status === 'APPROVED' || status === 'ACTIVATED') {
            const newMember: UserProfile = {
              id: `usr-${Date.now()}`,
              name: app.applicantName,
              email: app.email,
              phone: app.phone,
              photoUrl: app.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
              role: 'MEMBER',
              status: 'ACTIVATED',
              city: app.city,
              state: 'India',
              businessName: app.businessName,
              profession: app.profession,
              category: app.category,
              services: app.services.split(',').map((s) => s.trim()),
              experienceYears: app.experienceYears,
              website: app.website,
              linkedin: app.linkedin,
              aboutBio: app.motivation,
              howICanHelp: app.contributions,
              whatImLookingFor: app.desiredCollaborations,
              chapter: `${app.city} Chapter`,
              joinedDate: new Date().toISOString().substring(0, 10),
              stats: {
                referralsGiven: 0,
                referralsReceived: 0,
                successfulReferrals: 0,
                collaborationsCount: 0,
                attendancePercentage: 100,
                contributionPoints: 100,
                thankYouNotesReceived: 0,
              },
              badges: ['Newly Activated Member'],
            };

            setMembers((mPrev) => {
              if (!mPrev.some((m) => m.email === app.email)) {
                return [...mPrev, newMember];
              }
              return mPrev;
            });
          }

          return {
            ...app,
            status,
            history: updatedHistory,
          };
        }
        return app;
      })
    );

    addAuditLog('APPLICATION_STATUS_UPDATED', `Application ${appId}`, `Status changed to ${status} by ${currentUser.name}`);
    showToast(`Application ${appId} marked as ${status.replace('_', ' ')}`, status === 'APPROVED' ? 'success' : 'info');
  };

  // 3. Add Admin Internal Note
  const addAdminNote = (appId: string, noteText: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const newNote = {
            id: `n-${Date.now()}`,
            authorName: currentUser.name,
            note: noteText,
            timestamp: new Date().toISOString(),
          };
          return {
            ...app,
            adminNotes: [...app.adminNotes, newNote],
          };
        }
        return app;
      })
    );
    showToast('Internal note attached to application dossier.', 'info');
  };

  // 4. Give Referral
  const giveReferral = (refData: {
    receiverId: string;
    prospectName: string;
    prospectPhone: string;
    prospectEmail: string;
    businessOpportunity: string;
    description: string;
    estimatedValue: string;
  }) => {
    const receiver = members.find((m) => m.id === refData.receiverId) || mockCurrentUsers.MEMBER;
    const refId = `REF-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newRef: Referral = {
      id: refId,
      referrerId: currentUser.id,
      referrerName: currentUser.name,
      referrerPhoto: currentUser.photoUrl,
      receiverId: receiver.id,
      receiverName: receiver.name,
      receiverPhoto: receiver.photoUrl,
      prospectName: refData.prospectName,
      prospectPhone: refData.prospectPhone,
      prospectEmail: refData.prospectEmail,
      businessOpportunity: refData.businessOpportunity,
      description: refData.description,
      estimatedValue: refData.estimatedValue,
      status: 'CREATED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'CREATED',
          updatedBy: currentUser.name,
          timestamp: new Date().toISOString(),
          note: 'Referral submitted.',
        },
      ],
      notes: [],
      thankYouSent: false,
      testimonialSubmitted: false,
    };

    setReferrals((prev) => [newRef, ...prev]);

    // Update Referrer stats
    setCurrentUser((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        referralsGiven: prev.stats.referralsGiven + 1,
        contributionPoints: prev.stats.contributionPoints + 50,
      },
    }));

    // Add Notification for Receiver
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        category: 'REFERRALS',
        title: 'New Referral Received!',
        message: `${currentUser.name} passed you a referral for "${refData.businessOpportunity}".`,
        timestamp: 'Just now',
        isRead: false,
        actionUrl: `/member/referrals/${refId}`,
      },
      ...prev,
    ]);

    addAuditLog('REFERRAL_CREATED', `Referral ${refId} to ${receiver.name}`, `Opportunity: ${refData.businessOpportunity}`);
    showToast(`Referral ${refId} successfully given to ${receiver.name}!`, 'success');
  };

  // 5. Update Referral Status (e.g. Converted)
  const updateReferralStatus = (refId: string, status: ReferralStatus, note?: string) => {
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === refId) {
          const updatedTimeline = [
            ...r.timeline,
            {
              status,
              updatedBy: currentUser.name,
              timestamp: new Date().toISOString(),
              note: note || `Status updated to ${status}`,
            },
          ];

          // If converted, trigger notifications and system prompts
          if (status === 'CONVERTED') {
            setNotifications((nPrev) => [
              {
                id: `notif-${Date.now()}`,
                category: 'REFERRALS',
                title: 'Referral Converted to Success! 🎉',
                message: `Referral "${r.businessOpportunity}" was marked as CONVERTED. Don't forget to send a Thank-You Note!`,
                timestamp: 'Just now',
                isRead: false,
                actionUrl: `/member/thank-you?refId=${r.id}`,
              },
              ...nPrev,
            ]);
          }

          return {
            ...r,
            status,
            updatedAt: new Date().toISOString(),
            timeline: updatedTimeline,
          };
        }
        return r;
      })
    );

    addAuditLog('REFERRAL_STATUS_UPDATED', `Referral ${refId}`, `Advanced to ${status}`);
    showToast(`Referral status updated to ${status.replace('_', ' ')}`, 'success');
  };

  // 6. Send Thank You Note
  const sendThankYouNote = (noteData: { referralId: string; receiverId: string; template: string; message: string }) => {
    const receiver = members.find((m) => m.id === noteData.receiverId) || mockCurrentUsers.COMMUNITY_ADMIN;
    const newNote: ThankYouNote = {
      id: `TY-${Date.now()}`,
      referralId: noteData.referralId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderPhoto: currentUser.photoUrl,
      receiverId: receiver.id,
      receiverName: receiver.name,
      template: noteData.template,
      message: noteData.message,
      createdAt: new Date().toISOString(),
    };

    setThankYouNotes((prev) => [newNote, ...prev]);

    // Mark referral as thank you sent
    setReferrals((prev) =>
      prev.map((r) => (r.id === noteData.referralId ? { ...r, thankYouSent: true } : r))
    );

    addAuditLog('THANK_YOU_NOTE_SENT', `Note to ${receiver.name}`, `Referral ID: ${noteData.referralId}`);
    showToast(`Thank-you note dispatched to ${receiver.name}!`, 'success');
  };

  // 7. Submit Testimonial
  const submitTestimonial = (testData: { rating: number; testimonialText: string }) => {
    const newT: Testimonial = {
      id: `TST-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorPhoto: currentUser.photoUrl,
      authorBusiness: currentUser.businessName,
      rating: testData.rating,
      testimonialText: testData.testimonialText,
      approvalStatus: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    setTestimonials((prev) => [newT, ...prev]);
    addAuditLog('TESTIMONIAL_SUBMITTED', `By ${currentUser.name}`, `Rating: ${testData.rating} Stars`);
    showToast('Testimonial submitted! Sent to VLBVN Admin for publication approval.', 'success');
  };

  // 8. Approve/Reject Testimonials (Admin)
  const approveTestimonial = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, approvalStatus: 'APPROVED' } : t))
    );
    showToast('Testimonial approved & published to community website.', 'success');
  };

  const rejectTestimonial = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, approvalStatus: 'REJECTED' } : t))
    );
    showToast('Testimonial request declined.', 'info');
  };

  // 9. Create Collaboration Request
  const createCollaboration = (
    colData: Omit<Collaboration, 'id' | 'authorId' | 'authorName' | 'authorPhoto' | 'authorBusiness' | 'createdAt' | 'applicantsCount'>
  ) => {
    const newCol: Collaboration = {
      ...colData,
      id: `COL-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorPhoto: currentUser.photoUrl,
      authorBusiness: currentUser.businessName,
      createdAt: new Date().toISOString(),
      applicantsCount: 0,
    };

    setCollaborations((prev) => [newCol, ...prev]);
    addAuditLog('COLLABORATION_POSTED', `Title: ${colData.title}`, `Type: ${colData.type}`);
    showToast('Collaboration request posted to VLBVN Network!', 'success');
  };

  // 10. Create Meeting & Agenda (Admin/Coordinator)
  const createMeeting = (mtgData: Omit<Meeting, 'id' | 'qrCodeToken' | 'attendeesCount' | 'status'>) => {
    const id = `MTG-2026-${Math.floor(10 + Math.random() * 90)}`;
    const newMtg: Meeting = {
      ...mtgData,
      id,
      qrCodeToken: `VLBVN-QR-${id}-VERIFIED`,
      attendeesCount: 0,
      status: 'UPCOMING',
    };

    setMeetings((prev) => [newMtg, ...prev]);
    addAuditLog('MEETING_CREATED', `Title: ${mtgData.title}`, `Date: ${mtgData.date}`);
    showToast(`New Meeting Conclave ${id} created and scheduled!`, 'success');
  };

  // 11. Record Attendance (QR Scan / Manual)
  const recordAttendance = (meetingId: string, memberId: string, method: 'QR_SCAN' | 'MANUAL' = 'QR_SCAN') => {
    setMeetings((prev) =>
      prev.map((m) => {
        if (m.id === meetingId) {
          return { ...m, attendeesCount: m.attendeesCount + 1 };
        }
        return m;
      })
    );

    setCurrentUser((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        attendancePercentage: Math.min(100, prev.stats.attendancePercentage + 2),
        contributionPoints: prev.stats.contributionPoints + 30,
      },
    }));

    addAuditLog('ATTENDANCE_RECORDED', `Meeting ${meetingId}`, `Member ${memberId} via ${method}`);
    showToast(`Attendance verified & recorded for Meeting ${meetingId}!`, 'success');
  };

  // 12. Create Announcement
  const createAnnouncement = (ancData: Omit<Announcement, 'id' | 'authorName' | 'createdAt'>) => {
    const newAnc: Announcement = {
      ...ancData,
      id: `anc-${Date.now()}`,
      authorName: currentUser.name,
      createdAt: new Date().toISOString(),
    };

    setAnnouncements((prev) => [newAnc, ...prev]);
    addAuditLog('ANNOUNCEMENT_BROADCAST', `Title: ${ancData.title}`, `Channels: ${ancData.channels.join(', ')}`);
    showToast(`Announcement broadcasted via ${ancData.channels.join(', ')}!`, 'success');
  };

  // 13. Update Member Status
  const updateMemberStatus = (memberId: string, status: MemberStatus) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, status } : m)));
    addAuditLog('MEMBER_STATUS_CHANGED', `Member ${memberId}`, `Status changed to ${status}`);
    showToast(`Member status updated to ${status}`, 'info');
  };

  return (
    <DemoContext.Provider
      value={{
        currentRole,
        currentUser,
        members,
        applications,
        referrals,
        collaborations,
        meetings,
        thankYouNotes,
        testimonials,
        notifications,
        announcements,
        auditLogs,
        toasts,
        currentRoute,
        setCurrentRoute,
        switchRole,
        submitApplication,
        updateApplicationStatus,
        addAdminNote,
        giveReferral,
        updateReferralStatus,
        sendThankYouNote,
        submitTestimonial,
        approveTestimonial,
        rejectTestimonial,
        createCollaboration,
        createMeeting,
        recordAttendance,
        createAnnouncement,
        updateMemberStatus,
        showToast,
        removeToast,
        activeMeetingQrModal,
        setActiveMeetingQrModal,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
