let mysql = require('mysql');
let mysqlConf = require('../config/mysqlConf');
let pool = mysql.createPool(mysqlConf.mysql);
let resResult = require('../config/resConf');

const userSqlMap = {
    userAdd: 'insert into user (username, password, mobile) values (?, ?, ?)',
    userVal: 'select userid, password from user where username = ?',
    getUserByName: 'select * from user where username = ?',
    // updateUser: 'update user set username = ?, password = ? where username = ?',
    getUserList: 'select * from user',
    delUserByName: 'delete from user where username = ?',
};

module.exports = {
    // addUser: function (user, callback) {
    //     pool.query (userSqlMap.addUser, [user.username, user.password], function (error, result) {
    //         if (error) throw error;
    //         callback (result.affectedRows > 0);
    //     });
    // },
    userVal: function (username, password, callback) {
        pool.query (userSqlMap.userVal, username, function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            if (result[0] && result[0].password === password) {
                res.setData({
                    valStatus: true,
                    userID: result[0].userid
                });
            } else {
                res.setData({status: false});
            }
            callback (res);
        });
    },
    userAdd: function (userData, callback) {
        pool.query (userSqlMap.userAdd, [userData.username, userData.password, userData.mobile], function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            callback (res);
        });
    },
    getUserByName: function (username, callback) {
        pool.query (userSqlMap.getUserByName, username, function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            res.setData(result[0]);
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
