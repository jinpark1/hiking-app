require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const postgres = require("postgres");

const app = express();

const sql = postgres({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: { require: true, rejectUnauthorized: false },
});

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 7 * 1000, // One week
    },
  })
);

app.get("/api/test", async (req, res) => {
  try {
    const results = await sql`SELECT * FROM test`;
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Sample API endpoint to get inventory items
app.get("/api/inventory", async (req, res) => {
  try {
    const results = await sql`SELECT * FROM inventory`;
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Sample API endpoint to add an inventory item
app.post("/api/inventory", async (req, res) => {
  try {
    const { houseName, housePrice, swimmingPool, houseImage } = req.body;
    const results = await sql`
      INSERT INTO inventory (name, price, swimming_pool, image)
      VALUES (${houseName}, ${housePrice}, ${swimmingPool}, ${houseImage})
      RETURNING *`;
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Sample API endpoint to delete an inventory item
app.delete("/api/inventory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sql`DELETE FROM inventory WHERE id = ${id}`;
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
