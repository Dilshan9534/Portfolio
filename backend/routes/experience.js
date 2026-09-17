import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM experience ORDER BY sort_order ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load experience' });
  }
});

router.post('/', async (req, res) => {
  const { company, role, start_date, end_date, description, sort_order } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO experience (company, role, start_date, end_date, description, sort_order) VALUES (?,?,?,?,?,?)`,
      [company, role, start_date, end_date, description, sort_order || 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add experience' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM experience WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

export default router;
