import { useEffect, useState } from 'react';
import { api } from './api.js';
import { placeholderProfile, placeholderExperience, placeholderProjects, placeholderSkills } from './data/placeholder.js';
import useTheme from './hooks/useTheme.js';
import useScrollReveal from './hooks/useScrollReveal.js';
import Sidebar from './components/Sidebar.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

export default function App() {
  const [profile, setProfile] = useState(placeholderProfile);
  const [experience, setExperience] = useState(placeholderExperience);
  const [projects, setProjects] = useState(placeholderProjects);
  const [skills, setSkills] = useState(placeholderSkills);

  const { theme, toggle } = useTheme();

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {});
    api.getExperience().then(setExperience).catch(() => {});
    api.getProjects().then(setProjects).catch(() => {});
    api.getSkills().then(setSkills).catch(() => {});
  }, []);

  // Re-scan for reveal targets whenever content arrives from the API
  useScrollReveal([experience, projects, skills]);

  return (
    <div className="layout">
      <Sidebar profile={profile} />
      <ThemeToggle theme={theme} onToggle={toggle} />
      <main>
        <Hero profile={profile} />
        <Skills items={skills} />
        <Experience items={experience} />
        <Projects items={projects} />
        <Contact />
      </main>
      <WhatsAppButton number={profile.whatsapp_number} />
    </div>
  );
}
