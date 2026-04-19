const express = require("express");
const pool = require("./db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
const imageDir = path.join(__dirname, "../img_paths");
app.use("/img_paths", express.static(imageDir));

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users;");
    res.json(result.rows[0]);
  } catch (err) {
    console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME);
    console.error(err.message);
    res.status(500).send("Database connection failed");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword],
    );
    res.status(201).json({
      message: "user signed up succesfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT id, username, email, password_hash FROM users WHERE email = $1",
      [email],
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "invalid email or password" });
    }

    const user = result.rows[0];

    const hashpass = await bcrypt.compare(password, user.password_hash);

    if (!hashpass) {
      return res.status(401).json({ error: "Invalid email/password" });
    }

    res.status(200).json({
      message: "Login Succesful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login Error" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.post("/create_card", upload.single("image"), async (req, res) => {
  const { user_id, description, price } = req.body;
  try {
    const image_path = req.file ? `/img_paths/${req.file.filename}` : null;
    const result = await pool.query(
      "INSERT INTO trading_cards(user_id, image_path, description, price) VALUES ($1, $2, $3, $4) RETURNING user_id, image_path, description, price;",
      [user_id, image_path, description, price],
    );

    const trading_card = result.rows[0];

    res.status(200).json({
      message: "Card Created",
      post: {
        img: trading_card.image_path,
        description: trading_card.description,
        price: trading_card.price,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Post Failed" });
  }
});

app.get("/cards", async (req, res) => {
  const { user_id } = req.query;
  try {
    let result;
    if (user_id) {
      result = await pool.query(
        "SELECT * FROM trading_cards WHERE user_id = $1;",
        [user_id],
      );
    } else {
      result = await pool.query("SELECT * FROM trading_cards;");
    }
    res.status(200).json({
      cards: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not fetch cards" });
  }
});

app.delete("/cards/:card_id", async (req, res) => {
  const { card_id } = req.params;
  try {
    result = await pool.query("DELETE FROM trading_cards WHERE card_id = $1 RETURNING *;", [
      card_id
    ]);

    const card = result.rows[0];
    
    if (card.image_path) {
      const fileName = path.basename(card.image_path);
      const fullImagePath = path.join(imageDir, fileName);

      fs.unlink(fullImagePath, (err) => {
        if (err) {
          console.error("Image delete error:", err);
        }
      });
    }
    res.status(200).json({
      card:card
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Delete failed" });
  }
});

app.listen(3001, () => {
  console.log("Server running on 3001");
});
