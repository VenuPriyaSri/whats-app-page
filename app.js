const defaultChats = [
    {
        id: 1,
        name: "Rahul",
        avatar: "https://ui-avatars.com/api/?name=Rahul&background=random",
        messages: [
            { text: "Hey, are you coming to college today?", time: "10:42 AM", sender: "received" }
        ]
    },
    {
        id: 2,
        name: "Anjali",
        avatar: "https://ui-avatars.com/api/?name=Anjali&background=random",
        messages: [
            { text: "I sent you the notes.", time: "9:35 AM", sender: "received" }
        ]
    },
    {
        id: 3,
        name: "Project Team",
        avatar: "https://ui-avatars.com/api/?name=Project+Team&background=random",
        messages: [
            { text: "Guys, let's complete the PPT today.", time: "8:20 AM", sender: "received" }
        ]
    },
    {
        id: 4,
        name: "Mom",
        avatar: "https://ui-avatars.com/api/?name=Mom&background=random",
        messages: [
            { text: "Call me when you are free.", time: "Yesterday", sender: "received" }
        ]
    },
    {
        id: 5,
        name: "Karthik",
        avatar: "https://ui-avatars.com/api/?name=Karthik&background=random",
        messages: [
            { text: "Check this website.", time: "Yesterday", sender: "received" }
        ]
    }
];

let chats = [];
let activeChatId = null;

// Initialize app
function init() {
    const storedChats = localStorage.getItem('whatsapp_chats');
    if (storedChats) {
        chats = JSON.parse(storedChats);
    } else {
        chats = defaultChats;
        saveChats();
    }
    renderChatList();
    setupEventListeners();
}

function saveChats() {
    localStorage.setItem('whatsapp_chats', JSON.stringify(chats));
}

function renderChatList() {
    const chatListEl = document.getElementById('chat-list');
    chatListEl.innerHTML = '';

    chats.forEach(chat => {
        const lastMsg = chat.messages[chat.messages.length - 1];
        const li = document.createElement('li');
        li.className = `chat-item ${activeChatId === chat.id ? 'active' : ''}`;
        li.onclick = () => openChat(chat.id);

        li.innerHTML = `
            <img src="${chat.avatar}" alt="${chat.name}" class="avatar">
            <div class="chat-item-info">
                <div class="chat-item-header">
                    <span class="chat-name">${chat.name}</span>
                    <span class="chat-time">${lastMsg ? lastMsg.time : ''}</span>
                </div>
                <div class="chat-last-msg">${lastMsg ? lastMsg.text : ''}</div>
            </div>
        `;
        chatListEl.appendChild(li);
    });
}

function openChat(id) {
    activeChatId = id;
    const chat = chats.find(c => c.id === id);
    
    // Update UI state
    document.getElementById('no-chat').style.display = 'none';
    document.getElementById('active-chat').style.display = 'flex';
    document.getElementById('current-chat-avatar').src = chat.avatar;
    document.getElementById('current-chat-name').textContent = chat.name;
    
    // For mobile
    document.getElementById('chat-area').classList.add('active');
    
    renderChatList(); // Update active state in list
    renderMessages();
}

function renderMessages() {
    const chat = chats.find(c => c.id === activeChatId);
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    
    chat.messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = `message ${msg.sender}`;
        div.innerHTML = `
            ${msg.text}
            <span class="msg-time">${msg.time}</span>
        `;
        container.appendChild(div);
    });
    
    scrollToBottom();
}

function scrollToBottom() {
    const container = document.getElementById('messages-container');
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    if (!activeChatId) return;
    
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    
    if (text === '') return;
    
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeString = `${hours}:${minutes} ${ampm}`;
    
    const chatIndex = chats.findIndex(c => c.id === activeChatId);
    chats[chatIndex].messages.push({
        text: text,
        time: timeString,
        sender: 'sent'
    });
    
    // Move chat to top
    const chat = chats.splice(chatIndex, 1)[0];
    chats.unshift(chat);
    
    input.value = '';
    document.getElementById('send-icon').className = 'fas fa-microphone';
    
    saveChats();
    renderChatList();
    renderMessages();
}

function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            e.target.classList.add('active');
            document.getElementById(`${e.target.dataset.tab}-tab`).classList.add('active');
        });
    });
    
    // Back button (mobile)
    document.getElementById('back-btn').addEventListener('click', () => {
        document.getElementById('chat-area').classList.remove('active');
        activeChatId = null;
        renderChatList();
    });
    
    // Message input
    const input = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const sendIcon = document.getElementById('send-icon');
    
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            sendIcon.className = 'fas fa-paper-plane';
        } else {
            sendIcon.className = 'fas fa-microphone';
        }
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    sendBtn.addEventListener('click', () => {
        if (input.value.trim() !== '') {
            sendMessage();
        }
    });
}

// Start
init();
