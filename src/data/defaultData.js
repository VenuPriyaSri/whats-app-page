// Default realistic demo data for the WhatsApp-style Web Application

export const defaultProfile = {
  name: "Alex Morgan",
  about: "Hey there! I am using ChatPulse.",
  phone: "+1 (555) 234-5678",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
  notifications: true,
  soundEnabled: true,
  enterIsSend: true,
  readReceipts: true,
  theme: "light",
  wallpaper: "doodle"
};

export const defaultChats = [
  {
    id: "chat-1",
    name: "Rahul",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+91 98765 43210",
    about: "Coding & Coffee ☕",
    online: true,
    lastSeen: "Online",
    unread: 2,
    pinned: true,
    messages: [
      {
        id: "m-1-1",
        text: "Hey! Did you check the college portal update?",
        time: "10:30 AM",
        date: "Today",
        sender: "received",
        status: "read"
      },
      {
        id: "m-1-2",
        text: "Yes, the semester project guidelines are out.",
        time: "10:35 AM",
        date: "Today",
        sender: "sent",
        status: "read"
      },
      {
        id: "m-1-3",
        text: "Hey, are you coming to college today?",
        time: "10:42 AM",
        date: "Today",
        sender: "received",
        status: "read"
      },
      {
        id: "m-1-4",
        text: "We need to submit the team formation sheet by 2 PM.",
        time: "10:43 AM",
        date: "Today",
        sender: "received",
        status: "read"
      }
    ]
  },
  {
    id: "chat-2",
    name: "Anjali",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+91 98123 45678",
    about: "Exploring design & code ✨",
    online: false,
    lastSeen: "Today at 9:40 AM",
    unread: 1,
    pinned: true,
    messages: [
      {
        id: "m-2-1",
        text: "Hi Alex! Did you get time to review the chapter 4 slides?",
        time: "9:20 AM",
        date: "Today",
        sender: "received",
        status: "read"
      },
      {
        id: "m-2-2",
        text: "Almost done, just checking the summary section.",
        time: "9:25 AM",
        date: "Today",
        sender: "sent",
        status: "read"
      },
      {
        id: "m-2-3",
        text: "I sent you the notes.",
        time: "9:35 AM",
        date: "Today",
        sender: "received",
        status: "read",
        attachment: {
          type: "document",
          fileName: "Computer_Networks_Unit4_Notes.pdf",
          fileSize: "2.4 MB",
          pages: 18
        }
      }
    ]
  },
  {
    id: "chat-3",
    name: "Project Team",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "Group • 4 participants",
    about: "Annual Hackathon Team Alpha 🚀",
    online: true,
    lastSeen: "Rahul, Anjali, Karthik, You",
    isGroup: true,
    unread: 3,
    pinned: false,
    messages: [
      {
        id: "m-3-1",
        senderName: "Karthik",
        text: "I finished the Figma wireframes for the dashboard.",
        time: "8:05 AM",
        date: "Today",
        sender: "received",
        status: "read"
      },
      {
        id: "m-3-2",
        senderName: "Anjali",
        text: "The color scheme looks super clean! Love the green accent.",
        time: "8:12 AM",
        date: "Today",
        sender: "received",
        status: "read"
      },
      {
        id: "m-3-3",
        senderName: "Rahul",
        text: "Guys, let's complete the PPT today.",
        time: "8:20 AM",
        date: "Today",
        sender: "received",
        status: "read"
      }
    ]
  },
  {
    id: "chat-4",
    name: "Mom",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+91 99887 76655",
    about: "Family is everything ❤️",
    online: true,
    lastSeen: "Online",
    unread: 0,
    pinned: false,
    messages: [
      {
        id: "m-4-1",
        text: "Have you had breakfast dear?",
        time: "Yesterday, 2:15 PM",
        date: "Yesterday",
        sender: "received",
        status: "read"
      },
      {
        id: "m-4-2",
        text: "Yes Mom, had cereal and fruits. Don't worry!",
        time: "Yesterday, 2:30 PM",
        date: "Yesterday",
        sender: "sent",
        status: "read"
      },
      {
        id: "m-4-3",
        text: "Call me when you are free.",
        time: "Yesterday, 8:30 PM",
        date: "Yesterday",
        sender: "received",
        status: "read"
      }
    ]
  },
  {
    id: "chat-5",
    name: "Karthik",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+91 98450 12345",
    about: "Building web apps with React & Vite",
    online: false,
    lastSeen: "Yesterday at 11:15 PM",
    unread: 0,
    pinned: false,
    messages: [
      {
        id: "m-5-1",
        text: "Look at this UI animation library I found.",
        time: "Yesterday, 6:10 PM",
        date: "Yesterday",
        sender: "received",
        status: "read"
      },
      {
        id: "m-5-2",
        text: "Check this website.",
        time: "Yesterday, 6:12 PM",
        date: "Yesterday",
        sender: "received",
        status: "read",
        attachment: {
          type: "link",
          url: "https://github.com/trending",
          title: "GitHub Trending Repositories",
          description: "Explore the most popular open source repositories on GitHub today."
        }
      },
      {
        id: "m-5-3",
        text: "Whoa, this is really cool! Thanks for sharing brother.",
        time: "Yesterday, 7:00 PM",
        date: "Yesterday",
        sender: "sent",
        status: "read"
      }
    ]
  },
  {
    id: "chat-6",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+91 97654 32109",
    about: "Product Designer @ Startup",
    online: false,
    lastSeen: "Oct 2 at 6:45 PM",
    unread: 0,
    pinned: false,
    messages: [
      {
        id: "m-6-1",
        text: "Don't forget tomorrow's meeting at 10 AM! We will present the redesign.",
        time: "Oct 2, 4:10 PM",
        date: "Oct 2",
        sender: "received",
        status: "read"
      },
      {
        id: "m-6-2",
        text: "Got it marked on my calendar. See you there!",
        time: "Oct 2, 4:15 PM",
        date: "Oct 2",
        sender: "sent",
        status: "read"
      }
    ]
  },
  {
    id: "chat-7",
    name: "David Miller",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+1 (555) 887-9922",
    about: "Fullstack Developer",
    online: true,
    lastSeen: "Online",
    unread: 0,
    pinned: false,
    messages: [
      {
        id: "m-7-1",
        text: "Did you push the latest commits to main branch?",
        time: "Sep 28, 3:20 PM",
        date: "Sep 28",
        sender: "received",
        status: "read"
      },
      {
        id: "m-7-2",
        text: "Yes, pull request is merged and tests are passing ✅",
        time: "Sep 28, 3:25 PM",
        date: "Sep 28",
        sender: "sent",
        status: "read"
      }
    ]
  }
];

