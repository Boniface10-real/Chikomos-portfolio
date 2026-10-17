CREATE TABLE IF NOT EXISTS portfolio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  category TEXT
);

INSERT INTO portfolio (title, description, image_url, link, category) VALUES
('My First Website', 'A simple HTML and CSS site', '', 'https://my-student-website-g4sh.onrender.com', 'Web'),
('Student Portfolio App', 'Full stack portfolio with CRUD', '', 'Web');