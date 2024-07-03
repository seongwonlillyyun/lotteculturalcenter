import express from "express";
import cors from 'cors';
import path from "path";
import CourseCenterRouter from './router/CourseCenterRouter.js'

const server = express();
const port = 8080;

// common
server.use(express.json());
server.use(express.urlencoded());
server.use(cors());
server.use('/uploads', express.static(path.join('uploads')));

server.use('/center', CourseCenterRouter);

server.listen(port, ()=>{
  console.log("server start");
});