-- To run schema: 
-- psql forms -f guest.sql

DROP TABLE IF EXISTS guests;

CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  floorplan VARCHAR(255),
  moveIn NUMERIC(7,2),
  price NUMERIC(7,2)
);
