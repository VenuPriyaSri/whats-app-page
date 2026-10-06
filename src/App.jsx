import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ProfileModal from './components/ProfileModal';
import NewChatModal from './components/NewChatModal';
import StartCallModal from './components/StartCallModal';
import CallingModal from './components/CallingModal';
import NewStatusModal from './components/NewStatusModal';
import StatusViewer from './components/StatusViewer';
import {
  defaultChats,
  defaultStatuses,
  defaultCalls,
  defaultProfile,
  generateAutoReply
} from './data/defaultData';
import { playSentSound, playReceivedSound } from './utils/audio';

export default function App() {
  // Load state from localStorage or defaultData
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('chatpulse_profile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [chats, setChats] = useState(() => {
    try {
      const saved = localStorage.getItem('chatpulse_chats');
      return saved ? JSON.parse(saved) : defaultChats;
    } catch {
      return defaultChats;
    }
  });

  const [statuses, setStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem('chatpulse_statuses');
      return saved ? JSON.parse(saved) : defaultStatuses;
    } catch {
      return defaultStatuses;
    }
  });

  const [calls, setCalls] = useState(() => {
    try {
      const saved = localStorage.getItem('chatpulse_calls');
      return saved ? JSON.parse(saved) : defaultCalls;
    } catch {
      return defaultCalls;
    }
  });

  const [activeTab, setActiveTab] = useState('chats'); // 'chats' | 'status' | 'calls'
  const [activeChatId, setActiveChatId] = useState(null);
  const [typingContactId, setTypingContactId] = useState(null);

  // Modals state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showStartCallModal, setShowStartCallModal] = useState(false);
  const [showNewStatusModal, setShowNewStatusModal] = useState(false);
  const [activeCallSession, setActiveCallSession] = useState(null); // { target, callType }
  const [activeStatusId, setActiveStatusId] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('chatpulse_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('chatpulse_chats', JSON.stringify(chats));
    } catch (e) {
      console.error(e);
    }
  }, [chats]);

  useEffect(() => {
    try {
      localStorage.setItem('chatpulse_statuses', JSON.stringify(statuses));
    } catch (e) {
      console.error(e);
    }
  }, [statuses]);

  useEffect(() => {
    try {
      localStorage.setItem('chatpulse_calls', JSON.stringify(calls));
    } catch (e) {
      console.error(e);
    }
  }, [calls]);

  // Sync theme with html root or body class
  useEffect(() => {
    const isDark = profile.theme === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [profile.theme]);

  // Helpers
  const formatCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Select a chat
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    // Mark messages as read and clear unread count
    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          unread: 0,
          messages: c.messages.map(m => ({ ...m, status: 'read' }))
        };
      }
      return c;
    }));
  };

  // Send a message
  const handleSendMessage = ({ text, attachment, replyTo }) => {
    if (!activeChatId) return;

    const timeStr = formatCurrentTime();
    const newMsg = {
      id: `msg-${Date.now()}`,
      text: text || '',
      time: timeStr,
      date: 'Today',
      sender: 'sent',
      status: profile.readReceipts ? 'read' : 'sent',
      attachment: attachment || null,
      replyTo: replyTo || null
    };

    if (profile.soundEnabled) {
      playSentSound();
    }

    const currentChat = chats.find(c => c.id === activeChatId);

    // Update chats: append message, move to top
    setChats(prev => {
      const chatIndex = prev.findIndex(c => c.id === activeChatId);
      if (chatIndex === -1) return prev;
      const updatedChat = {
        ...prev[chatIndex],
        messages: [...prev[chatIndex].messages, newMsg]
      };
      const filtered = prev.filter(c => c.id !== activeChatId);
      return [updatedChat, ...filtered];
    });

    // Trigger realistic auto-reply simulation for demo contacts
    if (currentChat && !currentChat.isGroup) {
      const contactId = currentChat.id;
      // Show typing indicator after 900ms
      setTimeout(() => {
        setTypingContactId(contactId);
      }, 900);

      // Reply after 2300ms
      setTimeout(() => {
        setTypingContactId(null);
        const replyText = generateAutoReply(text || '', currentChat);
        const replyMsg = {
          id: `reply-${Date.now()}`,
          text: replyText,
          time: formatCurrentTime(),
          date: 'Today',
          sender: 'received',
          status: 'read'
        };

        if (profile.soundEnabled) {
          playReceivedSound();
        }

        setChats(prev => {
          const chatIdx = prev.findIndex(c => c.id === contactId);
          if (chatIdx === -1) return prev;
          const target = {
            ...prev[chatIdx],
            messages: [...prev[chatIdx].messages, replyMsg],
            unread: activeChatId === contactId ? 0 : (prev[chatIdx].unread || 0) + 1
          };
          const others = prev.filter(c => c.id !== contactId);
          return [target, ...others];
        });
      }, 2300);
    }
  };

  // Delete message
  const handleDeleteMessage = (chatId, messageId) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: chat.messages.filter(m => m.id !== messageId)
        };
      }
      return chat;
    }));
  };

  // Clear chat
  const handleClearChat = (chatId) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: []
        };
      }
      return chat;
    }));
  };

  // Start new chat with created contact
  const handleCreateContact = ({ name, phone, about }) => {
    const newChat = {
      id: `chat-${Date.now()}`,
      name,
      phone,
      about,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=200&h=200&q=80`,
      online: true,
      lastSeen: "Online",
      unread: 0,
      pinned: false,
      messages: [
        {
          id: `m-init-${Date.now()}`,
          text: `Hey! I just added you on ChatPulse.`,
          time: formatCurrentTime(),
          date: "Today",
          sender: "sent",
          status: "read"
        }
      ]
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setActiveTab('chats');
  };

  // Create new group
  const handleCreateGroup = ({ name }) => {
    const newGroup = {
      id: `group-${Date.now()}`,
      name,
      phone: "Group • 5 participants",
      about: "Group created today",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&h=200&q=80",
      online: true,
      lastSeen: "Rahul, Anjali, Karthik, You",
      isGroup: true,
      unread: 0,
      pinned: false,
      messages: [
        {
          id: `m-grp-${Date.now()}`,
          text: `Group "${name}" was created.`,
          time: formatCurrentTime(),
          date: "Today",
          sender: "sent",
          status: "read"
        }
      ]
    };

    setChats(prev => [newGroup, ...prev]);
    setActiveChatId(newGroup.id);
    setActiveTab('chats');
  };

  // Add status
  const handleAddStatus = ({ text, background }) => {
    const newStory = {
      id: `story-${Date.now()}`,
      type: 'text',
      text,
      background,
      fontFamily: "'Segoe UI', sans-serif",
      timestamp: formatCurrentTime()
    };

    setStatuses(prev => {
      const userIndex = prev.findIndex(s => s.userId === 'user');
      if (userIndex !== -1) {
        const updated = [...prev];
        updated[userIndex] = {
          ...updated[userIndex],
          time: `Today, ${formatCurrentTime()}`,
          stories: [newStory, ...updated[userIndex].stories]
        };
        return updated;
      } else {
        const userStatusObj = {
          id: `status-user-${Date.now()}`,
          userId: 'user',
          name: 'My Status',
          avatar: profile.avatar,
          time: `Today, ${formatCurrentTime()}`,
          viewed: true,
          stories: [newStory]
        };
        return [userStatusObj, ...prev];
      }
    });

    setActiveTab('status');
  };

  // Status viewer actions
  const handleOpenStatus = (statusId) => {
    setActiveStatusId(statusId);
    // Mark as viewed
    setStatuses(prev => prev.map(s => {
      if (s.id === statusId) {
        return { ...s, viewed: true };
      }
      return s;
    }));
  };

  const handleNextStatus = () => {
    const currentIndex = statuses.findIndex(s => s.id === activeStatusId);
    if (currentIndex !== -1 && currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      setActiveStatusId(nextStatus.id);
      setStatuses(prev => prev.map(s => s.id === nextStatus.id ? { ...s, viewed: true } : s));
      return true;
    }
    return false;
  };

  const handlePrevStatus = () => {
    const currentIndex = statuses.findIndex(s => s.id === activeStatusId);
    if (currentIndex > 0) {
      const prevStatus = statuses[currentIndex - 1];
      setActiveStatusId(prevStatus.id);
      return true;
    }
    return false;
  };

  const handleReplyToStatus = (status, story, replyText) => {
    // Find contact's chat or create one
    let targetChat = chats.find(c => c.name.toLowerCase() === status.name.toLowerCase());
    const fullText = `Replied to your status: "${story.text || 'Photo'}":\n${replyText}`;

    if (targetChat) {
      setActiveChatId(targetChat.id);
      handleSendMessage({ text: fullText });
    } else {
      const newChat = {
        id: `chat-${Date.now()}`,
        name: status.name,
        avatar: status.avatar,
        online: true,
        lastSeen: 'Online',
        unread: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            text: fullText,
            time: formatCurrentTime(),
            date: 'Today',
            sender: 'sent',
            status: 'read'
          }
        ]
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newChat.id);
    }
    setActiveTab('chats');
  };

  // Initiate call
  const handleInitiateCall = (target, callType = 'voice') => {
    setActiveCallSession({ target, callType });
  };

  // End call
  const handleEndCall = ({ name, avatar, duration, callType }) => {
    const newCallRecord = {
      id: `call-${Date.now()}`,
      name,
      avatar,
      callType: callType || 'voice',
      direction: 'outgoing',
      time: `Today, ${formatCurrentTime()}`,
      duration: duration || '1m 15s'
    };

    setCalls(prev => [newCallRecord, ...prev]);
    setActiveCallSession(null);
  };

  // Reset to default demo data
  const handleResetData = () => {
    localStorage.removeItem('chatpulse_chats');
    localStorage.removeItem('chatpulse_statuses');
    localStorage.removeItem('chatpulse_calls');
    localStorage.removeItem('chatpulse_profile');

    setProfile(defaultProfile);
    setChats(defaultChats);
    setStatuses(defaultStatuses);
    setCalls(defaultCalls);
    setActiveChatId(null);
  };

  // Toggle Theme
  const handleToggleTheme = () => {
    setProfile(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  const activeChat = chats.find(c => c.id === activeChatId) || null;
  const currentViewingStatus = statuses.find(s => s.id === activeStatusId) || null;

  return (
    <div className={`app-root-shell ${profile.theme === 'dark' ? 'dark' : 'light'}`}>
      {/* Top green accent strip for desktop WhatsApp feel */}
      <div className="app-top-accent-bar" />

      {/* Main Responsive App Container */}
      <div className={`app-workspace-container ${activeChatId ? 'has-active-chat' : 'no-active-chat'}`}>
        {/* Left Sidebar */}
        <Sidebar
          userProfile={profile}
          chats={chats}
          statuses={statuses}
          calls={calls}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onOpenNewChatModal={() => setShowNewChatModal(true)}
          onOpenProfileModal={() => setShowProfileModal(true)}
          onToggleTheme={handleToggleTheme}
          onOpenStatusViewer={handleOpenStatus}
          onOpenNewStatusModal={() => setShowNewStatusModal(true)}
          onInitiateCall={handleInitiateCall}
          onOpenStartCallModal={() => setShowStartCallModal(true)}
          onResetData={handleResetData}
          typingContactId={typingContactId}
        />

        {/* Right Main Content */}
        <ChatWindow
          activeChat={activeChat}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          onClearChat={handleClearChat}
          onCloseChat={() => setActiveChatId(null)}
          onBackToSidebar={() => setActiveChatId(null)}
          onInitiateCall={handleInitiateCall}
          typingContactId={typingContactId}
          userProfile={profile}
          onImageClick={(url) => setZoomedImage(url)}
        />
      </div>

      {/* Modal Dialogs */}
      {showProfileModal && (
        <ProfileModal
          profile={profile}
          onUpdateProfile={(updated) => setProfile(updated)}
          onResetData={handleResetData}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {showNewChatModal && (
        <NewChatModal
          contacts={chats}
          onOpenChat={(id) => {
            handleSelectChat(id);
            setActiveTab('chats');
          }}
          onCreateContact={handleCreateContact}
          onCreateGroup={handleCreateGroup}
          onClose={() => setShowNewChatModal(false)}
        />
      )}

      {showStartCallModal && (
        <StartCallModal
          contacts={chats}
          onSelectCall={(contact, type) => {
            setShowStartCallModal(false);
            handleInitiateCall(contact, type);
          }}
          onClose={() => setShowStartCallModal(false)}
        />
      )}

      {showNewStatusModal && (
        <NewStatusModal
          onAddStatus={handleAddStatus}
          onClose={() => setShowNewStatusModal(false)}
        />
      )}

      {activeCallSession && (
        <CallingModal
          callTarget={activeCallSession.target}
          callType={activeCallSession.callType}
          onEndCall={handleEndCall}
        />
      )}

      {activeStatusId && currentViewingStatus && (
        <StatusViewer
          status={currentViewingStatus}
          onClose={() => setActiveStatusId(null)}
          onNextStatus={handleNextStatus}
          onPrevStatus={handlePrevStatus}
          onReplyToStatus={handleReplyToStatus}
        />
      )}

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="image-zoom-overlay"
          onClick={() => setZoomedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <img src={zoomedImage} alt="Zoomed view" className="image-zoom-content" />
          <button className="image-zoom-close" type="button" onClick={() => setZoomedImage(null)}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
