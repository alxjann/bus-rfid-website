const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const mongoUrl = process.env.MONGO_URL;
const dbName = "its";
let db;

// Connect to MongoDB once (global cache)
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(mongoUrl);
  cachedClient = client;
  cachedDb = client.db(dbName);
  return cachedDb;
}

app.get("/", (req, res) => {
  res.send("Hello World from Vercel");
});

app.get("/api/stop/:name", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const stop = await db.collection("its").findOne({ _id: req.params.name });

    if (!stop) return res.status(404).json({ error: "Stop not found" });

    res.json({
      passengerCount: stop.passengerCount,
      lastUpdated: stop.lastUpdated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = app;
