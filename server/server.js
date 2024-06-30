import express from "express";
import cors from 'cors';
import path from "path";

const server = express();
const port = 8080;

server.listen(port, ()=>{
  console.log("server start");
});