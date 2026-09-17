import { WhatsAppIcon } from './icons.jsx';

export default function WhatsAppButton({ number }) {
  if (!number) return null;
  const cleaned = number.replace(/[^\d]/g, '');
  const href = `https://wa.me/${cleaned}`;

  return (
    <a
      className="whatsapp-fab"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact me on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
