import "./db";
import "./models/video";
import "./models/User";
import app from "./server";

const PORT = 4500;

const handleListening = () =>
  console.log(`server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
