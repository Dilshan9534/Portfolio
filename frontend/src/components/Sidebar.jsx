import { GithubIcon, LinkedInIcon, LeetCodeIcon } from './icons.jsx';

export default function Sidebar({ profile }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="name">{profile.full_name}</div>
        <div className="role">{profile.title}</div>
        <nav className="sidebar-nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Book a call</a>
        </nav>
      </div>
      <div className="sidebar-foot">
        <div className="social-row">
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon />
            </a>
          )}
          {profile.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          )}
          {profile.leetcode_url && (
            <a href={profile.leetcode_url} target="_blank" rel="noreferrer" aria-label="LeetCode">
              <LeetCodeIcon />
            </a>
          )}
        </div>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
    </aside>
  );
}
