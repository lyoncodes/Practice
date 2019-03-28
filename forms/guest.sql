-- To run schema: 
-- psql forms -f guest.sql

DROP TABLE IF EXISTS guests;


CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  classification VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  floorplan VARCHAR(255),
  moveIn VARCHAR(25),
  price NUMERIC(6,2)
);

INSERT INTO guests (classification, firstName, lastName, floorplan, moveIn, price) values ('guests', 'Thomas', 'Jefferson', 'Studio', '2019-04', '2400.00');
INSERT INTO guests (classification, firstName, lastName, floorplan, moveIn, price) values ('guests', 'John', 'Adams', '1-Bedroom', '2019-05', '2400.00');
INSERT INTO guests (classification, firstName, lastName, floorplan, moveIn, price) values ('guests', 'George', 'Washington', 'Studio', '2019-06', '1200.00');
INSERT INTO guests (classification, firstName, lastName, floorplan, moveIn, price) values ('guests', 'Benjamin', 'Franklin', 'Studio', '2019-07', '2400.00');
INSERT INTO guests (classification, firstName, lastName, floorplan, moveIn, price) values ('guests', 'William', 'Madison', '2-Bedroom', '2019-08', '2400.00');

DROP TABLE IF EXISTS vendors;

CREATE TABLE vendors (
  id SERIAL PRIMARY KEY,
  classification VARCHAR(255),
  company VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  job VARCHAR(255),
  serviceDate VARCHAR(25),
  notes VARCHAR(400) 
)