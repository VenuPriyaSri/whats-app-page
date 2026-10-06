import React from 'react';
import { Pin, CheckCheck, Check, MessageSquareOff } from 'lucide-react';

export default function ChatList({
  chats,
  activeChatId,
  onSelectChat,
  searchQuery,
  filterUnread,
  typingContactId
}) {
  // Sort chats: pinned first, then by array order (recent first)
  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.messages.some(m => m.text?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesUnread = filterUnread ? (chat.unread && chat.unread > 0) : true;
    return matchesSearch && matchesUnread;
  });

  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  if (sortedChats.length === 0) {
    return (
      <div className="empty-chat-list">
        <MessageSquareOff size={40} className="empty-icon" />
        <p className="empty-title">No chats found</p>
        <span className="empty-subtitle">
          {searchQuery ? `No results for "${searchQuery}"` : "You have no unread chats"}
        </span>
      </div>
    );
  }

  return (
    <ul className="chat-list" role="list">
      {sortedChats.map(chat => {
        const lastMsg = chat.messages[chat.messages.length - 1];
        const isActive = activeChatId === chat.id;
        const isTyping = typingContactId === chat.id;

        return (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`chat-item ${isActive ? 'active' : ''}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectChat(chat.id);
              }
            }}
          >
            <div className="chat-avatar-wrapper">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="chat-avatar"
                loading="lazy"
              />
              {chat.online && <span className="online-indicator-dot" title="Online"></span>}
            </div>

            <div className="chat-info-block">
              <div className="chat-row-top">
                <span className="chat-contact-name">{chat.name}</span>
                <span className={`chat-last-time ${chat.unread > 0 ? 'unread-time' : ''}`}>
                  {lastMsg ? lastMsg.time : ''}
                </span>
              </div>

              <div className="chat-row-bottom">
                <div className="chat-last-message-snippet">
                  {isTyping ? (
                    <span className="typing-text-green">
                      typing<span className="typing-dots">...</span>
                    </span>
                  ) : lastMsg ? (
                    <>
                      {lastMsg.sender === 'sent' && (
                        <span className="msg-snippet-tick">
                          {lastMsg.status === 'read' ? (
                            <CheckCheck size={14} className="tick-blue" />
                          ) : (
                            <Check size={14} />
                          )}
                        </span>
                      )}
                      {lastMsg.attachment?.type === 'image' && '📷 Photo'}
                      {lastMsg.attachment?.type === 'document' && '📄 Document'}
                      {lastMsg.attachment?.type === 'location' && '📍 Location'}
                      {lastMsg.attachment?.type === 'contact' && '👤 Contact'}
                      {lastMsg.attachment?.type === 'voice' && '🎤 Voice note'}
                      {lastMsg.text && (!lastMsg.attachment || lastMsg.attachment.type === 'link') && (
                        <span>{lastMsg.text}</span>
                      )}
                    </>
                  ) : (
                    <span className="draft-empty">No messages yet</span>
                  )}
                </div>

                <div className="chat-badges-group">
                  {chat.pinned && (
                    <Pin size={14} className="pin-icon" title="Pinned chat" />
                  )}
                  {chat.unread > 0 && (
                    <span className="unread-counter-badge">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
