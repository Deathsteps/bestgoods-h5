'use strict';

var express = require('express');
var JSONStream = require('JSONStream');

function sendError(res, msg) {
  // res.status(500)
  // 抓取到的错误应该返回正常的statusCode
  res.send({ error: msg })
    .end();
}

var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
// Connection URL
var DB_URL = 'mongodb://localhost:27017/shop';
function connectDataBase (res, callback) {
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

router.post('/user', function (req, res, next) {
  let verfycode = req.body.verfycode
  if (verfycode) {
    // 注册流程
    // 假定注册码都是54321
    if (verfycode !== '54321') {
      return sendError(res, '验证码错误!');
    }
    // 插入
    let newOne = {
      phone: req.body.phone,
      password: req.body.password,
      nickname: '',
      avater: ''
    }
    connectDataBase(res, db => {
      db.collection('Users')
        .insertOne(newOne, function(err, r) {
          if (err) {
            sendError(res, '注册失败!');
          } else {
            res.json({ success: 1 === r.insertedCount }).end()
          }
          db.close();
        });
    });
  } else {
    // 登入流程
    connectDataBase(res, db => {
      db.collection('Users')
        .findOne({ phone: req.body.phone })
        .then(function (doc) {
          if (!doc || doc.password !== req.body.password) {
            sendError(res, '账号或密码错误!');
          } else {
            res.json({ success: true }).end()
          }
          db.close();
        })
    });
  }
})

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
    var sortKey = req.body.sortKey
    var sortValue = req.body.sortValue // -1 升序 1 降序
    // 最后的查找输出
    function findProductsAndSend(query) {
      var cursor =
        db.collection('ListProducts')
          .find( query );
      // sort
      if (sortKey) {
        cursor =
          cursor.sort({ [sortKey]: sortValue })
      }
      // page
      cursor =
        cursor.limit( pageSize ).skip( (pageIndex - 1) * pageSize );

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
        db.collection('Categories')
          .find({ superCategoryId : categoryId})
          .project({ id: 1, _id: 0 })
          .toArray(function (err, categories) {
            if (err) {
              return sendError(res, 'An error happened finding the category');
            }
            categories = categories.map(item => item.id)
            findProductsAndSend({ 'categoryId': { '$in': categories } })
          })
      } else {
        findProductsAndSend({ categoryId })
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

router.post('/address', function (req, res, next) {
  let id = req.body.id
  let action = req.body.action
  let address = req.body.address
  // create
  switch (action) {
    case 'create':
      connectDataBase(res, db => {

        function create() {
          db.collection('Addresses')
            .insertOne(address, function(err, r) {
              if (err) {
                sendError(res, '创建失败!');
              } else {
                res.json({ success: 1 === r.insertedCount }).end()
              }
              db.close();
            });
        }

        if (address.isDefault) {
          // 更新一遍该用户下的地址
          db.collection('Addresses')
            .updateMany(
              { userId: req.body.userId },
              { $set: { "isDefault": false } }
            ).then(create)
        } else {
          create()
        }

      });
      break;
    case 'find':
      connectDataBase(res, db => {
        var cursor =
          db.collection('Addresses')
            .find({ _id: new ObjectID(id) });
        responseResult(cursor, res, db);
      });
      break;
    case 'edit':
      connectDataBase(res, db => {

        function update () {
          db.collection('Addresses')
            .updateOne(
              { _id: new ObjectID(id) },
              { $set: address },
              function(err, result) {
                if (err) {
                  sendError(res, '更新失败!');
                } else {
                  res.json({ success: true }).end()
                }
                db.close();
              }
            );
        }

        console.log(address.isDefault)
        if (address.isDefault) {
          // 更新一遍该用户下的地址
          db.collection('Addresses')
            .updateMany(
              { userId: req.body.userId },
              { $set: { "isDefault": false } }
            ).then(update)
        } else {
          update()
        }

      });
      break;
    case 'delete':
      connectDataBase(res, db => {
        db.collection('Addresses')
          .deleteOne({ _id: new ObjectID(id) })
          .then(function () {
            res.json({ success: true }).end()
            db.close()
          })
      });
      break;
    default: // find all by userId
      connectDataBase(res, db => {
        var cursor =
          db.collection('Addresses')
            .find({ userId: req.body.userId });
        responseResult(cursor, res, db);
      });
  }
});

module.exports = router;
