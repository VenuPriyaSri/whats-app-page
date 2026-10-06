import React, { useState } from 'react';
import { X, Send, Palette, Smile } from 'lucide-react';

const GRADIENTS = [
  { id: 'emerald', bg: 'linear-gradient(135deg, #128C7E, #075E54)', label: 'Emerald' },
  { id: 'violet', bg: 'linear-gradient(135deg, #7c3aed, #4f46e5)', label: 'Violet' },
  { id: 'sunset', bg: 'linear-gradient(135deg, #f59e0b, #d97706)', label: 'Sunset' },
  { id: 'ocean', bg: 'linear-gradient(135deg, #0284c7, #0369a1)', label: 'Ocean' },
  { id: 'berry', bg: 'linear-gradient(135deg, #e11d48, #be123c)', label: 'Berry' },
  { id: 'night', bg: 'linear-gradient(135deg, #334155, #0f172a)', label: 'Midnight' }
];

const QUICK_EMOJIS = ['✨', '🔥', '☕', '💻', '🌅', '🎉', '📚', '🚀', '❤️', '🏖️'];

export default function NewStatusModal({ onAddStatus, onClose }) {
  const [statusText, setStatusText] = useState('');
  const [selectedGradient, setSelectedGradient] = useState(GRADIENTS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!statusText.trim()) return;

    onAddStatus({
      text: statusText.trim(),
      background: selectedGradient.bg
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-dialog-box status-creation-dialog">
        <div className="modal-header">
          <h3>Create status update</h3>
          <button onClick={onClose} className="modal-close-btn" type="button">
            <X size={18} />
          </button>
        </div>

        {/* Live Preview Card */}
        <div
          className="status-preview-box"
          style={{ background: selectedGradient.bg }}
        >
          <div className="status-preview-text">
            {statusText.trim() || "Type a status update..."}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="status-form-content">
          <div className="status-input-row">
            <textarea
              rows={3}
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              placeholder="What's on your mind? Type your status..."
              className="status-textarea"
              maxLength={200}
              autoFocus
            />
          </div>

          {/* Quick emoji row */}
          <div className="status-quick-emojis">
            {QUICK_EMOJIS.map((emoji, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setStatusText(prev => prev + emoji)}
                className="quick-emoji-btn"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Background color options */}
          <div className="status-color-options">
            <span className="color-label">Theme Background:</span>
            <div className="color-swatches">
              {GRADIENTS.map(grad => (
                <button
                  key={grad.id}
                  type="button"
                  onClick={() => setSelectedGradient(grad)}
                  className={`color-swatch-circle ${selectedGradient.id === grad.id ? 'active' : ''}`}
                  style={{ background: grad.bg }}
                  title={grad.label}
                />
              ))}
            </div>
          </div>

          <div className="modal-footer-actions">
            <button
              type="button"
              onClick={onClose}
              className="modal-secondary-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!statusText.trim()}
              className="modal-primary-btn"
            >
              <Send size={16} /> Share Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
