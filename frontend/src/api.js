const BASE = '/api';

async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  getProfile: () => fetch(`${BASE}/profile`).then(handle),
  getExperience: () => fetch(`${BASE}/experience`).then(handle),
  getProjects: () => fetch(`${BASE}/projects`).then(handle),
  getSkills: () => fetch(`${BASE}/skills`).then(handle),
  bookAppointment: (payload) =>
    fetch(`${BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(handle),
};
