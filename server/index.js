require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const postgres = require("postgres");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

const sql = postgres({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: { require: true, rejectUnauthorized: false },
});

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

app.use(cors(corsOptions));
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

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/api/test", async (req, res) => {
  try {
    const results = await sql`SELECT * FROM test`;
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ----- user login & register endpoints -----
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);
    // Get the user from the database
    const users = await sql`SELECT * FROM test_users WHERE email = ${email}`;

    if (users.count > 0) {
      const user = users[0];
      console.log("users", users);
      // Compare the provided password with the stored hash
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Passwords match
        res.status(200).send({ message: "Login successful" });
      } else {
        // Passwords don't match
        res.status(401).send({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// user registration
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);

    // Check if the user already exists
    const users = await sql`SELECT * FROM test_users WHERE email = ${email}`;

    if (users.count > 0) {
      res.status(400).send({ message: "User already exists" });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const result = await sql`INSERT INTO test_users (email, password) VALUES (${email}, ${hashedPassword})`;

      if (result.count > 0) {
        req.session.user = email;
        res.status(200).send({ message: "Registration successful" });
      } else {
        throw new Error("Registration failed");
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// // Sample API endpoint to get inventory items
// app.get("/api/inventory", async (req, res) => {
//   try {
//     const results = await sql`SELECT * FROM inventory`;
//     res.status(200).send(results);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// // Sample API endpoint to add an inventory item
// app.post("/api/inventory", async (req, res) => {
//   try {
//     const { houseName, housePrice, swimmingPool, houseImage } = req.body;
//     const results = await sql`
//       INSERT INTO inventory (name, price, swimming_pool, image)
//       VALUES (${houseName}, ${housePrice}, ${swimmingPool}, ${houseImage})
//       RETURNING *`;
//     res.status(200).send(results);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// // Sample API endpoint to delete an inventory item
// app.delete("/api/inventory/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await sql`DELETE FROM inventory WHERE id = ${id}`;
//     res.status(200).send();
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
