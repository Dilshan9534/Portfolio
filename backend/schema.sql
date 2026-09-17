-- Portfolio database schema (MySQL)
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- "About me" — single row table
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  title VARCHAR(150) NOT NULL,
  bio TEXT NOT NULL,
  email VARCHAR(150) NOT NULL,
  location VARCHAR(120),
  avatar_url VARCHAR(255),
  resume_url VARCHAR(255),
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  leetcode_url VARCHAR(255),
  whatsapp_number VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  category VARCHAR(60) DEFAULT 'General',
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company VARCHAR(150) NOT NULL,
  role VARCHAR(150) NOT NULL,
  start_date VARCHAR(30) NOT NULL,
  end_date VARCHAR(30) DEFAULT 'Present',
  description TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  tech_stack VARCHAR(255),
  image_url VARCHAR(255),
  repo_url VARCHAR(255),
  live_url VARCHAR(255),
  sort_order INT DEFAULT 0
);

-- Appointment / "contact me" bookings
CREATE TABLE IF NOT EXISTS appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(20) NOT NULL,
  status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample seed data — replace with your own info
INSERT INTO profile (full_name, title, bio, email, location, github_url, linkedin_url, leetcode_url, whatsapp_number)
VALUES ('Your Name', 'Full Stack Developer',
'Write a couple of sentences about yourself here — what you build, what you care about, and what you are looking for next.',
'you@example.com', 'Your City, Country',
'https://github.com/your-username',
'https://linkedin.com/in/your-username',
'https://leetcode.com/your-username',
'15551234567');

INSERT INTO experience (company, role, start_date, end_date, description, sort_order) VALUES
('Company Name', 'Software Engineer', '2023', 'Present', 'What you did and what you shipped, in a sentence or two.', 1),
('Previous Company', 'Junior Developer', '2021', '2023', 'What you did and what you shipped, in a sentence or two.', 2);

INSERT INTO projects (title, description, tech_stack, repo_url, live_url, sort_order) VALUES
('Project One', 'A short description of the project and the problem it solves.', 'React, Node.js, MySQL', 'https://github.com/you/project-one', '', 1),
('Project Two', 'A short description of the project and the problem it solves.', 'React, Express, MySQL', 'https://github.com/you/project-two', '', 2);

INSERT INTO skills (name, category, sort_order) VALUES
('JavaScript', 'Languages', 1),
('React', 'Frontend', 2),
('Node.js', 'Backend', 3),
('Express', 'Backend', 4),
('MySQL', 'Database', 5),
('Git', 'Tools', 6);
