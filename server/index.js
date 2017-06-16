"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
})

// db.connect((dbInstance) => {
//   app.use('/tweets', tweetsApi(dbInstance));
// });


app.listen(PORT, () => {
  console.log("Tweetr app listening on port " + PORT);
});

// close connection to Mongo when the connection is terminated by user
function gracefulShutdown() {
  console.log("\nShutting down gracefully...");
  try {
    db.close();
  }
  catch (err) {
    throw err;
  }
  finally {
    console.log("I'll be back.");
    process.exit();
  }
}

process.on('SIGTERM', gracefulShutdown); // listen for TERM signal .e.g. kill
process.on('SIGINT', gracefulShutdown);  // listen for INT signal e.g. Ctrl-C
