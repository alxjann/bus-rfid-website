const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const mongoUrl = process.env.MONGO_URL;
const dbName = "its";

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
  res.send("Hello World!");
});

app.get("/api/stop/:name", async (req, res) => {
  try {
    const db = await connectToDatabase();
    
    const documentCount = await db.collection("list").countDocuments({ _id: req.params.name });

    const lastUpdate = await db.collection("list").findOne({ _id: "collectionUpdate" });

    res.json({
      passengerCount: documentCount,
      lastUpdate: lastUpdate.lastUpdate,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/clear/:name", async (req, res) => {
  try {
    const db = await connectToDatabase();
    
    const result = await db.collection("list").deleteMany({ stop: req.params.name });
    
    res.json({
      message: `Successfully cleared ${result.deletedCount} documents`,
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = app;

/*
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});*/



/*

MongoClient.connect(mongoUrl).then(client => {
	console.log('Connected to MongoDB');
	db = client.db(dbName);
}).catch(err => {
	console.error('MongoDB connection error:', err);
});

app.get('/api/stop/:name', async (req, res) => {
	try {
		if (!db) 
			return res.status(500).json({ error: 'DB not connected' });

		const stop = await db.collection('its').findOne({ _id: req.params.name });

		if (!stop) 
			return res.status(404).json({ error: 'Stop not found' });

		res.json({ 
			passengerCount: stop.passengerCount,
			lastUpdated: stop.lastUpdated
		});

	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

*/