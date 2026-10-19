const API_URL = 'http://localhost:10000/api/portfolio';
let editingId = null;

document.addEventListener('DOMContentLoaded', loadProjects);

async function loadProjects() {
  try {
    const res = await fetch(API_URL);
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
        <button class="edit" onclick="editProject(${p.id})">Edit</button>
        <button class="delete" onclick="deleteProject(${p.id})">Delete</button>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
    document.getElementById('list').innerHTML = '<p style="color:red">Could not load projects. Is your backend running on 10000?</p>';
  }
}

async function addProject() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const image_url = document.getElementById('image_url').value;
  const link = document.getElementById('link').value;
  const category = document.getElementById('category').value;

  if (!title || !description) {
    alert('Title and Description are required');
    return;
  }

  const payload = {
    owner_name: 'Chikomo',
    title,
    description,
    image_url,
    link,
    category
  };

  if (editingId) {
    await fetch(`${API_URL}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    editingId = null;
    document.getElementById('submitBtn').innerText = 'Add Project';
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('image_url').value = '';
  document.getElementById('link').value = '';
  document.getElementById('category').value = '';

  loadProjects();
}

async function editProject(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const p = await res.json();

  document.getElementById('title').value = p.title;
  document.getElementById('description').value = p.description;
  document.getElementById('image_url').value = p.image_url || '';
  document.getElementById('link').value = p.link || '';
  document.getElementById('category').value = p.category || '';

  editingId = id;
  document.getElementById('submitBtn').innerText = 'Update Project';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadProjects();
}