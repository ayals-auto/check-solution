var express = require('express')
var mongoose = require('mongoose')
var app = express()
mongoose.Promise = Promise
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://devopscheck:A0544799449ab!@ds145184.mlab.com:45184/checkpoint-devops';
time = Date.toString()

app.get('/' , async (req, res) => {
    try {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("checkpoint-devops");
             dbo.collection("posts").countDocuments(function(err, result) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              
              res.json(result) 
              if (err) throw err;
              console.log(result);
              db.close();
            });

          });

      } catch (e) {
        console.log(e);
      }
    });
    
    app.post('/',(req, res) => {
      try {
        console.log(req.body)
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("checkpoint-devops");
          var myobj = { message: "yey", date: time };
          dbo.collection("posts").insertOne(myobj, function(err, result) {
            res.send(result)
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
        });
        } catch (e) {
          console.log(e);
        }
      });



app.listen(3000)
