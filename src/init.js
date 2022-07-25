import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4800;

const handleListening = () =>
  console.log(`server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
