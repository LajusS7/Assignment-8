import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

let resources = [
  { id: "1", name: "First resource", description: "Example resource" },
  { id: "2", name: "Second resource", description: "Another example" }
];
