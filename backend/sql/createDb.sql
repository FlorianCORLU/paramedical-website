

-- CREATION OF DATABASE site_psychomot;



-- Table presentation
CREATE TABLE IF NOT EXISTS presentation (
  id SERIAL PRIMARY KEY,
  psychomot_photo_url TEXT,
  lastname VARCHAR(100) NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  psychomot_description TEXT
);

-- Table formations
CREATE TABLE IF NOT EXISTS formations (
  id SERIAL PRIMARY KEY,
  course_title VARCHAR(200) NOT NULL,
  course_description TEXT,
  course_date DATE
);

-- Table articles
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  article_title VARCHAR(200) NOT NULL,
  article_text TEXT NOT NULL
);

-- Table admin
CREATE TABLE IF NOT EXISTS admin (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL CHECK (username ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  password VARCHAR(255) NOT NULL
);
