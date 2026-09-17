import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM skills ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load skills' });
  }
});

router.post('/', async (req, res) => {
  const { name, category, sort_order } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO skills (name, category, sort_order) VALUES (?,?,?)`,
      [name, category || 'General', sort_order || 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM skills WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

export default router;
