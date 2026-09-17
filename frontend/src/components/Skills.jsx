export default function Skills({ items }) {
  return (
    <section id="skills">
      <div className="section-label" data-reveal>Skills</div>
      <div className="skills-wrap">
        {items.map((s, i) => (
          <span
            className="skill-pill"
            key={s.id}
            data-reveal
            style={{ transitionDelay: `${Math.min(i * 45, 400)}ms` }}
          >
            {s.name}
          </span>
        ))}
      </div>
    </section>
  );
}