export const defaultStatuses = [
  {
    id: "status-1",
    userId: "rahul",
    name: "Rahul",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&h=200&q=80",
    time: "Today, 10:15 AM",
    viewed: false,
    stories: [
      {
        id: "story-1-1",
        type: "text",
        text: "Good morning 🌅\nReady to conquer another productive day!",
        background: "linear-gradient(135deg, #128C7E, #075E54)",
        fontFamily: "'Segoe UI', sans-serif",
        timestamp: "10:15 AM"
      },
      {
        id: "story-1-2",
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
        caption: "Morning sunrise at the campus lake ☀️🏞️",
        timestamp: "10:18 AM"
      }
    ]
  },
  {
    id: "status-2",
    userId: "anjali",
    name: "Anjali",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    time: "Today, 08:30 AM",
    viewed: false,
    stories: [
      {
        id: "story-2-1",
        type: "text",
        text: "Working on my project 💻\nAlmost ready for submission!",
        background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
        fontFamily: "'Segoe UI', sans-serif",
        timestamp: "08:30 AM"
      }
    ]
  },
  {
    id: "status-3",
    userId: "karthik",
    name: "Karthik",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    time: "Today, 07:10 AM",
    viewed: false,
    stories: [
      {
        id: "story-3-1",
        type: "text",
        text: "Beautiful day! ☀️\nTime for a morning cycling session 🚴‍♂️",
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        fontFamily: "'Segoe UI', sans-serif",
        timestamp: "07:10 AM"
      }
    ]
  },
  {
    id: "status-4",
    userId: "priya",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80",
    time: "Yesterday, 11:20 PM",
    viewed: true,
    stories: [
      {
        id: "story-4-1",
        type: "text",
        text: "Coffee time & late night prototyping ☕✨",
        background: "linear-gradient(135deg, #0284c7, #0369a1)",
        fontFamily: "'Segoe UI', sans-serif",
        timestamp: "Yesterday, 11:20 PM"
      }
    ]
  }
];

