const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
 
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

    const collection = db.collection("list");
    const documentCount = await collection.countDocuments({ stop: req.params.name });
    const collectionUpdate = await collection.findOne({ _id: "collectionUpdate" });

    if (collectionUpdate.status !== 'Ready to Board' && collectionUpdate.status !== 'Route Mismatch') {
      const status = documentCount > 0 ? 'Awaiting Bus' : 'No Passenger';
      await collection.updateOne(
        { _id: "collectionUpdate" },
        { 
          $set: { 
            status: status
          }
        }
      );
      collectionUpdate.status = status;
    }

    res.json({
      passengerCount: documentCount,
      lastUpdate: collectionUpdate.lastUpdate,
      status: collectionUpdate.status
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/stop/:name", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const stopName = req.params.name;
    const collection = db.collection("list");

    //if (req.body.status === 'Ready to Board' || req.body.status === 'Route Mismatch') {
      await collection.updateOne(
        { _id: "collectionUpdate" },
        { 
          $set: { 
            status: req.body.status
          }
        }
      );
    //}

    res.json({
      message: `Status updated to ${req.body.status} for stop ${stopName}`,
      status: req.body.status
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/clear/:name", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const collection = db.collection("list");
    const result = await collection.deleteMany({ stop: req.params.name });
    const lastUpdate = await collection.findOne({ _id: "collectionUpdate" });

    if (lastUpdate) {
      collection.updateOne(
        { _id: "collectionUpdate" },
        { 
          $set: { 
            lastUpdate: new Date(),
            status: "No Passenger"
          } 
        }
      );
    }


    res.json({
      message: `Successfully cleared ${result.deletedCount} documents`,
      deletedCount: result.deletedCount
    });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.delete("/api/clear/:name/:count?", async (req, res) => {
//   try {
//     const db = await connectToDatabase();
//     const collectionList = db.collection("list");
//     const collectionStatus = db.collection("status");

//     const stopName = req.params.name;
//     const count = parseInt(req.params.count, 10);

//     let result;

//     if (!isNaN(count) && count > 0) {
//       const docsToDelete = await collectionList.find({ stop: stopName }).limit(count).toArray();
//       const ids = docsToDelete.map(doc => doc._id);
//       result = await collectionList.deleteMany({ _id: { $in: ids } });
//     } else {
//       result = await collectionList.deleteMany({ stop: stopName });
//     }

//     await collectionStatus.updateOne(
//       { _id: "collectionUpdate" },
//       {
//         $set: {
//           lastUpdate: new Date(),
//           status: result.deletedCount > 0 ? "Updated" : "No Passenger"
//         }
//       },
//       { upsert: true }
//     );

//     res.json({
//       message: `Deleted ${result.deletedCount} document(s) for stop ${stopName}`,
//       deletedCount: result.deletedCount
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




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