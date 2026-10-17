const API = 'http://localhost:10000/api/portfolio';

async function loadProjects() {
  try {
    const res = await fetch(API);
    const projects = await res.json();
    const list = document.getElementById('list');
    if (!projects.length) {
      list.innerHTML = '<p>No projects yet. Add your first one above!</p>';
      return;
    }
    list.innerHTML = projects.map(p => `
      <div class="project-card">
        ${p.image_url ? `<img src="${p.image_url}" alt="${p.title}" onerror="this.style.display='none'">` : ''}
        <span class="badge">${p.category || 'General'}</span>
        <h3>${p.title}</h3>
        <p>${p.description || ''}</p>
        ${p.link ? `<a href="${p.link}" target="_blank">View Project -></a><br>` : ''}
        <button class="delete" onclick="deleteProject(${p.id})">Delete</button>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
    document.getElementById('list').innerHTML = '<p style="color:red">Could not load projects. Is your backend running on port 10000?</p>';
  }
}

async function addProject() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const image_url = document.getElementById('image_url').value.trim();
  const link = document.getElementById('link').value.trim();
  const category = document.getElementById('category').value.trim();

  if (!title) return alert('Title is required');

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, image_url, link, category })
  });

  if (res.ok) {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('image_url').value = '';
    document.getElementById('link').value = '';
    document.getElementById('category').value = '';
    loadProjects();
  }
}

async function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadProjects();
}

loadProjects();