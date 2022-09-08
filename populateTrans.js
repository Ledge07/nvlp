#! /usr/bin/env node

//const { readFile } = require('fs');
const ofx = require('node-ofx-parser');
const fs = require('fs').promises

const filename = 'importTest.qfx'
async function readFile(filename) {
  const data = await fs.readFile(filename, 'utf8')
  var transactions = []
  const parsedData = ofx.parse(data)
  const accountName = parsedData.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN[0].DTPOSTED
  
  parsedData.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN.forEach((x) => {
    const dateString = x.DTPOSTED
    const dateTrans = new Date( dateString.substr(0,4)+"/" +dateString.substr(4,2)+"/"+ dateString.substr(6,2))
    transactions += "{type: '" + x.TRNTYPE + "'," + 
                    "amount: '" + Math.trunc(Number(x.TRNAMT)*100.00) + "'," +
                    "date_posted: '" + dateTrans + "'," +
                    "transaction_id: '" + x.FITID + "'," +
                    "name: '" + x.NAME + "'," +
                    "account: '" + x.NAME + "'" +
                  "},"
  })
  console.log(transactions)
  //return parsedData
}

// account: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
// category: [{ type: Schema.Types.ObjectId, ref: 'Category' }]

readFile(filename)

// fs.readFile(, 'utf8', function(err, ofxData) {
//     if (err) throw err;

//     const data = ofx.parse(ofxData);
//     //console.dir(data);
//     console.log(data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST);
// });





// Get arguments passed on command line
// var userArgs = process.argv.slice(2);
// /*
// if (!userArgs[0].startsWith('mongodb')) {
//     console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
//     return
// }
// */
// var async = require('async')
// var Transaction = require('./models/transaction')

// var mongoose = require('mongoose');
// var mongoDB = userArgs[0];
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Transaction.bulkWrite(
//   transactions.map((transaction_id) => 
//     ({
//       updateOne: {
//         filter: { transaction_id: transaction_id.transaction_id},
//         update: { $set: transaction_id},
//         upsert: true
//       }
//     })
//   )
// )

// mongoose.connection.close();





