const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const crypto = require('crypto');

const BASE_PATH = process.env.BASE_PATH || '/burn-chat';
const PORT = process.env.PORT || 3005;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  path: `${BASE_PATH}/socket.io`
});

app.use(express.json());
app.use(BASE_PATH, express.static(path.join(__dirname, 'public')));

app.get(BASE_PATH, (req, res) => res.sendFile(path.join(__dirname, 'public', 'create.html')));
app.get(`${BASE_PATH}/`, (req, res) => res.sendFile(path.join(__dirname, 'public', 'create.html')));

const rooms = new Map();

const namePools = {
  animal: ['Lion', 'Tiger', 'Bear', 'Wolf', 'Fox', 'Deer', 'Eagle', 'Owl', 'Rabbit', 'Panda', 'Koala', 'Dolphin'],
  fruit: ['Apple', 'Banana', 'Orange', 'Grape', 'Mango', 'Peach', 'Cherry', 'Lemon', 'Kiwi', 'Melon', 'Pear', 'Plum'],
  vegetable: ['Carrot', 'Potato', 'Tomato', 'Onion', 'Cabbage', 'Broccoli', 'Spinach', 'Pepper', 'Corn', 'Bean', 'Pea', 'Radish']
};

function generateId() {
  return crypto.randomBytes(8).toString('hex');
}

function getAvailableNames(category, usedNames) {
  const pool = namePools[category] || namePools.animal;
  return pool.filter(name => !usedNames.has(name));
}

app.post(`${BASE_PATH}/api/create-room`, (req, res) => {
  const { maxPeople, hours, category, creatorName, deepEncrypt, password } = req.body;

  if (!maxPeople || maxPeople < 2 || maxPeople > 8) {
    return res.status(400).json({ error: 'Participants must be between 2 and 8' });
  }
  const allowedHours = [1, 2, 4, 8, 12, 24];
  if (!allowedHours.includes(Number(hours))) {
    return res.status(400).json({ error: 'Invalid duration' });
  }
  if (!namePools[category]) {
    return res.status(400).json({ error: 'Invalid name category' });
  }
  if (!creatorName || !namePools[category].includes(creatorName)) {
    return res.status(400).json({ error: 'Please select a name from the category' });
  }

  const roomId = generateId();
  const expireAt = Date.now() + Number(hours) * 60 * 60 * 1000;

  const inviteLinks = [];
  for (let i = 0; i < maxPeople - 1; i++) {
    const token = generateId();
    inviteLinks.push({
      token,
      url: `${BASE_PATH}/join/${roomId}/${token}`
    });
  }

  rooms.set(roomId, {
    id: roomId,
    maxPeople: Number(maxPeople),
    hours: Number(hours),
    category,
    creatorName,
    deepEncrypt: !!deepEncrypt,
    password: deepEncrypt ? password : null,
    expireAt,
    users: new Map(),
    messages: [],
    usedTokens: new Set(),
    availableTokens: new Set(inviteLinks.map(l => l.token)),
    dissolved: false
  });

  setTimeout(() => {
    if (rooms.has(roomId)) {
      io.to(roomId).emit('system', 'Room session has expired; room automatically disbanded.');
      rooms.delete(roomId);
    }
  }, Number(hours) * 60 * 60 * 1000);

  res.json({
    roomId,
    creatorName,
    inviteLinks,
    expireAt
  });
});

app.post(`${BASE_PATH}/api/join/:roomId/:token`, (req, res) => {
  const { roomId, token } = req.params;
  const { password } = req.body;
  const room = rooms.get(roomId);

  if (!room || room.dissolved || room.expireAt < Date.now()) {
    return res.status(404).json({ error: 'The room does not exist or has expired.' });
  }
  if (!room.availableTokens.has(token)) {
    return res.status(403).json({ error: 'The invitation link is invalid or has already been used.' });
  }
  if (room.deepEncrypt && room.password !== password) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  if (room.users.size >= room.maxPeople) {
    return res.status(403).json({ error: 'This meeting room is already full.' });
  }

  room.availableTokens.delete(token);
  room.usedTokens.add(token);

  res.json({ ok: true, roomId, category: room.category });
});

app.get(`${BASE_PATH}/join/:roomId/:token`, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'join.html'));
});

app.get(`${BASE_PATH}/room/:roomId`, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'room.html'));
});

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, isCreator, name }) => {
    const room = rooms.get(roomId);
    if (!room || room.dissolved) {
      return socket.emit('error', 'Room does not exist');
    }

    let displayName = name;
    if (!isCreator) {
      const available = getAvailableNames(room.category, new Set([...room.users.values(), room.creatorName]));
      if (available.length === 0) {
        return socket.emit('error', 'No name available');
      }
      displayName = available[Math.floor(Math.random() * available.length)];
    } else {
      displayName = room.creatorName;
    }

    room.users.set(socket.id, displayName);
    socket.join(roomId);
    socket.roomId = roomId;
    socket.isCreator = !!isCreator;

    io.to(roomId).emit('system', `${displayName} has joined the room`);
    socket.emit('joined', { 
      name: displayName, 
      expireAt: room.expireAt,
      maxPeople: room.maxPeople,
      creatorName: room.creatorName,
      isCreator: !!isCreator
    });
    socket.emit('history', room.messages.slice(-100));
  });

  socket.on('message', ({ roomId, ciphertext, isImage }) => {
    const room = rooms.get(roomId);
    if (!room || !room.users.has(socket.id)) return;

    const msg = {
      name: room.users.get(socket.id),
      ciphertext,
      isImage: !!isImage,
      time: Date.now()
    };
    room.messages.push(msg);
    if (room.messages.length > 300) room.messages.shift();

    io.to(roomId).emit('message', msg);
  });

  socket.on('whiteboard-draw', (data) => {
    socket.to(data.roomId).emit('whiteboard-draw', data);
  });

  socket.on('whiteboard-clear', (data) => {
    socket.to(data.roomId).emit('whiteboard-clear');
  });

  socket.on('dissolve', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (room && socket.isCreator) {
      room.dissolved = true;
      io.to(roomId).emit('system', 'The room has been disbanded by its creator.');
      rooms.delete(roomId);
      io.in(roomId).disconnectSockets();
    }
  });

  socket.on('disconnect', () => {
    if (!socket.roomId) return;
    const room = rooms.get(socket.roomId);
    if (room && room.users.has(socket.id)) {
      const name = room.users.get(socket.id);
      room.users.delete(socket.id);
      io.to(socket.roomId).emit('system', `${name} has left the room`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Burn Chat running on port ${PORT}`);
  console.log(`Base path: ${BASE_PATH}`);
});
