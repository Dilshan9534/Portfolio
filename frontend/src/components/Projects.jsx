export default function Projects({ items }) {
  return (
    <section id="projects">
      <div className="section-label" data-reveal>Projects</div>
      <div className="project-grid">
        {items.map((p, i) => (
          <div
            className="project-card"
            key={p.id}
            data-reveal
            style={{ transitionDelay: `${Math.min(i * 90, 450)}ms` }}
          >
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.tech_stack && <div className="project-stack">{p.tech_stack}</div>}
            <div className="project-links">
              {p.repo_url && <a href={p.repo_url} target="_blank" rel="noreferrer">Code</a>}
              {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer">Live</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
