import React, { useState } from 'react';
import { X, Search, UserPlus, Users, MessageSquare } from 'lucide-react';

export default function NewChatModal({
  contacts,
  onOpenChat,
  onCreateContact,
  onCreateGroup,
  onClose
}) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list'); // 'list' | 'new-contact' | 'new-group'
  
  // New contact form state
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAbout, setNewAbout] = useState('Available');

  // New group form state
  const [groupName, setGroupName] = useState('');

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone && c.phone.includes(search))
  );

  const handleCreateContactSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onCreateContact({
      name: newName.trim(),
      phone: newPhone.trim() || '+91 90000 00000',
      about: newAbout.trim() || 'Available'
    });
    onClose();
  };

  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    onCreateGroup({
      name: groupName.trim(),
      isGroup: true
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-dialog-box">
        <div className="modal-header">
          <h3>
            {view === 'list' && 'New chat'}
            {view === 'new-contact' && 'New contact'}
            {view === 'new-group' && 'New group'}
          </h3>
          <button onClick={onClose} className="modal-close-btn" type="button">
            <X size={18} />
          </button>
        </div>

        {view === 'list' && (
          <>
            <div className="modal-search-box">
              <Search size={16} className="modal-search-icon" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="modal-search-input"
                autoFocus
              />
            </div>

            {/* Quick Actions */}
            <div className="new-chat-quick-actions">
              <button
                onClick={() => setView('new-group')}
                className="quick-action-row"
                type="button"
              >
                <div className="quick-action-icon group-icon">
                  <Users size={20} />
                </div>
                <span>New group</span>
              </button>

              <button
                onClick={() => setView('new-contact')}
                className="quick-action-row"
                type="button"
              >
                <div className="quick-action-icon contact-icon">
                  <UserPlus size={20} />
                </div>
                <span>New contact</span>
              </button>
            </div>

            <div className="modal-list-subheading">
              <span>Contacts on WhatsApp</span>
            </div>

            <div className="modal-list-scroll">
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  onClick={() => {
                    onOpenChat(contact.id);
                    onClose();
                  }}
                  className="contact-select-row hoverable"
                >
                  <img src={contact.avatar} alt={contact.name} className="contact-row-avatar" />
                  <div className="contact-row-info">
                    <h4>{contact.name}</h4>
                    <p>{contact.about || contact.phone}</p>
                  </div>
                  <MessageSquare size={16} className="contact-message-icon" />
                </div>
              ))}

              {filteredContacts.length === 0 && (
                <div className="modal-empty-notice">
                  <p>No contacts found matching "{search}"</p>
                </div>
              )}
            </div>
          </>
        )}

        {view === 'new-contact' && (
          <form onSubmit={handleCreateContactSubmit} className="modal-form-content">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Maya Patel"
                required
                className="modal-form-input"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="e.g. +91 98200 12345"
                className="modal-form-input"
              />
            </div>
            <div className="form-group">
              <label>About / Status</label>
              <input
                type="text"
                value={newAbout}
                onChange={(e) => setNewAbout(e.target.value)}
                placeholder="e.g. Busy with exams"
                className="modal-form-input"
              />
            </div>
            <div className="modal-footer-actions">
              <button
                type="button"
                onClick={() => setView('list')}
                className="modal-secondary-btn"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!newName.trim()}
                className="modal-primary-btn"
              >
                Save Contact & Chat
              </button>
            </div>
          </form>
        )}

        {view === 'new-group' && (
          <form onSubmit={handleCreateGroupSubmit} className="modal-form-content">
            <div className="form-group">
              <label>Group Subject</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. College Study Group 🎓"
                required
                className="modal-form-input"
                autoFocus
              />
            </div>
            <div className="modal-footer-actions">
              <button
                type="button"
                onClick={() => setView('list')}
                className="modal-secondary-btn"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!groupName.trim()}
                className="modal-primary-btn"
              >
                Create Group
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
