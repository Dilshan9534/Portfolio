import { useState } from 'react';
import { api } from '../api.js';

const initialForm = { name: '', email: '', preferred_date: '', preferred_time: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text }
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await api.bookAppointment(form);
      setStatus({ type: 'success', text: 'Appointment requested — I\u2019ll confirm by email shortly.' });
      setForm(initialForm);
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="section-label" data-reveal>Book a call</div>
      <h2 data-reveal>Let's talk about your project.</h2>
      <form className="contact-form" onSubmit={handleSubmit} data-reveal style={{ transitionDelay: '120ms' }}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" required value={form.name} onChange={update('name')} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={form.email} onChange={update('email')} />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="date">Preferred date</label>
            <input id="date" type="date" required value={form.preferred_date} onChange={update('preferred_date')} />
          </div>
          <div className="field">
            <label htmlFor="time">Preferred time</label>
            <input id="time" type="time" required value={form.preferred_time} onChange={update('preferred_time')} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="message">What would you like to discuss?</label>
          <textarea id="message" rows={4} value={form.message} onChange={update('message')} />
        </div>
        <button className="submit-btn" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Request appointment'}
        </button>
        {status && <div className={`form-status ${status.type}`}>{status.text}</div>}
      </form>
    </section>
  );
}
