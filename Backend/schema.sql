DROP TABLE IF EXISTS portfolio;
CREATE TABLE portfolio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO portfolio (owner_name, title, description, image_url, link, category) VALUES
('Chikomo', 'Student Portfolio App', 'Full stack portfolio with CRUD', 'https://picsum.photos/400/200', 'https://my-student-website-g4sh.onrender.com', 'Web'),
('Chikomo', 'My First Website', 'A simple HTML and CSS site', 'https://picsum.photos/400/200', 'https://my-student-website-g4sh.onrender.com', 'Web'),
('Chikomo', 'Campus Club App', 'Club management system', 'https://picsum.photos/400/200', 'https://example.com', 'Web'),
('Chikomo', 'Recipe Finder', 'Find recipes by ingredient', 'https://picsum.photos/400/200', 'https://example.com', 'Mobile'),
('Chikomo', 'Travel Guide Zambia', 'Zambia travel destinations', 'https://picsum.photos/400/200', 'https://example.com', 'Web'),
('Chikomo', 'Music Player', 'Festival lineup app', 'https://picsum.photos/400/200', 'https://example.com', 'Mobile'),
('Chikomo', 'Book Tracker', 'Track books you have read', 'https://picsum.photos/400/200', 'https://example.com', 'Web'),
('Chikomo', 'Fitness Tracker', 'Log workouts and goals', 'https://picsum.photos/400/200', 'https://example.com', 'Mobile'),
('Chikomo', 'Event Noticeboard', 'School events board', 'https://picsum.photos/400/200', 'https://example.com', 'Web'),
('Chikomo', 'Clinic Info Page', 'Health clinic info page', 'https://picsum.photos/400/200', 'https://example.com', 'Web');