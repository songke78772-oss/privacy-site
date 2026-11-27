const express = require('express');
const Database = require('better-sqlite3');
const { nanoid } = require('nanoid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3004;

// 数据库
const db = new Database(path.join(__dirname, 'emberlink.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    ciphertext TEXT NOT NULL,
    iv TEXT NOT NULL,
    salt TEXT,
    has_password INTEGER DEFAULT 0,
    expires_at INTEGER,
    max_views INTEGER DEFAULT 1,
    views INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
  )
`);

app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// 创建笔记
app.post('/api/create', (req, res) => {
  const { ciphertext, iv, salt, hasPassword, expiresInHours, maxViews } = req.body;
  if (!ciphertext || !iv) return res.status(400).json({ error: 'Missing data' });

  const id = nanoid(12);
  const expires_at = expiresInHours ? Math.floor(Date.now() / 1000) + expiresInHours * 3600 : null;

  db.prepare(`
    INSERT INTO notes (id, ciphertext, iv, salt, has_password, expires_at, max_views)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, ciphertext, iv, salt || null, hasPassword ? 1 : 0, expires_at, maxViews || 1);

  res.json({ id });
});

// 读取笔记（防预览机器人）
app.post('/api/read/:id', (req, res) => {
  const ua = req.get('User-Agent') || '';
  // 简单防预览
  if (/bot|crawler|spider|preview|slack|discord|whatsapp|telegram|facebook|twitter/i.test(ua)) {
    return res.json({ preview: true });
  }

  const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });

  if (note.expires_at && note.expires_at < Math.floor(Date.now() / 1000)) {
    db.prepare('DELETE FROM notes WHERE id = ?').run(note.id);
    return res.status(404).json({ error: 'Expired' });
  }

  if (note.views >= note.max_views) {
    return res.status(410).json({ error: 'Already viewed' });
  }

  // 增加查看次数
  db.prepare('UPDATE notes SET views = views + 1 WHERE id = ?').run(note.id);

  // 如果达到最大次数，删除
  if (note.views + 1 >= note.max_views) {
    db.prepare('DELETE FROM notes WHERE id = ?').run(note.id);
  }

  res.json({
    ciphertext: note.ciphertext,
    iv: note.iv,
    salt: note.salt,
    hasPassword: !!note.has_password
  });
});

app.listen(PORT, () => console.log(`EmberLink running on ${PORT}`));
