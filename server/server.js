import express from "express";
import cors from 'cors';
import path from "path";

// soo
import fileRouter from "./router/fileRouter.js";
import locationRouter from "./router/locationRouter.js";

const server = express();
const port = 8080;

// common
server.use(express.json());
server.use(express.urlencoded());
server.use(cors());
server.use('/uploads', express.static(path.join('uploads')));

// soo
server.use("/file", fileRouter);
server.use("/location", locationRouter);

server.listen(port, ()=>{
  console.log("server start");
});