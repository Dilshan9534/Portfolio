import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, tech_stack, image_url, repo_url, live_url, sort_order } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO projects (title, description, tech_stack, image_url, repo_url, live_url, sort_order) VALUES (?,?,?,?,?,?,?)`,
      [title, description, tech_stack, image_url, repo_url, live_url, sort_order || 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
