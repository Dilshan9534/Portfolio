import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Notify you (the site owner) that someone booked a slot
export async function notifyOwnerOfBooking(appointment) {
  if (!process.env.SMTP_HOST || !process.env.OWNER_EMAIL) return; // not configured, skip silently

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.OWNER_EMAIL,
    subject: `New appointment request from ${appointment.name}`,
    text: `${appointment.name} (${appointment.email}) requested a call.

Date: ${appointment.preferred_date}
Time: ${appointment.preferred_time}
Message: ${appointment.message || '(none)'}

Confirm or cancel via PUT /api/appointments/${appointment.id}/status`,
  });
}

// Optional: let the visitor know their request was received
export async function notifyVisitorOfBooking(appointment) {
  if (!process.env.SMTP_HOST) return;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: appointment.email,
    subject: `Appointment request received`,
    text: `Hi ${appointment.name},

Thanks for reaching out — your request for ${appointment.preferred_date} at ${appointment.preferred_time} has been received. I'll confirm by email shortly.`,
  });
}
