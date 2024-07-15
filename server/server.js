import express from "express";
import cors from 'cors';
import path from "path";

// soo
import fileRouter from "./router/fileRouter.js";
import locationRouter from "./router/locationRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import courseRouter from "./router/courseRouter.js";
import boardRouter from "./router/boardRouter.js";
import CourseCenterRouter from './router/CourseCenterRouter.js'
import cartRouter from "./router/cartRouter.js"
import TopicRouter from './router/TopicRouter.js'

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
server.use("/category", categoryRouter);
server.use("/course", courseRouter);
server.use('/center', CourseCenterRouter);
server.use('/cart', cartRouter);
server.use("/board", boardRouter);
server.use('/topic', TopicRouter);

server.listen(port, ()=>{
  console.log("server start");
});