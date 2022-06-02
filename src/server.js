import express from "express";
import morgan from "morgan";

const PORT = 4500; 

const app = express();
const logger = morgan("dev");

const handleHome = (req, res) => {
  return res.send("Hello");
};
const handleLogin = (req, res) => {
  return res.send("login");
};

app.use(logger);
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => 
  console.log(`server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);

