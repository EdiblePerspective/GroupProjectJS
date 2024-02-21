CREATE TABLE users_hosts
(
  id SERIAL PRIMARY KEY,
  clecks_user_id TEXT,
  name TEXT,
  email TEXT,
  password VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  phone_number VARCHAR,
  description VARCHAR,
  profile_image VARCHAR
);
CREATE TABLE rooms
(
  id SERIAL PRIMARY KEY,
  hoome_type VARCHAR,
  total_occupancy VARCHAR,
  total_rooms VARCHAR,
  summary VARCHAR,
  address VARCHAR,
  price VARCHAR,
  published_at DATETIME,
  owner_id INT REFERENCES users_hosts (id),
  updated_at DATETIME
);

CREATE TABLE reservations
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users_hosts (id),
  room_id INTEGER REFERENCES rooms (id),
  start_date DATE,
  end_date DATE,
  price INT,
  total INT,
  created_at DATE,
  updated_at DATE
);



CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    room_id INT REFERENCES rooms (id),
    rating INT,
    comment TEXT,
);

CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    url_image TEXT,
    image_id INTEGER REFERENCES rooms (id),
);
image_id INTEGER REFERENCES rooms, reservations (id),