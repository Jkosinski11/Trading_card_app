const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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
       const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, password]
    );
    res.status(201).json({
        message: "user signed up succesfully",
        user: result.rows[0]
    });
}catch(error){
    console.log(error);
    res.status(500).json({error:"Server error 1"});
    
}
});

app.listen(3001, () =>{
    console.log("Server running on 3001");
})
