#! /usr/bin/env node

//console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Account = require('./models/account')

// name: {type: String, required: true, maxLength: 100},
// org: {type: String, required: true, maxLength: 100},
// account_id: {type: String, required: false, maxLength: 100},

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoD`B connection error:'));

var accounts = [{name: 'PNC Cashbuilder', org: 'PNC', account_id: '00004489153048670797'}]

Account.bulkWrite(
  accounts.map((name) => 
    ({
      updateOne: {
        filter: { name: name.name},
        update: { $set: name},
        upsert: true
      }
    })
  )
)

mongoose.connection.close();





