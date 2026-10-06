import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Send,
  Lock,
  ChevronDown,
  X,
  Trash2,
  UserCheck,
  Info,
  Clock,
  ChevronUp
} from 'lucide-react';
import MessageBubble from './MessageBubble';
import EmojiPicker from './EmojiPicker';
import AttachmentMenu from './AttachmentMenu';

export default function ChatWindow({
  activeChat,
  onSendMessage,
  onDeleteMessage,
  onClearChat,
  onCloseChat,
  onBackToSidebar,
  onInitiateCall,
  typingContactId,
  userProfile,
  onImageClick
}) {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  
  // In-chat search
  const [inChatSearchOpen, setInChatSearchOpen] = useState(false);
  const [inChatSearchQuery, setInChatSearchQuery] = useState('');
  const [searchMatchIndex, setSearchMatchIndex] = useState(0);

  // Voice recording simulation
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const isContactTyping = typingContactId === activeChat?.id;

  // Auto-scroll on messages change or typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isContactTyping]);

  // Voice recording timer
  useEffect(() => {
    let timer = null;
    if (isRecordingVoice) {
      setRecordDuration(0);
      timer = setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecordingVoice]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    onSendMessage({
      text: inputText.trim(),
      replyTo: replyingTo
    });

    setInputText('');
    setReplyingTo(null);
    setShowEmojiPicker(false);
    setShowAttachmentMenu(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (userProfile?.enterIsSend !== false) {
        e.preventDefault();
        handleSend();
      }
    }
  };

  const handleSendAttachment = (attachment) => {
    onSendMessage({
      text: attachment.caption || '',
      attachment,
      replyTo: replyingTo
    });
    setReplyingTo(null);
    setShowAttachmentMenu(false);
  };

  const handleFinishVoiceRecording = () => {
    const mins = Math.floor(recordDuration / 60);
    const secs = recordDuration % 60;
    const durStr = `${mins}:${secs.toString().padStart(2, '0')}`;

    onSendMessage({
      text: '',
      attachment: {
        type: 'voice',
        duration: durStr || '0:05'
      },
      replyTo: replyingTo
    });

    setIsRecordingVoice(false);
    setRecordDuration(0);
    setReplyingTo(null);
  };

  const handleCancelVoiceRecording = () => {
    setIsRecordingVoice(false);
    setRecordDuration(0);
  };

  const handleSelectEmoji = (emoji) => {
    setInputText(prev => prev + emoji);
    inputRef.current?.focus();
  };

  // If no chat is active, display WhatsApp empty state
  if (!activeChat) {
    return (
      <main className="chat-window-empty" role="main">
        <div className="empty-content-box">
          <div className="empty-illustration-circle">
            <Lock size={44} className="lock-icon" />
          </div>
          <h2>Select a chat to start messaging</h2>
          <p>
            Send messages, share updates and stay connected with your friends and teams.
          </p>
          <div className="empty-security-pill">
            <Lock size={13} />
            <span>End-to-end encrypted demo with persistent local storage</span>
          </div>
        </div>
      </main>
    );
  }

  // Filter messages if in-chat search is open
  const allMessages = activeChat.messages || [];
  const searchMatches = inChatSearchQuery.trim()
    ? allMessages.filter(m => m.text?.toLowerCase().includes(inChatSearchQuery.toLowerCase()))
    : [];

  return (
    <main className={`chat-window-container wallpaper-${userProfile?.wallpaper || 'doodle'}`} role="main">
      {/* Chat Top Header */}
      <header className="chat-window-header">
        <div className="chat-header-left">
          <button
            onClick={onBackToSidebar}
            className="chat-back-mobile-btn"
            title="Back to chats"
            type="button"
          >
            <ArrowLeft size={20} />
          </button>

          <div
            className="chat-header-avatar-group"
            onClick={() => setShowContactInfo(true)}
            role="button"
            tabIndex={0}
            title="View contact info"
          >
            <img
              src={activeChat.avatar}
              alt={activeChat.name}
              className="chat-header-avatar"
            />
            {activeChat.online && <span className="online-badge-pip"></span>}
          </div>

          <div
            className="chat-header-meta"
            onClick={() => setShowContactInfo(true)}
            role="button"
            tabIndex={0}
          >
            <h3 className="chat-header-name">{activeChat.name}</h3>
            <span className="chat-header-status">
              {isContactTyping ? (
                <span className="typing-green-status">
                  typing<span className="typing-dots">...</span>
                </span>
              ) : activeChat.online ? (
                'Online'
              ) : (
                activeChat.lastSeen || 'Offline'
              )}
            </span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="chat-header-actions">
          <button
            onClick={() => setInChatSearchOpen(!inChatSearchOpen)}
            className={`chat-header-btn ${inChatSearchOpen ? 'active' : ''}`}
            title="Search messages"
            type="button"
          >
            <Search size={19} />
          </button>

          <button
            onClick={() => onInitiateCall(activeChat, 'video')}
            className="chat-header-btn"
            title="Video call"
            type="button"
          >
            <Video size={19} />
          </button>

          <button
            onClick={() => onInitiateCall(activeChat, 'voice')}
            className="chat-header-btn"
            title="Voice call"
            type="button"
          >
            <Phone size={19} />
          </button>

          <div className="header-menu-container">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="chat-header-btn"
              title="More options"
              type="button"
            >
              <MoreVertical size={19} />
            </button>

            {showMoreMenu && (
              <div
                className="chat-header-dropdown-menu"
                onMouseLeave={() => setShowMoreMenu(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowMoreMenu(false);
                    setShowContactInfo(true);
                  }}
                >
                  <Info size={15} /> Contact info
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMoreMenu(false);
                    setInChatSearchOpen(true);
                  }}
                >
                  <Search size={15} /> Search messages
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMoreMenu(false);
                    if (window.confirm(`Clear all messages in chat with ${activeChat.name}?`)) {
                      onClearChat(activeChat.id);
                    }
                  }}
                  className="danger-item"
                >
                  <Trash2 size={15} /> Clear chat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMoreMenu(false);
                    onCloseChat();
                  }}
                >
                  <X size={15} /> Close chat
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* In-chat Search Bar Drawer */}
      {inChatSearchOpen && (
        <div className="in-chat-search-bar">
          <Search size={16} className="in-chat-search-icon" />
          <input
            type="text"
            placeholder="Search in conversation..."
            value={inChatSearchQuery}
            onChange={(e) => {
              setInChatSearchQuery(e.target.value);
              setSearchMatchIndex(0);
            }}
            className="in-chat-search-input"
            autoFocus
          />
          {inChatSearchQuery && (
            <span className="search-match-count">
              {searchMatches.length > 0 ? `${searchMatches.length} found` : 'No matches'}
            </span>
          )}
          <button
            onClick={() => {
              setInChatSearchOpen(false);
              setInChatSearchQuery('');
            }}
            className="in-chat-close-btn"
            title="Close search"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="chat-messages-container" ref={messagesContainerRef}>
        <div className="encryption-banner">
          <Lock size={12} />
          <span>Messages are end-to-end encrypted. No one outside of this chat can read them.</span>
        </div>

        <div className="chat-date-separator">
          <span>Today</span>
        </div>

        {allMessages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isGroup={activeChat.isGroup}
            onReply={(m) => {
              setReplyingTo(m);
              inputRef.current?.focus();
            }}
            onDelete={(msgId) => onDeleteMessage(activeChat.id, msgId)}
            onImageClick={onImageClick}
          />
        ))}

        {/* Real-time typing bubble if contact is typing */}
        {isContactTyping && (
          <div className="message-row received typing-row">
            <div className="message-bubble bubble-received typing-bubble">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Reply Banner preview above input */}
      {replyingTo && (
        <div className="replying-banner-preview">
          <div className="replying-border"></div>
          <div className="replying-content">
            <span className="replying-author">
              Replying to {replyingTo.sender === 'sent' ? 'yourself' : (replyingTo.senderName || activeChat.name)}
            </span>
            <p className="replying-snippet">
              {replyingTo.text || (replyingTo.attachment ? `[${replyingTo.attachment.type}]` : '')}
            </p>
          </div>
          <button
            onClick={() => setReplyingTo(null)}
            className="replying-cancel-btn"
            title="Cancel reply"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Voice Recording Active Bar */}
      {isRecordingVoice ? (
        <div className="voice-recording-bar">
          <div className="recording-status-dot"></div>
          <span className="recording-timer">
            {Math.floor(recordDuration / 60)}:{(recordDuration % 60).toString().padStart(2, '0')}
          </span>
          <div className="recording-waves">
            <span className="rec-bar"></span>
            <span className="rec-bar"></span>
            <span className="rec-bar"></span>
            <span className="rec-bar"></span>
          </div>
          <span className="recording-hint">Simulated audio recording</span>
          <div className="recording-actions">
            <button
              onClick={handleCancelVoiceRecording}
              className="rec-cancel-btn"
              title="Cancel recording"
              type="button"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={handleFinishVoiceRecording}
              className="rec-send-btn"
              title="Send voice note"
              type="button"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        /* Chat Input Footer */
        <footer className="chat-window-footer">
          {/* Emoji Popover */}
          {showEmojiPicker && (
            <EmojiPicker
              onSelectEmoji={handleSelectEmoji}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}

          {/* Attachment Menu Popover */}
          {showAttachmentMenu && (
            <AttachmentMenu
              onSendAttachment={handleSendAttachment}
              onClose={() => setShowAttachmentMenu(false)}
            />
          )}

          <div className="chat-input-left-tools">
            <button
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
                setShowAttachmentMenu(false);
              }}
              className={`footer-icon-btn ${showEmojiPicker ? 'active' : ''}`}
              title="Emojis"
              type="button"
            >
              <Smile size={23} />
            </button>

            <button
              onClick={() => {
                setShowAttachmentMenu(!showAttachmentMenu);
                setShowEmojiPicker(false);
              }}
              className={`footer-icon-btn ${showAttachmentMenu ? 'active' : ''}`}
              title="Attach media or document"
              type="button"
            >
              <Paperclip size={23} />
            </button>
          </div>

          <div className="chat-input-box-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message"
              className="chat-main-input"
              aria-label="Type message"
            />
          </div>

          <div className="chat-input-right-tools">
            {inputText.trim() ? (
              <button
                onClick={handleSend}
                className="footer-send-btn active"
                title="Send message"
                type="button"
              >
                <Send size={20} />
              </button>
            ) : (
              <button
                onClick={() => setIsRecordingVoice(true)}
                className="footer-send-btn mic"
                title="Record voice note"
                type="button"
              >
                <Mic size={22} />
              </button>
            )}
          </div>
        </footer>
      )}

      {/* Contact Info Drawer Modal */}
      {showContactInfo && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-dialog-box contact-info-modal">
            <div className="modal-header">
              <h3>Contact Info</h3>
              <button onClick={() => setShowContactInfo(false)} className="modal-close-btn" type="button">
                <X size={18} />
              </button>
            </div>
            <div className="contact-info-body">
              <div className="contact-info-avatar-block">
                <img src={activeChat.avatar} alt={activeChat.name} className="contact-info-lg-avatar" />
                <h3>{activeChat.name}</h3>
                <span className="contact-phone-sub">{activeChat.phone}</span>
              </div>

              <div className="contact-info-section">
                <label>About</label>
                <p>{activeChat.about || "Hey there! I am using WhatsApp."}</p>
              </div>

              {activeChat.isGroup && (
                <div className="contact-info-section">
                  <label>Group Participants ({activeChat.name})</label>
                  <p>Rahul, Anjali, Karthik, You</p>
                </div>
              )}

              <div className="contact-info-section">
                <label>Encryption</label>
                <p className="encryption-detail">
                  <Lock size={14} /> Messages and calls are end-to-end encrypted.
                </p>
              </div>

              <div className="contact-info-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowContactInfo(false);
                    if (window.confirm(`Clear chat history with ${activeChat.name}?`)) {
                      onClearChat(activeChat.id);
                    }
                  }}
                  className="danger-btn full-width"
                >
                  <Trash2 size={16} /> Clear chat history
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
