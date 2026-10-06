import React, { useState, useRef } from 'react';
import { X, Camera, Check, Moon, Sun, Bell, Shield, MessageCircle, RefreshCw, Volume2, VolumeX } from 'lucide-react';

const PRESET_ABOUTS = [
  "Available",
  "Busy",
  "At work",
  "Battery about to die",
  "Can't talk, WhatsApp only",
  "In a meeting",
  "At the gym",
  "Sleeping 😴"
];

export default function ProfileModal({
  profile,
  onUpdateProfile,
  onResetData,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'settings'
  const [name, setName] = useState(profile.name);
  const [about, setAbout] = useState(profile.about);
  const [phone] = useState(profile.phone);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [theme, setTheme] = useState(profile.theme || 'light');
  const [wallpaper, setWallpaper] = useState(profile.wallpaper || 'doodle');
  const [soundEnabled, setSoundEnabled] = useState(profile.soundEnabled ?? true);
  const [enterIsSend, setEnterIsSend] = useState(profile.enterIsSend ?? true);
  const [readReceipts, setReadReceipts] = useState(profile.readReceipts ?? true);

  const fileInputRef = useRef(null);

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdateProfile({
      ...profile,
      name,
      about,
      avatar,
      theme,
      wallpaper,
      soundEnabled,
      enterIsSend,
      readReceipts
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-dialog-box profile-settings-dialog">
        <div className="modal-header">
          <div className="profile-tabs-header">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`profile-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            >
              Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`profile-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              Settings
            </button>
          </div>
          <button onClick={onClose} className="modal-close-btn" type="button">
            <X size={18} />
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="profile-panel-body">
            {/* Avatar section */}
            <div className="profile-avatar-center">
              <div className="profile-avatar-container" onClick={() => fileInputRef.current?.click()}>
                <img src={avatar} alt="Profile" className="profile-large-avatar" />
                <div className="avatar-hover-overlay">
                  <Camera size={24} />
                  <span>CHANGE PROFILE PHOTO</span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <span className="profile-avatar-hint">Click avatar to upload photo</span>
            </div>

            {/* Profile fields */}
            <div className="profile-fields-list">
              <div className="profile-field-group">
                <label>Your name</label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="profile-text-input"
                  />
                </div>
                <span className="field-note">
                  This is not your username or pin. This name will be visible to your WhatsApp contacts.
                </span>
              </div>

              <div className="profile-field-group">
                <label>About</label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="About status"
                    className="profile-text-input"
                  />
                </div>
                <div className="preset-about-chips">
                  {PRESET_ABOUTS.slice(0, 4).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAbout(item)}
                      className="about-chip"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="profile-field-group">
                <label>Phone number</label>
                <div className="profile-readonly-field">
                  <span>{phone}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-panel-body">
            {/* Appearance Section */}
            <div className="settings-section">
              <h4 className="settings-section-title">Appearance & Theme</h4>
              
              <div className="settings-toggle-row">
                <div className="settings-label-group">
                  {theme === 'dark' ? <Moon size={18} className="settings-icon" /> : <Sun size={18} className="settings-icon" />}
                  <div>
                    <h5>Dark theme</h5>
                    <p>Switch between light and dark mode</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`switch-btn ${theme === 'dark' ? 'active' : ''}`}
                  title="Toggle dark theme"
                >
                  <span className="switch-knob"></span>
                </button>
              </div>

              <div className="wallpaper-picker-row">
                <label>Chat Wallpaper</label>
                <div className="wallpaper-options">
                  {[
                    { id: 'doodle', name: 'Classic Doodle' },
                    { id: 'slate', name: 'Dark Slate' },
                    { id: 'emerald', name: 'Emerald' },
                    { id: 'beige', name: 'Warm Beige' }
                  ].map(w => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWallpaper(w.id)}
                      className={`wallpaper-pill ${wallpaper === w.id ? 'active' : ''}`}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sound & Notifications */}
            <div className="settings-section">
              <h4 className="settings-section-title">Sound & Notifications</h4>

              <div className="settings-toggle-row">
                <div className="settings-label-group">
                  {soundEnabled ? <Volume2 size={18} className="settings-icon" /> : <VolumeX size={18} className="settings-icon" />}
                  <div>
                    <h5>Message sounds</h5>
                    <p>Play pleasant audio chimes on send & receive</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`switch-btn ${soundEnabled ? 'active' : ''}`}
                >
                  <span className="switch-knob"></span>
                </button>
              </div>
            </div>

            {/* Privacy & Chat */}
            <div className="settings-section">
              <h4 className="settings-section-title">Privacy & Chat Options</h4>

              <div className="settings-toggle-row">
                <div className="settings-label-group">
                  <Shield size={18} className="settings-icon" />
                  <div>
                    <h5>Read receipts</h5>
                    <p>If turned off, blue double ticks will not be sent</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReadReceipts(!readReceipts)}
                  className={`switch-btn ${readReceipts ? 'active' : ''}`}
                >
                  <span className="switch-knob"></span>
                </button>
              </div>

              <div className="settings-toggle-row">
                <div className="settings-label-group">
                  <MessageCircle size={18} className="settings-icon" />
                  <div>
                    <h5>Enter is send</h5>
                    <p>Pressing Enter will send your message</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEnterIsSend(!enterIsSend)}
                  className={`switch-btn ${enterIsSend ? 'active' : ''}`}
                >
                  <span className="switch-knob"></span>
                </button>
              </div>
            </div>

            {/* Reset Demo Data */}
            <div className="settings-section danger-zone">
              <div className="settings-toggle-row">
                <div>
                  <h5 className="danger-text">Reset Demo Application</h5>
                  <p>Restore default sample conversations and contacts</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset all demo chats and data?")) {
                      onResetData();
                      onClose();
                    }
                  }}
                  className="reset-demo-btn"
                >
                  <RefreshCw size={15} /> Reset Data
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="modal-footer-actions">
          <button
            type="button"
            onClick={onClose}
            className="modal-secondary-btn"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="modal-primary-btn"
          >
            <Check size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
