import React from 'react';
import { Phone, Video, PhoneIncoming, PhoneOutgoing, PhoneMissed, PhoneCall } from 'lucide-react';

export default function CallHistory({ calls, onInitiateCall, onOpenStartCallModal }) {
  if (!calls || calls.length === 0) {
    return (
      <div className="empty-call-history">
        <PhoneCall size={40} className="empty-icon" />
        <p className="empty-title">No recent calls</p>
        <span className="empty-subtitle">
          Calls you make and receive will appear here.
        </span>
        <button
          onClick={onOpenStartCallModal}
          className="start-call-pill-btn"
          type="button"
        >
          <Phone size={16} /> Start a call
        </button>
      </div>
    );
  }

  return (
    <div className="call-history-container">
      <div className="call-history-header-actions">
        <span className="call-history-subheading">Recent calls</span>
      </div>

      <ul className="call-list" role="list">
        {calls.map(call => {
          const isMissed = call.direction === 'missed';
          const isIncoming = call.direction === 'incoming';
          const isOutgoing = call.direction === 'outgoing';

          return (
            <li key={call.id} className="call-item">
              <div className="call-avatar-wrapper">
                <img
                  src={call.avatar}
                  alt={call.name}
                  className="call-avatar"
                  loading="lazy"
                />
              </div>

              <div className="call-info">
                <span className="call-contact-name">{call.name}</span>
                <div className="call-direction-meta">
                  {isMissed && <PhoneMissed size={14} className="call-icon-missed" />}
                  {isIncoming && <PhoneIncoming size={14} className="call-icon-incoming" />}
                  {isOutgoing && <PhoneOutgoing size={14} className="call-icon-outgoing" />}
                  <span className={`call-time-text ${isMissed ? 'missed-text' : ''}`}>
                    {call.time} {call.duration ? `(${call.duration})` : ''}
                  </span>
                </div>
              </div>

              <div className="call-action-btns">
                <button
                  onClick={() => onInitiateCall(call, call.callType)}
                  className="call-direct-btn"
                  title={`Call ${call.name} (${call.callType})`}
                  type="button"
                >
                  {call.callType === 'video' ? <Video size={18} /> : <Phone size={18} />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Floating button to start a call */}
      <button
        onClick={onOpenStartCallModal}
        className="floating-start-call-btn"
        title="Start a new call"
        type="button"
      >
        <Phone size={22} />
      </button>
    </div>
  );
}
