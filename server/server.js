const express = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();


const mongoUrl = process.env.MONGO_URL;
const dbName = 'its';
let db;

app.use(cors());

async function connectDB() {
	if (!client) {
		client = await MongoClient.connect(mongoUrl);
		db = client.db(dbName);
		console.log('Connected to MongoDB');
	}
	return db;
}

app.get('/', (req, res) => {
	res.send('Hello World from Vercel!');
});

app.get('/api/stop/:name', async (req, res) => {
	try {
		const db = await connectDB();

		const stop = await db.collection('its').findOne({ _id: req.params.name });
		if (!stop) return res.status(404).json({ error: 'Stop not found' });

		res.json({
			passengerCount: stop.passengerCount,
			lastUpdated: stop.lastUpdated,
		});
	} catch (err) {
		console.error('Error:', err);
		res.status(500).json({ error: err.message });
	}
});


/*
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});*/

module.exports = app;

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