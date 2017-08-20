'use strict';

var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var DB_URL = 'mongodb://localhost:27017/shop';

var connectDataBase = (res, callback) => {
  MongoClient.connect(DB_URL, function(err, db) {
    if (err) {
      res.status(500)
        .send({ error: 'An error happened connecting the database!' })
        .end();
    } else {
      callback(db)
    }
  });
}

router.post('/categories', function (req, res, next) {
  connectDataBase(res, db => {
    var superId = req.body.superId || 0;
    var level = req.body.superId;
    var result =
      db.collection('Categories')
        .find({ level: level, superCategoryId: superId });
    res.json(result).end()
  })
})
router.post('/hot-sale', function (req, res, next) {
  connectDataBase(res, db => {
    var result =
      db.collection('ListProducts')
        .find({ $in : [1136010, 1110004, 1145021, 1167004, 1167004] });
    res.json(result).end()
  })
})
router.post('/list-products', function (req, res, next) {
  connectDataBase(res, db => {
    var result =
      db.collection('ListProducts')
        .find({ categoryId: req.body.categoryId });
    res.json(result).end()
  })
})
router.post('/product', function (req, res, next) {
  connectDataBase(res, db => {
    var result =
      db.collection('Products')
        .find({ id: req.body.id });
    res.json(result).end()
  })
})
router.post('/comments', function (req, res, next) {
  connectDataBase(res, db => {
    var result =
      db.collection('Comments')
        .find({ productId: req.body.productId });
    res.json(result).end()
  })
})

module.exports = router;
