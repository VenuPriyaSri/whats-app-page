import React, { useState } from 'react';
import { X, Search, Phone, Video } from 'lucide-react';

export default function StartCallModal({ contacts, onSelectCall, onClose }) {
  const [search, setSearch] = useState('');

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone && c.phone.includes(search))
  );

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-dialog-box">
        <div className="modal-header">
          <h3>Start a call</h3>
          <button onClick={onClose} className="modal-close-btn" type="button">
            <X size={18} />
          </button>
        </div>

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

        <div className="modal-list-scroll">
          {filteredContacts.map(contact => (
            <div key={contact.id} className="contact-select-row">
              <img src={contact.avatar} alt={contact.name} className="contact-row-avatar" />
              <div className="contact-row-info">
                <h4>{contact.name}</h4>
                <p>{contact.about || contact.phone}</p>
              </div>
              <div className="contact-call-actions">
                <button
                  onClick={() => onSelectCall(contact, 'voice')}
                  className="call-action-icon-btn voice"
                  title="Voice call"
                  type="button"
                >
                  <Phone size={17} />
                </button>
                <button
                  onClick={() => onSelectCall(contact, 'video')}
                  className="call-action-icon-btn video"
                  title="Video call"
                  type="button"
                >
                  <Video size={17} />
                </button>
              </div>
            </div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="modal-empty-notice">
              <p>No matching contacts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
