import React, { useState } from 'react';
import { Smile, Heart, Coffee, Activity, Sparkles, X } from 'lucide-react';

const EMOJI_CATEGORIES = [
  {
    id: 'smileys',
    name: 'Smileys',
    icon: Smile,
    emojis: ['😊', '😂', '🥰', '😍', '😎', '😉', '🤔', '😅', '🙌', '🔥', '✨', '🎉', '👍', '❤️', '🤩', '🥳', '😴', '😭', '😇', '🤗']
  },
  {
    id: 'gestures',
    name: 'Hands',
    icon: Sparkles,
    emojis: ['👍', '👎', '👌', '✌️', '🤞', '🤙', '👏', '🤝', '🙏', '💪', '👋', '✍️', '👊', '🫡', '💖', '💐']
  },
  {
    id: 'hearts',
    name: 'Love',
    icon: Heart,
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖']
  },
  {
    id: 'food',
    name: 'Food',
    icon: Coffee,
    emojis: ['☕', '🍵', '🍕', '🍔', '🍟', '🥪', '🥗', '🍿', '🍩', '🍪', '🍫', '🍎', '🍓', '🥑', '🍻', '🥤']
  },
  {
    id: 'activities',
    name: 'Fun',
    icon: Activity,
    emojis: ['⚽', '🏀', '🚴‍♂️', '🎮', '🎧', '🎸', '💻', '📱', '📚', '🚀', '🏖️', '✈️', '🚗', '☀️', '🌈', '⚡']
  }
];

export default function EmojiPicker({ onSelectEmoji, onClose }) {
  const [activeTab, setActiveTab] = useState('smileys');
  const [search, setSearch] = useState('');

  const currentCategory = EMOJI_CATEGORIES.find(c => c.id === activeTab) || EMOJI_CATEGORIES[0];

  const filteredEmojis = search.trim()
    ? EMOJI_CATEGORIES.flatMap(c => c.emojis).filter((emoji, idx, self) => self.indexOf(emoji) === idx)
    : currentCategory.emojis;

  return (
    <div className="emoji-picker-container" role="dialog" aria-label="Emoji Picker">
      <div className="emoji-picker-header">
        <span className="emoji-picker-title">Emojis</span>
        <button
          onClick={onClose}
          className="icon-btn-subtle"
          title="Close emoji picker"
          type="button"
        >
          <X size={16} />
        </button>
      </div>

      <div className="emoji-categories">
        {EMOJI_CATEGORIES.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setSearch('');
              }}
              className={`emoji-cat-btn ${activeTab === cat.id && !search ? 'active' : ''}`}
              title={cat.name}
              type="button"
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>

      <div className="emoji-grid">
        {filteredEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onSelectEmoji(emoji)}
            className="emoji-btn"
            type="button"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
