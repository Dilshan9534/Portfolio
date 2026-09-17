import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/profile
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profile LIMIT 1');
    res.json(rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

// PUT /api/profile/:id — update your own info
router.put('/:id', async (req, res) => {
  const {
    full_name, title, bio, email, location, avatar_url, resume_url,
    github_url, linkedin_url, leetcode_url, whatsapp_number,
  } = req.body;
  try {
    await pool.query(
      `UPDATE profile SET full_name=?, title=?, bio=?, email=?, location=?, avatar_url=?, resume_url=?,
       github_url=?, linkedin_url=?, leetcode_url=?, whatsapp_number=? WHERE id=?`,
      [full_name, title, bio, email, location, avatar_url, resume_url,
       github_url, linkedin_url, leetcode_url, whatsapp_number, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
