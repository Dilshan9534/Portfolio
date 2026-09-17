export default function Experience({ items }) {
  return (
    <section id="experience">
      <div className="section-label" data-reveal>Experience</div>
      <div className="timeline">
        {items.map((item, i) => (
          <div
            className="timeline-item"
            key={item.id}
            data-reveal
            style={{ transitionDelay: `${Math.min(i * 90, 450)}ms` }}
          >
            <div className="timeline-marker">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <h3>{item.role} — {item.company}</h3>
              <div className="meta">{item.start_date} – {item.end_date}</div>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
