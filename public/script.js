// Connect to the Socket.IO server
const socket = io();

// Select DOM elements
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages');

// Listen for form submission
messageForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from refreshing the page

  // Send the message to the server
  const message = messageInput.value;
  socket.emit('chat message', message);

  // Clear the input field
  messageInput.value = '';
});

// Listen for messages from the server
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);

  // Scroll to the bottom of the chat
  messagesList.scrollTop = messagesList.scrollHeight;
});
