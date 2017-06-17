"use strict";
const ObjectId      = require('mongodb').ObjectID;


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, tweets) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          callback(err);
          return;
        }
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });
    },

    likeTweet: function(id, callback) {
      db.collection("tweets").findOne ({_id: ObjectId(id)}, (err, tweet) => {
        console.log("tweet", tweet);
        console.log("id", id);
        if (err) {
          console.log("err", err);
          callback(err);
          return;
        }
        if (tweet) {
          console.log('found tweet', tweet._id);
          const likes = tweet.likes || 0;
          console.log("Likes", likes);
          // tweet.likes = likes + 1;
          // tweet.save();
          db.collection("tweets").save(tweet, {$set: {"likes": likes + 1}}, function(err, result){
            callback(err, result);
          });
        } else {
          callback ();
        }
      })
    }
  }
}
