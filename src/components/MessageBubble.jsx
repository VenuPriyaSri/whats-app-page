import React, { useState } from 'react';
import { Check, CheckCheck, FileText, Download, MapPin, Phone, Play, Pause, CornerUpLeft, Trash2, Copy, MoreVertical } from 'lucide-react';

export default function MessageBubble({
  message,
  isGroup,
  onReply,
  onDelete,
  onImageClick
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isSent = message.sender === 'sent';

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard?.writeText(message.text);
    }
    setShowMenu(false);
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div
      className={`message-row ${isSent ? 'sent' : 'received'}`}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div className={`message-bubble ${isSent ? 'bubble-sent' : 'bubble-received'}`}>
        {/* Group Sender Name */}
        {isGroup && !isSent && message.senderName && (
          <div className="message-sender-name">{message.senderName}</div>
        )}

        {/* Replied Message Snippet */}
        {message.replyTo && (
          <div className="message-reply-preview">
            <span className="reply-sender">{message.replyTo.senderName || (message.replyTo.sender === 'sent' ? 'You' : 'Contact')}</span>
            <p className="reply-text">{message.replyTo.text || 'Media attachment'}</p>
          </div>
        )}

        {/* Attachment: Image */}
        {message.attachment?.type === 'image' && (
          <div className="message-image-wrapper">
            <img
              src={message.attachment.imageUrl}
              alt={message.attachment.fileName || "Shared image"}
              className="message-image"
              onClick={() => onImageClick?.(message.attachment.imageUrl)}
              loading="lazy"
            />
            {message.attachment.caption && (
              <p className="message-caption">{message.attachment.caption}</p>
            )}
          </div>
        )}

        {/* Attachment: Document */}
        {message.attachment?.type === 'document' && (
          <div className="message-doc-card">
            <div className="doc-icon-box">
              <FileText size={24} />
            </div>
            <div className="doc-details">
              <div className="doc-name">{message.attachment.fileName}</div>
              <div className="doc-meta">
                <span>{message.attachment.fileSize}</span>
                {message.attachment.pages && <span>• {message.attachment.pages} pages</span>}
              </div>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(`Downloading ${message.attachment.fileName} (Demo)`);
              }}
              className="doc-download-btn"
              title="Download file"
            >
              <Download size={18} />
            </a>
          </div>
        )}

        {/* Attachment: Location */}
        {message.attachment?.type === 'location' && (
          <div className="message-location-card">
            <div className="location-map-mock">
              <MapPin size={24} className="location-pin-icon" />
              <span>Interactive Map Preview</span>
            </div>
            <div className="location-details">
              <h4>{message.attachment.title}</h4>
              <p>{message.attachment.address}</p>
            </div>
          </div>
        )}

        {/* Attachment: Contact Card */}
        {message.attachment?.type === 'contact' && (
          <div className="message-contact-card">
            <img src={message.attachment.avatar} alt={message.attachment.name} className="contact-avatar-sm" />
            <div className="contact-card-info">
              <h4>{message.attachment.name}</h4>
              <p>{message.attachment.phone}</p>
            </div>
            <button
              onClick={() => alert(`Dialing ${message.attachment.phone} (Demo)`)}
              className="contact-call-btn"
              title="Call contact"
              type="button"
            >
              <Phone size={15} />
            </button>
          </div>
        )}

        {/* Attachment: Voice Note */}
        {message.attachment?.type === 'voice' && (
          <div className="message-voice-note">
            <button
              onClick={handleToggleAudio}
              className="voice-play-btn"
              type="button"
              title={isPlayingAudio ? "Pause" : "Play voice note"}
            >
              {isPlayingAudio ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="voice-waveform">
              <span className={`wave-bar ${isPlayingAudio ? 'animating' : ''}`}></span>
              <span className={`wave-bar ${isPlayingAudio ? 'animating' : ''}`}></span>
              <span className={`wave-bar ${isPlayingAudio ? 'animating' : ''}`}></span>
              <span className={`wave-bar ${isPlayingAudio ? 'animating' : ''}`}></span>
              <span className={`wave-bar ${isPlayingAudio ? 'animating' : ''}`}></span>
              <span className={`wave-bar ${isPlayingAudio ? 'animating' : ''}`}></span>
              <span className={`wave-bar ${isPlayingAudio ? 'animating' : ''}`}></span>
              <span className={`wave-bar ${isPlayingAudio ? 'animating' : ''}`}></span>
            </div>
            <span className="voice-duration">{message.attachment.duration || '0:14'}</span>
          </div>
        )}

        {/* Attachment: Link Preview */}
        {message.attachment?.type === 'link' && (
          <div className="message-link-card">
            <h4>{message.attachment.title}</h4>
            <p>{message.attachment.description}</p>
            <a href={message.attachment.url} target="_blank" rel="noopener noreferrer">
              {message.attachment.url}
            </a>
          </div>
        )}

        {/* Message Text Content */}
        {message.text && (
          <div className="message-text">
            {message.text}
          </div>
        )}

        {/* Bubble Meta: Time & Status Ticks */}
        <div className="message-meta">
          <span className="message-time">{message.time}</span>
          {isSent && (
            <span className={`message-status-tick ${message.status === 'read' ? 'read' : ''}`}>
              {message.status === 'sent' && <Check size={14} />}
              {message.status === 'delivered' && <CheckCheck size={14} />}
              {message.status === 'read' && <CheckCheck size={14} className="tick-blue" />}
            </span>
          )}
        </div>

        {/* Quick Action Trigger Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="bubble-action-trigger"
          title="Message options"
          type="button"
        >
          <MoreVertical size={14} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="bubble-dropdown-menu">
            <button
              onClick={() => {
                onReply(message);
                setShowMenu(false);
              }}
              type="button"
            >
              <CornerUpLeft size={13} /> Reply
            </button>
            {message.text && (
              <button onClick={handleCopy} type="button">
                <Copy size={13} /> Copy text
              </button>
            )}
            <button
              onClick={() => {
                onDelete(message.id);
                setShowMenu(false);
              }}
              className="danger-btn"
              type="button"
            >
              <Trash2 size={13} /> Delete message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
