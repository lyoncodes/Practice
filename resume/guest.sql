-- To run schema: 
-- psql resume -f guest.sql

-- push db to heroku
-- heroku pg: push resume DATABASE_URL

DROP TABLE IF EXISTS guests;

CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  first_last VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  floor_plan VARCHAR(255),
  move_in VARCHAR(255)
)

INSERT INTO guests(first_last, email, phone, floor_plan, move_in) values ()