import React from 'react';
import { Plus, Eye, Sparkles } from 'lucide-react';

export default function StatusList({
  statuses,
  userProfile,
  onOpenStatus,
  onAddNewStatus
}) {
  const userStatuses = statuses.filter(s => s.userId === 'user');
  const otherStatuses = statuses.filter(s => s.userId !== 'user');

  const unviewedStatuses = otherStatuses.filter(s => !s.viewed);
  const viewedStatuses = otherStatuses.filter(s => s.viewed);

  return (
    <div className="status-tab-content">
      {/* My Status Section */}
      <div className="my-status-card" onClick={onAddNewStatus}>
        <div className="my-status-avatar-wrapper">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="my-status-avatar"
          />
          <button className="add-status-plus-btn" title="Add status update" type="button">
            <Plus size={16} />
          </button>
        </div>
        <div className="my-status-info">
          <h4>My status</h4>
          <p>{userStatuses.length > 0 ? `${userStatuses[0].stories.length} status updates • Tap to add more` : "Tap to add status update"}</p>
        </div>
      </div>

      <div className="status-separator-title">
        <span>Recent updates</span>
      </div>

      {unviewedStatuses.length > 0 ? (
        <ul className="status-items-list">
          {unviewedStatuses.map(status => (
            <li
              key={status.id}
              className="status-item unviewed"
              onClick={() => onOpenStatus(status.id)}
            >
              <div className="status-ring-wrapper unviewed-ring">
                <img
                  src={status.avatar}
                  alt={status.name}
                  className="status-item-avatar"
                />
              </div>
              <div className="status-item-details">
                <span className="status-item-name">{status.name}</span>
                <span className="status-item-time">{status.time}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-recent-status">
          <p>No new updates from your contacts</p>
        </div>
      )}

      {/* Viewed updates section */}
      {viewedStatuses.length > 0 && (
        <>
          <div className="status-separator-title viewed-title">
            <span>Viewed updates</span>
          </div>
          <ul className="status-items-list">
            {viewedStatuses.map(status => (
              <li
                key={status.id}
                className="status-item viewed"
                onClick={() => onOpenStatus(status.id)}
              >
                <div className="status-ring-wrapper viewed-ring">
                  <img
                    src={status.avatar}
                    alt={status.name}
                    className="status-item-avatar"
                  />
                </div>
                <div className="status-item-details">
                  <span className="status-item-name">{status.name}</span>
                  <span className="status-item-time">{status.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {statuses.length === 0 && (
        <div className="empty-state">
          <Sparkles size={36} className="empty-icon" />
          <p>No status updates yet</p>
          <span>Share text, photos, and updates with your contacts</span>
        </div>
      )}
    </div>
  );
}
