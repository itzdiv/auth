import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "password",
  port: 3000,
});
db.connect();

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const mail = req.body.username;
  const passcode = req.body.password;
  try{
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [mail]);
    if(checkResult.rows.length > 0){
      res.send("This Email already exists!");
    }else{
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [mail, passcode]);
      console.log(result);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.error(err);
    res.send("An error occurred during registration.");
  }
});

app.post("/login", async (req, res) => {
  const mail = req.body.username;
  const passcode = req.body.password;
  try{
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2", [mail, passcode]);
    if(checkResult.rows.length > 0){
      res.render("secrets.ejs");
    }else{
      res.send("Invalid Credentials");
    }
  }catch(err){
    console.error(err);
    res.send("An error occurred during login.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
