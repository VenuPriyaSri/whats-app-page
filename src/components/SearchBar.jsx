import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery, filterUnread, setFilterUnread }) {
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-container">
        <Search className="search-icon" size={17} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search or start new chat"
          className="search-input"
          aria-label="Search chats"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="search-clear-btn"
            title="Clear search"
            type="button"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <button
        onClick={() => setFilterUnread(!filterUnread)}
        className={`filter-btn ${filterUnread ? 'active' : ''}`}
        title={filterUnread ? "Show all chats" : "Filter unread chats"}
        type="button"
      >
        <Filter size={15} />
        {filterUnread && <span className="filter-badge">Unread</span>}
      </button>
    </div>
  );
}
