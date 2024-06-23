const queries = [
  `CREATE TABLE IF NOT EXISTS places(
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    map_link VARCHAR(1023) UNIQUE,
    image_name VARCHAR(127) UNIQUE,
    address VARCHAR(255)
  );`,

  `CREATE TABLE IF NOT EXISTS weddings(
    id SERIAL PRIMARY KEY,
    date TIMESTAMP
  );`,

  `CREATE TABLE IF NOT EXISTS events(
    id SERIAL PRIMARY KEY,
    time TIMESTAMP,
    name VARCHAR (63) NOT NULL,
    description VARCHAR (63),
    wedding_id INT REFERENCES weddings,
    place_id INT REFERENCES places
  );`,

  `CREATE TABLE IF NOT EXISTS colors(
    id SERIAL PRIMARY KEY,
    hex varchar (8) NOT NULL,
    name VARCHAR (31) NOT NULL,
    wedding_id INT REFERENCES weddings
  );`,

  `CREATE TYPE sex AS ENUM ('male', 'female');`,

  // `CREATE TABLE IF NOT EXISTS guests(
  //   id SERIAL PRIMARY KEY,
  //   name VARCHAR (63) NOT NULL,
  //   sex sex,
  //   phone VARCHAR (11),
  //   email VARCHAR (63)
  // );`,

  // `CREATE TABLE IF NOT EXISTS questions(
  //   id SERIAL PRIMARY KEY,
  //   text VARCHAR (255) NOT NULL,
  //   wedding_id INT REFERENCES weddings
  // );`,

  // `CREATE TABLE IF NOT EXISTS answers(
  //   id SERIAL PRIMARY KEY,
  //   text VARCHAR (255) NOT NULL,
  //   question_id INT REFERENCES questions
  // );`,

  // `CREATE TABLE IF NOT EXISTS groups(
  //   id SERIAL PRIMARY KEY UUID,
  //   message VARCHAR (255) NOT NULL,
  //   wedding_id INT REFERENCES weddings
  // );`,

  // `CREATE TABLE IF NOT EXISTS groups_answers(
  //   group_id INT REFERENCES groups,
  //   answer_id INT REFERENCES answers,
  //   PRIMARY KEY (group_id, answer_id)
  // );`,

  // `CREATE TABLE IF NOT EXISTS group_guests(
  //   group_id INT REFERENCES groups,
  //   guest_id INT REFERENCES guests,
  //   PRIMARY KEY (group_id, guest_id)
  // );`,
];

export const initTables = (pool) => {
  queries.map((query) => pool.query(query));
};
