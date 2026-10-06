import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { playRingtone } from '../utils/audio';

export default function CallingModal({
  callTarget,
  callType = 'voice',
  onEndCall
}) {
  const [callState, setCallState] = useState('connecting'); // connecting -> ringing -> connected
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === 'video');
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  // Transition from connecting to ringing to connected
  useEffect(() => {
    const t1 = setTimeout(() => {
      setCallState('ringing');
      playRingtone();
    }, 1200);

    const t2 = setTimeout(() => {
      setCallState('connected');
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Duration timer when connected
  useEffect(() => {
    if (callState !== 'connected') return;

    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [callState]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleHangup = () => {
    onEndCall({
      ...callTarget,
      duration: callState === 'connected' ? formatTimer(callDuration) : 'Declined',
      callType: callType
    });
  };

  return (
    <div className="calling-modal-backdrop" role="dialog" aria-modal="true">
      <div className={`calling-modal-card ${callType === 'video' ? 'video-mode' : 'voice-mode'}`}>
        {/* If Video Call: Mock Video Feeds */}
        {callType === 'video' && (
          <div className="video-streams-container">
            {/* Remote contact video */}
            <div className="remote-video-frame">
              <img
                src={callTarget.avatar}
                alt={callTarget.name}
                className="remote-video-bg"
              />
              <div className="remote-video-overlay">
                <span className="remote-caller-label">{callTarget.name}</span>
              </div>
            </div>

            {/* Local self preview picture-in-picture */}
            {isVideoEnabled && (
              <div className="local-video-pip">
                <div className="local-video-mock">
                  <Sparkles size={16} className="pip-sparkle" />
                  <span>You</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Header & Status Info */}
        <div className="calling-info-header">
          {callType === 'voice' && (
            <div className="calling-avatar-wrapper">
              <div className={`calling-pulse-ring ${callState === 'connected' ? 'active' : ''}`}></div>
              <img
                src={callTarget.avatar}
                alt={callTarget.name}
                className="calling-avatar"
              />
            </div>
          )}

          <h2 className="calling-contact-name">{callTarget.name}</h2>

          <div className="calling-status-label">
            {callState === 'connecting' && <span className="status-fade">Connecting...</span>}
            {callState === 'ringing' && <span className="status-blink">Ringing...</span>}
            {callState === 'connected' && (
              <span className="status-connected">
                Connected • {formatTimer(callDuration)}
              </span>
            )}
          </div>

          <div className="calling-type-badge">
            {callType === 'video' ? 'WhatsApp Video Call (Demo)' : 'WhatsApp Voice Call (Demo)'}
          </div>
        </div>

        {/* Audio Waveform Animation if voice call connected */}
        {callType === 'voice' && callState === 'connected' && (
          <div className="calling-audio-waves">
            <span className="wave-bar animating"></span>
            <span className="wave-bar animating"></span>
            <span className="wave-bar animating"></span>
            <span className="wave-bar animating"></span>
            <span className="wave-bar animating"></span>
          </div>
        )}

        {/* Call Controls Toolbar */}
        <div className="calling-controls-toolbar">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`calling-ctrl-btn ${isMuted ? 'active-alert' : ''}`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
            type="button"
          >
            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
          </button>

          {callType === 'video' && (
            <button
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`calling-ctrl-btn ${!isVideoEnabled ? 'active-alert' : ''}`}
              title={isVideoEnabled ? "Turn Off Camera" : "Turn On Camera"}
              type="button"
            >
              {isVideoEnabled ? <Video size={22} /> : <VideoOff size={22} />}
            </button>
          )}

          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`calling-ctrl-btn ${!isSpeakerOn ? 'active-alert' : ''}`}
            title={isSpeakerOn ? "Speaker Off" : "Speaker On"}
            type="button"
          >
            {isSpeakerOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </button>

          <button
            onClick={handleHangup}
            className="calling-ctrl-btn hangup-btn"
            title="End Call"
            type="button"
          >
            <PhoneOff size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
