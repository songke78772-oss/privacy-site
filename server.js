require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3001;

const db = new Database(path.join(__dirname, 'data', 'app.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Tools list (static for now; later can move to DB)
const tools = [
  {
    id: 'emberlink',
    name: 'EmberLink',
    description: 'Share a message that self-destructs after reading. Encrypted in your browser.',
    url: '/emberlink/',
    icon: '🔥'
  },
  {
    id: 'keydrop',
    name: 'KeyDrop',
    description: 'Encrypt a file in your browser. The key never leaves your device.',
    url: '/keydrop/',
    icon: '🔑'
  },
  {
    id: 'burn-chat',
    name: 'Burn Chat',
    description: 'Create a temporary chat room that disappears after use. Optional client-side encryption.',
    url: '/burn-chat/',
    icon: '💬'
  }
];
app.get('/', (req, res) => {
  res.render('index', {
    loggedIn: !!req.session.userId,
    email: req.session.email || '',
    tools
  });
});

app.get('/login', (req, res) => res.render('login', { error: null }));
app.get('/register', (req, res) => res.render('register', { error: null }));

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.render('register', { error: 'Email and password required' });
  try {
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hash);
    res.redirect('/login');
  } catch (e) {
    res.render('register', { error: 'Email already registered' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.render('login', { error: 'Invalid email or password' });
  }
  req.session.userId = user.id;
  req.session.email = user.email;
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// Ensure data dir
const fs = require('fs');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

app.listen(PORT, () => {
  console.log(`Privacy site running on http://localhost:${PORT}`);
});
