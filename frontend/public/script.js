const socket = io("https://your-backend.onrender.com");
let username = '';

function setUsername() {
  const input = document.getElementById('username');
  username = input.value.trim();

  if (username) {
    socket.emit('set username', username);
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
  }
}

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function (data) {
  const item = document.createElement('li');
  item.textContent = `${data.username}: ${data.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
