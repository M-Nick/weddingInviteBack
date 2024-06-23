import { DataTypes, Model, Sequelize } from "sequelize";
import { initTables } from "./database/initTables.js";

// const Pool = pg.Pool;
// const Client = pg.Client;

// const client = new Client({
//   user: "postgres",
//   host: "localhost",
//   password: "1",
//   port: 5432,
// });

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "1",
//   port: 5432,
// });

const DATABASE = "postgres";
const USERNAME = "postgres";
const PASSWORD = "1";

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Valid
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { sequelize }
);

User.sync();

const user = new User({ id: 1 });
user.id; // 1

User.create(user);

// pool.connect();

// initTables(pool);

const getUsers = (request, response) => {
  // pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
  //   if (error) {
  //     throw error;
  //   }
  //   response.status(200).json(results.rows);
  // });
};

const getUserById = (request, response) => {
  // const id = parseInt(request.params.id);
  // pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
  //   if (error) {
  //     throw error;
  //   }
  //   response.status(200).json(results.rows);
  // });
};

const createUser = (request, response) => {
  // const { name, email } = request.body;
  // pool.query(
  //   "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
  //   [name, email],
  //   (error, results) => {
  //     if (error) {
  //       throw error;
  //     }
  //     response.status(201).send(`User added with ID: ${results.rows[0].id}`);
  //   }
  // );
};

const updateUser = (request, response) => {
  // const id = parseInt(request.params.id);
  // const { name, email } = request.body;
  // pool.query(
  //   "UPDATE users SET name = $1, email = $2 WHERE id = $3",
  //   [name, email, id],
  //   (error, results) => {
  //     if (error) {
  //       throw error;
  //     }
  //     response.status(200).send(`User modified with ID: ${id}`);
  //   }
  // );
};

const deleteUser = (request, response) => {
  // const id = parseInt(request.params.id);
  // pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
  //   if (error) {
  //     throw error;
  //   }
  //   response.status(200).send(`User deleted with ID: ${id}`);
  // });
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
