import "dotenv/config";
import "./db";
import "./models/video";
import "./models/User";
import app from "./server";

const PORT = 4700;

const handleListening = () =>
  console.log(`server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
