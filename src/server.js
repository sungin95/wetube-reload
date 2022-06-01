import express from "express";

const PORT = 4000; 

const app = express();

app.get("/", () => console.log("Somebody is trying to go home."));

const handleListening = () => 
  console.log(`server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);

