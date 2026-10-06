import React, { useRef } from 'react';
import { Image, FileText, MapPin, User, Camera } from 'lucide-react';

export default function AttachmentMenu({ onSendAttachment, onClose }) {
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSendAttachment({
          type: 'image',
          imageUrl: event.target.result,
          fileName: file.name,
          caption: ''
        });
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      onSendAttachment({
        type: 'document',
        fileName: file.name,
        fileSize: `${sizeMB} MB`,
        pages: 5
      });
      onClose();
    }
  };

  const sendSampleLocation = () => {
    onSendAttachment({
      type: 'location',
      title: 'City Center Hub',
      address: 'MG Road, Central Business District, Bengaluru',
      lat: 12.9716,
      lng: 77.5946
    });
    onClose();
  };

  const sendSampleContact = () => {
    onSendAttachment({
      type: 'contact',
      name: 'Priya Sharma',
      phone: '+91 97654 32109',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80'
    });
    onClose();
  };

  const sendPresetPhoto = () => {
    onSendAttachment({
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      fileName: 'Sunset_Beach.jpg',
      caption: 'Look at this gorgeous sunset! 🌅🌊'
    });
    onClose();
  };

  return (
    <div className="attachment-menu" role="menu">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={docInputRef}
        onChange={handleDocFileChange}
        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
        style={{ display: 'none' }}
      />

      <div className="attachment-item-wrapper">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="attachment-btn photo-btn"
          title="Upload Photo or Video"
          type="button"
        >
          <Image size={20} />
        </button>
        <span className="attachment-label">Photos & Videos</span>
      </div>

      <div className="attachment-item-wrapper">
        <button
          onClick={sendPresetPhoto}
          className="attachment-btn camera-btn"
          title="Send Sample Photo"
          type="button"
        >
          <Camera size={20} />
        </button>
        <span className="attachment-label">Sample Photo</span>
      </div>

      <div className="attachment-item-wrapper">
        <button
          onClick={() => docInputRef.current?.click()}
          className="attachment-btn document-btn"
          title="Send Document"
          type="button"
        >
          <FileText size={20} />
        </button>
        <span className="attachment-label">Document</span>
      </div>

      <div className="attachment-item-wrapper">
        <button
          onClick={sendSampleLocation}
          className="attachment-btn location-btn"
          title="Share Location"
          type="button"
        >
          <MapPin size={20} />
        </button>
        <span className="attachment-label">Location</span>
      </div>

      <div className="attachment-item-wrapper">
        <button
          onClick={sendSampleContact}
          className="attachment-btn contact-btn"
          title="Share Contact"
          type="button"
        >
          <User size={20} />
        </button>
        <span className="attachment-label">Contact</span>
      </div>
    </div>
  );
}
