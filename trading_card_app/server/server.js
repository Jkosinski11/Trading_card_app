const express = require("express");
const pool = require("./db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());
app.use("../img_paths", express.static("img_paths"));

app.get("/", async (req , res)=> {
    try{
        const result = await pool.query("SELECT * FROM users;");
        res.json(result.rows[0]);
    }catch(err){
        console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME);
        console.error(err.message);
        res.status(500).send("Database connection failed");
    }
});

app.post("/signup", async (req, res) => {
    const {email, password, username} = req.body;
    try{
       const hashedPassword = await bcrypt.hash(password, 10);
       const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );
    res.status(201).json({
        message: "user signed up succesfully",
        user: result.rows[0]
    });
}catch(error){
    console.log(error);
    res.status(500).json({error:"Server error"});
    
}
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
       const result = await pool.query(
      "SELECT id, username, email, password_hash FROM users WHERE email = $1",
      [email]
    );
    if(result.rows.length === 0){
        return res.status(401).json({error: "invalid email or password"})
    }


    const user = result.rows[0];

    const hashpass = await bcrypt.compare(password, user.password_hash);

    if(!hashpass){
        return res.status(401).json({error:"Invalid email/password"})
    }

    res.status(200).json({
        message:"Login Succesful",
        user:{
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
}catch(error){
    console.log(error);
    res.status(500).json({error:"Login Error"});   
}
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../img_paths/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });


app.post("/create_card", upload.single("image"), async (req, res) => {
    const {user_id, description, price} = req.body;
    try{
    const image_path = req.file ? `../img_paths/${req.file.filename}` : null;
    const result = await pool.query(
      "INSERT INTO trading_cards(user_id, image_path, description, price) VALUES ($1, $2, $3, $4) RETURNING user_id, image_path, description, price",
      [user_id, image_path, description, price]
    );

    const trading_card = result.rows[0];

    res.status(200).json({
        message:"Card Created",
        post :{
        img: trading_card.image_path,
        description: trading_card.description,
        price: trading_card.price
        }
    });
}catch(error){
    console.log(error);
    res.status(500).json({error:"Post Failed"});   
}
});



app.listen(3001, () =>{
    console.log("Server running on 3001");
})
