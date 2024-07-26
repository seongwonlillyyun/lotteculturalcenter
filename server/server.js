import express from "express";
import cors from 'cors';
import path from "path";

import memberRouter from './router/memberRouter.js'
import historyRouter from './router/historyRouter.js'

const server = express();
const port = 8080;

// common
server.use(express.json());
server.use(express.urlencoded());
server.use(cors());
server.use('/uploads', express.static(path.join('uploads')));


server.use('/member',memberRouter)
server.use('/history', historyRouter)


server.listen(port, ()=>{
  console.log("server start");
});