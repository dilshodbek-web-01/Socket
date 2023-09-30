import express from "express";
const app = express();

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server);

import cors from "cors";
import * as dotenv from "dotenv";

import fs from "fs";
import path from "path";

// dotenv.config();

const port = process.env.PORT || 4444;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

io.on("connection", (socket) => {
  // socket.on("disconnect", () => {
  // });
  socket.on("some", (data) => {
    io.emit("connected", data.msg);
  });
});

app.use("/*", (req, res) => {
  res.json({ message: "NOT FOUND !!!." });
});

server.listen(port, () => console.log(port));
