import { Router } from 'express';
import pool from '../db.js';
import { notifyOwnerOfBooking, notifyVisitorOfBooking } from '../mailer.js';

const router = Router();

// GET /api/appointments — list bookings (for your own admin use)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM appointments ORDER BY preferred_date, preferred_time');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load appointments' });
  }
});

// POST /api/appointments — a visitor books a slot
router.post('/', async (req, res) => {
  const { name, email, message, preferred_date, preferred_time } = req.body;

  if (!name || !email || !preferred_date || !preferred_time) {
    return res.status(400).json({ error: 'Name, email, date and time are required' });
  }

  try {
    const [existing] = await pool.query(
      `SELECT id FROM appointments WHERE preferred_date=? AND preferred_time=? AND status != 'cancelled'`,
      [preferred_date, preferred_time]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: 'That slot is already booked. Please pick another time.' });
    }

    const [result] = await pool.query(
      `INSERT INTO appointments (name, email, message, preferred_date, preferred_time) VALUES (?,?,?,?,?)`,
      [name, email, message || '', preferred_date, preferred_time]
    );

    const appointment = { id: result.insertId, name, email, message, preferred_date, preferred_time };

    // Fire-and-forget — don't block the response on email delivery
    notifyOwnerOfBooking(appointment).catch((e) => console.error('Owner email failed:', e.message));
    notifyVisitorOfBooking(appointment).catch((e) => console.error('Visitor email failed:', e.message));

    res.status(201).json({ id: result.insertId, message: 'Appointment request sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// PUT /api/appointments/:id/status — confirm or cancel a booking
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  try {
    await pool.query('UPDATE appointments SET status=? WHERE id=?', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

export default router;
