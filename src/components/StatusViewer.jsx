import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Send, Pause, Play } from 'lucide-react';

export default function StatusViewer({
  status,
  onClose,
  onNextStatus,
  onPrevStatus,
  onReplyToStatus
}) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState('');

  const stories = status?.stories || [];
  const currentStory = stories[currentStoryIndex] || stories[0];

  // Auto-advance timer (5 seconds per story)
  useEffect(() => {
    if (!currentStory || isPaused) return;

    setProgress(0);
    const interval = 50; // update every 50ms
    const step = (interval / 5000) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          goToNext();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentStoryIndex, isPaused, status?.id]);

  const goToNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      // Advance to next contact's status or close if last
      const hasNext = onNextStatus?.();
      if (!hasNext) {
        onClose();
      }
    }
  };

  const goToPrev = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else {
      onPrevStatus?.();
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReplyToStatus(status, currentStory, replyText.trim());
    setReplyText('');
    onClose();
  };

  if (!status || !currentStory) return null;

  return (
    <div className="status-viewer-backdrop" role="dialog" aria-modal="true">
      <div
        className="status-viewer-card"
        style={{
          background: currentStory.type === 'text' ? (currentStory.background || '#075E54') : '#111b21'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Progress Bars */}
        <div className="status-progress-bars">
          {stories.map((story, idx) => (
            <div key={story.id || idx} className="status-progress-track">
              <div
                className="status-progress-fill"
                style={{
                  width: idx < currentStoryIndex ? '100%' : idx === currentStoryIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Status Header */}
        <div className="status-viewer-header">
          <div className="status-user-info">
            <img src={status.avatar} alt={status.name} className="status-header-avatar" />
            <div>
              <h3 className="status-header-name">{status.name}</h3>
              <span className="status-header-time">{currentStory.timestamp || status.time}</span>
            </div>
          </div>

          <div className="status-header-controls">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="status-control-btn"
              title={isPaused ? "Play" : "Pause"}
              type="button"
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>
            <button
              onClick={onClose}
              className="status-control-btn"
              title="Close viewer (Esc)"
              type="button"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Story Body */}
        <div className="status-story-body">
          {currentStory.type === 'text' ? (
            <div className="status-text-content" style={{ fontFamily: currentStory.fontFamily }}>
              <p>{currentStory.text}</p>
            </div>
          ) : (
            <div className="status-image-content">
              <img src={currentStory.imageUrl} alt="Status photo" className="status-full-image" />
              {currentStory.caption && (
                <div className="status-caption-bar">
                  <p>{currentStory.caption}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Click Zones & Buttons */}
          <button
            onClick={goToPrev}
            className="status-nav-arrow left"
            title="Previous story"
            type="button"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={goToNext}
            className="status-nav-arrow right"
            title="Next story"
            type="button"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Reply to Status Footer */}
        <form onSubmit={handleSendReply} className="status-reply-bar">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type a reply..."
            className="status-reply-input"
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          />
          <button
            type="submit"
            disabled={!replyText.trim()}
            className="status-reply-send-btn"
            title="Send reply"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
