import React, { useState } from 'react';
import {
  MessageSquare,
  CircleDashed,
  Phone,
  Plus,
  Settings,
  MoreVertical,
  Moon,
  Sun,
  Users,
  Archive,
  Star,
  RefreshCw,
  LogOut
} from 'lucide-react';
import SearchBar from './SearchBar';
import ChatList from './ChatList';
import StatusList from './StatusList';
import CallHistory from './CallHistory';

export default function Sidebar({
  userProfile,
  chats,
  statuses,
  calls,
  activeTab,
  setActiveTab,
  activeChatId,
  onSelectChat,
  onOpenNewChatModal,
  onOpenProfileModal,
  onToggleTheme,
  onOpenStatusViewer,
  onOpenNewStatusModal,
  onInitiateCall,
  onOpenStartCallModal,
  onResetData,
  typingContactId
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUnread, setFilterUnread] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  // Total unread messages across all chats
  const totalUnreadCount = chats.reduce((acc, chat) => acc + (chat.unread || 0), 0);

  // Check if any contact has unviewed status
  const hasUnviewedStatus = statuses.some(s => s.userId !== 'user' && !s.viewed);

  return (
    <aside className="sidebar-container" role="region" aria-label="Sidebar navigation and conversations">
      {/* Top Header */}
      <header className="sidebar-main-header">
        <div
          className="user-avatar-btn-wrapper"
          onClick={onOpenProfileModal}
          title="Open Profile & Settings"
          role="button"
          tabIndex={0}
        >
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="user-header-avatar"
          />
          <span className="user-online-pip" title="Active"></span>
        </div>

        <div className="brand-logo-badge">
          <div className="brand-icon-box">
            <MessageSquare size={16} />
          </div>
          <span className="brand-name">ChatPulse</span>
        </div>

        {/* Action icons */}
        <div className="sidebar-header-actions">
          <button
            onClick={onToggleTheme}
            className="header-action-btn"
            title={`Switch to ${userProfile.theme === 'dark' ? 'Light' : 'Dark'} mode`}
            type="button"
          >
            {userProfile.theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            onClick={() => setActiveTab('status')}
            className={`header-action-btn ${activeTab === 'status' ? 'active' : ''}`}
            title="Status updates"
            type="button"
          >
            <CircleDashed size={19} />
            {hasUnviewedStatus && <span className="action-pip-dot"></span>}
          </button>

          <button
            onClick={() => setActiveTab('calls')}
            className={`header-action-btn ${activeTab === 'calls' ? 'active' : ''}`}
            title="Calls"
            type="button"
          >
            <Phone size={19} />
          </button>

          <button
            onClick={onOpenNewChatModal}
            className="header-action-btn"
            title="New Chat"
            type="button"
          >
            <Plus size={20} />
          </button>

          <div className="header-menu-container">
            <button
              onClick={() => setShowMenuDropdown(!showMenuDropdown)}
              className="header-action-btn"
              title="Menu"
              type="button"
            >
              <MoreVertical size={19} />
            </button>

            {showMenuDropdown && (
              <div
                className="sidebar-dropdown-menu"
                onMouseLeave={() => setShowMenuDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowMenuDropdown(false);
                    onOpenNewChatModal();
                  }}
                >
                  <Users size={16} /> New group
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMenuDropdown(false);
                    alert("Archived chats feature (Demo)");
                  }}
                >
                  <Archive size={16} /> Archived
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMenuDropdown(false);
                    alert("Starred messages feature (Demo)");
                  }}
                >
                  <Star size={16} /> Starred messages
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMenuDropdown(false);
                    onOpenProfileModal();
                  }}
                >
                  <Settings size={16} /> Settings
                </button>
                <hr className="dropdown-divider" />
                <button
                  type="button"
                  onClick={() => {
                    setShowMenuDropdown(false);
                    if (window.confirm("Reset all messages & sample data?")) {
                      onResetData();
                    }
                  }}
                  className="danger-item"
                >
                  <RefreshCw size={16} /> Reset demo data
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sidebar-tabs-nav" aria-label="Main Navigation">
        <button
          onClick={() => setActiveTab('chats')}
          className={`sidebar-nav-tab ${activeTab === 'chats' ? 'active' : ''}`}
          type="button"
        >
          <span>Chats</span>
          {totalUnreadCount > 0 && (
            <span className="tab-unread-pill">{totalUnreadCount}</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('status')}
          className={`sidebar-nav-tab ${activeTab === 'status' ? 'active' : ''}`}
          type="button"
        >
          <span>Status</span>
          {hasUnviewedStatus && <span className="tab-status-dot"></span>}
        </button>

        <button
          onClick={() => setActiveTab('calls')}
          className={`sidebar-nav-tab ${activeTab === 'calls' ? 'active' : ''}`}
          type="button"
        >
          <span>Calls</span>
        </button>
      </nav>

      {/* Tab Body */}
      <div className="sidebar-tab-viewport">
        {activeTab === 'chats' && (
          <div className="tab-chats-pane">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterUnread={filterUnread}
              setFilterUnread={setFilterUnread}
            />

            <ChatList
              chats={chats}
              activeChatId={activeChatId}
              onSelectChat={onSelectChat}
              searchQuery={searchQuery}
              filterUnread={filterUnread}
              typingContactId={typingContactId}
            />
          </div>
        )}

        {activeTab === 'status' && (
          <StatusList
            statuses={statuses}
            userProfile={userProfile}
            onOpenStatus={onOpenStatusViewer}
            onAddNewStatus={onOpenNewStatusModal}
          />
        )}

        {activeTab === 'calls' && (
          <CallHistory
            calls={calls}
            onInitiateCall={onInitiateCall}
            onOpenStartCallModal={onOpenStartCallModal}
          />
        )}
      </div>
    </aside>
  );
}
