export default function Hero({ profile }) {
  return (
    <section id="about" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-orb hero-orb-1" />
        <span className="hero-orb hero-orb-2" />
        <span className="hero-orb hero-orb-3" />
        <span className="hero-grid" />
      </div>
      <div className="hero-content">
        <div className="section-label" data-reveal>About</div>
        <h1 data-reveal style={{ transitionDelay: '80ms' }}>
          {profile.title} building things end to end.
        </h1>
        <p data-reveal style={{ transitionDelay: '160ms' }}>{profile.bio}</p>
        <div className="hero-meta" data-reveal style={{ transitionDelay: '240ms' }}>
          {profile.location && <span>{profile.location}</span>}
          <span>{profile.email}</span>
        </div>
      </div>
    </section>
  );
}
