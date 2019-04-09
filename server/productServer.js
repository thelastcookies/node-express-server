let mysql = require('mysql');
let mysqlConf = require('../config/mysqlConf');
let pool = mysql.createPool(mysqlConf.mysql);
let resResult = require('../config/resConf');
let moment = require('moment');


const productSqlMap = {
    productAdd: 'insert into product (PRODUCTNAME, PRICE, DETAIL, PIC, CATG, OWNID) values(?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE PRODUCTNAME = ?, PRICE = ?, DETAIL = ?',
    productAdd: 'insert into product (PRODUCTNAME, PRICE, DETAIL, PIC, CATG, OWNID) select ?, ?, ?, ?, ?, USERID from `user` where USERNAME = ? ON DUPLICATE KEY UPDATE',
    productUpdateByID: 'update product set PRODUCTNAME = ?, PRICE = ?, DETAIL = ?, PIC = ?, CATG = ? where PRODUCTID = ?',
    getProductById: 'select product.*, user.USERNAME from product INNER JOIN user on product.OWNID = user.USERID where PRODUCTID = ? ',
    getProductsByUSER: 'select * from product where OWNID = (select USERID from user where username = ?)',
    getProductsList: 'select product.*, user.USERNAME from product INNER JOIN user on product.OWNID = user.USERID',
    // getProductsList: 'select * from product',

    delProductById: 'delete from product where PRODUCTID = ?',
};

module.exports = {
    productAdd: function (productData, callback) {
        pool.query (productSqlMap.productAdd, [productData.name, productData.price, productData.details, productData.image, productData.category, productData.username], function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            callback (res);
        });
    },
    productUpdate: function(productData, callback) {
        pool.query (productSqlMap.productUpdate, [productData.name, productData.price, productData.details, productData.image, productData.category, productData.username], function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            callback (res);
        });
    },
    productList: function (callback) {
        pool.query (productSqlMap.getProductsList, '', function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            result.forEach(function(item, index) {
                item.PIC = item.PIC.toString('utf8');
                item.TIME = moment(item.TIME).format('YYYY-MM-DD HH:mm:ss');
            });
            res.setData(result);
            callback (res);
        });
    },
    // 单个商品
    getProductByID: function (productID, callback) {
        pool.query (productSqlMap.getProductById, productID, function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            result[0].PIC = result[0].PIC.toString('utf8');
            result[0].TIME = moment(result[0].TIME).format('YYYY-MM-DD HH:mm:ss');
            res.setData(result[0]);
            callback (res);
        });
    },
    // 用户出售商品
    getProductsByUSER: function (username, callback) {
        pool.query (productSqlMap.getProductsByUSER, username, function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            result.forEach(function(item, index) {
                item.PIC = item.PIC.toString('utf8');
                item.TIME = moment(item.TIME).format('YYYY-MM-DD HH:mm:ss');
            });
            res.setData(result);
            callback (res);
        });
    }

};








// var express = require('express');
// var router = express.Router();
// let mysql = require('mysql');
// let bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
//
//
// const config = require('../config/mysqlConf');
//
// //post
// router.post('/signinVal', function (req, res) {
//
//     // 连接数据库
//     const connection = mysql.createConnection(config.mysql);
//     connection.connect();
//
//     // 获取传进来的参数
//     var username = req.body.username;
//     var password = req.body.password;
//
//     var sql = "select password from user where username = " + connection.escape(username);
//     console.log("sql语句", sql);
//
//     // 执行语句
//     connection.query(sql, function (err, rows, fields) {
//         if (!err) {
//             console.log("返回结果", rows);
//             let dbpassword = rows[0].password;
//             if (password === dbpassword) {
//                 res.send({
//                     status: true
//                 });
//             }
//             else {
//                 res.send({
//                     status: false
//                 });
//             }
//         }
//         connection.end();
//     });
// });
//
//
// module.exports = router;
//
