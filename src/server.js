import express from "express";

const PORT = 4500; 

const app = express();

const routerLogger = (req, res, next) => {
  console.log("PATH", req.path);
  next();
};

const methodLogger = (req, res, next) => {
  console.log("METHOD", req.method);
  next();
};

const handleHome = (req, res) => {
  console.log("I will respond.");
  return res.send("Hello");
};
const handleLogin = (req, res) => {
  return res.send("login");
};

app.use(methodLogger);
app.use(routerLogger);
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => 
  console.log(`server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);

