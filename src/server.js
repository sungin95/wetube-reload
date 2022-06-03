import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const PORT = 4500; 
console.log(process.cwd());
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);



const handleListening = () => 
  console.log(`server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);

