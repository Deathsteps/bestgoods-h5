'use strict';

var express = require('express');
var JSONStream = require('JSONStream');

function sendError(res, msg) {
  res.status(500)
    .send({ error: msg })
    .end();
}

var MongoClient = require('mongodb').MongoClient;
// Connection URL
var DB_URL = 'mongodb://localhost:27017/shop';
function connectDataBase(res, callback) {
  MongoClient.connect(DB_URL, function(err, db) {
    if (err) {
      sendError(res, 'An error happened connecting the database!');
    } else {
      callback(db);
    }
  });
}

function responseResult(cursor, res, db) {
  // pipe the json steam to response
  cursor.stream()
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
    .on('end', () => {
      // close connection and end response
      db.close();
      res.end();
    });
}

var router = express.Router();

router.post('/categories', function (req, res, next) {
  connectDataBase(res, db => {
    var superId = req.body.superId || 0;
    var level = req.body.level;
    var cursor =
      db.collection('Categories')
        .find({ level: level, superCategoryId: superId });
    responseResult(cursor, res, db);
  })
})
router.post('/hot-sale', function (req, res, next) {
  connectDataBase(res, db => {
    var cursor =
      db.collection('ListProducts')
        .find({ id: { $in : [1136010, 1110004, 1145021, 1167004, 1167004] } });
    // pipe the json steam to response
    responseResult(cursor, res, db);
  })
})
router.post('/list-products', function (req, res, next) {
  connectDataBase(res, db => {
    var pageSize = req.body.pageSize
    var pageIndex = req.body.pageIndex
    // 最后的查找输出
    function findProductsAndSend(categoryId) {
      var cursor =
        db.collection('ListProducts')
          .find({ categoryId })
          .limit( pageSize )
          .skip( (pageIndex - 1) * pageSize );

      responseResult(cursor, res, db);
    }
    // 查看是不是一级类别
    var categoryId = req.body.categoryId
    db.collection('Categories').findOne({ id: categoryId }, function(err, category) {
      if (err) {
        return sendError(res, 'An error happened finding the category');
      }

      if (category.level === 'L1') {
        // 找到这个一级类别下的子类别
        db.collection('Categories').findOne(
          { superCategoryId : categoryId},
          function (err, subCategory) {
            if (err) {
              return sendError(res, 'An error happened finding the category');
            }
            findProductsAndSend(subCategory.id)
          }
        )
      } else {
        findProductsAndSend(categoryId)
      }
    });
  })
})
router.post('/product', function (req, res, next) {
  connectDataBase(res, db => {
    var cursor =
      db.collection('Products')
        .find({ id: req.body.id });
    responseResult(cursor, res, db);
  })
})
router.post('/comments', function (req, res, next) {
  connectDataBase(res, db => {
    var cursor =
      db.collection('Comments')
        .find({ productId: req.body.productId });
    responseResult(cursor, res, db);
  })
})

module.exports = router;