export const defaultCalls = [
  {
    id: "call-1",
    name: "Rahul",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+91 98765 43210",
    callType: "voice",
    direction: "incoming", // incoming, outgoing, missed
    time: "Today, 11:20 AM",
    duration: "14m 22s"
  },
  {
    id: "call-2",
    name: "Anjali",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+91 98123 45678",
    callType: "video",
    direction: "outgoing",
    time: "Today, 10:05 AM",
    duration: "5m 12s"
  },
  {
    id: "call-3",
    name: "Mom",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+91 99887 76655",
    callType: "voice",
    direction: "missed",
    time: "Yesterday, 8:30 PM",
    duration: "Missed"
  },
  {
    id: "call-4",
    name: "Karthik",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+91 98450 12345",
    callType: "video",
    direction: "incoming",
    time: "Oct 2, 4:15 PM",
    duration: "22m 04s"
  },
  {
    id: "call-5",
    name: "David Miller",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    phone: "+1 (555) 887-9922",
    callType: "voice",
    direction: "outgoing",
    time: "Sep 29, 6:00 PM",
    duration: "8m 45s"
  }
];

// Smart auto-reply generator for demo contacts
export function generateAutoReply(userMessage, contact) {
  const text = (userMessage || "").toLowerCase().trim();

  // Custom replies based on specific questions
  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return `Hey! Nice to hear from you 😊`;
  }
  if (text.includes("how are you") || text.includes("how r u") || text.includes("how's it going")) {
    return `I'm doing great! How are things with you?`;
  }
  if (text.includes("college") || text.includes("class") || text.includes("campus")) {
    return `Yes, I am heading there in 15 minutes. See you in the lab!`;
  }
  if (text.includes("notes") || text.includes("pdf") || text.includes("book")) {
    return `Let me know if you need any other reference materials. Happy to share! 📚`;
  }
  if (text.includes("ppt") || text.includes("presentation") || text.includes("slides")) {
    return `I've prepared the introduction and architecture slides. Let's combine them tonight!`;
  }
  if (text.includes("call") || text.includes("phone")) {
    return `Sure! Let's connect on a quick call once you're free.`;
  }
  if (text.includes("where are you") || text.includes("where r u") || text.includes("location")) {
    return `I'm at the library right now, studying near the 2nd floor window.`;
  }
  if (text.includes("thanks") || text.includes("thank you")) {
    return `You're very welcome! Anytime 👍`;
  }
  if (text.includes("bye") || text.includes("good night") || text.includes("see you")) {
    return `Catch you later! Have an awesome day ahead 👋`;
  }

  // Persona-based fallback responses
  if (contact?.name === "Mom") {
    return `Take care of your health dear, and don't skip your meals! Love you ❤️`;
  }
  if (contact?.name === "Project Team") {
    return `Great point! Let's discuss this in our next scrum sync. 👍`;
  }
  if (contact?.name === "Rahul") {
    return `Sounds good brother! Let's catch up shortly. 👍`;
  }
  if (contact?.name === "Anjali") {
    return `Thanks for the update! I will check and get back to you soon 😊`;
  }

  return `Got it! Thanks for letting me know. I'll get back to you shortly 👍`;
}
