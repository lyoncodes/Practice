-- To run schema: 
-- psql forms -f guest.sql

DROP TABLE IF EXISTS guests;

CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  floorplan VARCHAR(255),
  moveIn VARCHAR(25),
  price NUMERIC(6,2)
);

DROP TABLE IF EXISTS vendors;

CREATE TABLE vendors (
  id SERIAL PRIMARY KEY,
  company VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  job VARCHAR(255),
  serviceDate VARCHAR(25),
  notes VARCHAR(400) 
)