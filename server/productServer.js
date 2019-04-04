let mysql = require('mysql');
let mysqlConf = require('../config/mysqlConf');
let pool = mysql.createPool(mysqlConf.mysql);
let resResult = require('../config/resConf');


const productSqlMap = {
    productAdd: 'insert into product (PRODUCTNAME, PRICE, DETAIL, PIC, CATG, OWNID) select ?, ?, ?, ?, ?, USERID from `user` where USERNAME = ?',
    getProductById: 'select * from product where PRODUCTID = ?',
    getProductByUSER: 'select * from product where OWNID = (select USERID from user where username = ?)',
    getProductList: 'select * from product',
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
