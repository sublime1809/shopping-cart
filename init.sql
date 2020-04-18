CREATE DATABASE db;

CREATE TABLE IF NOT EXISTS item (
	id SERIAL NOT NULL,
	name VARCHAR,
	data TEXT,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cart (
	id SERIAL NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cart_filling (
 	id SERIAL NOT NULL,
 	item_id INTEGER,
 	cart_id INTEGER,
 	PRIMARY KEY (id),
 	FOREIGN KEY(item_id) REFERENCES item (id),
 	FOREIGN KEY(cart_id) REFERENCES cart (id)
);

INSERT INTO item(id, name) VALUES (0, 'Baby Yoda');
INSERT INTO item(id, name) VALUES (1, 'Fallout Bobblehead - Strength');
INSERT INTO item(id, name) VALUES (2, 'Fallout Bobblehead - Perception');
INSERT INTO item(id, name) VALUES (3, 'Fallout Bobblehead - Endurance');
INSERT INTO item(id, name) VALUES (4, 'Fallout Bobblehead - Charisma');
INSERT INTO item(id, name) VALUES (5, 'Fallout Bobblehead - Intelligence');
