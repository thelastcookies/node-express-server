let mysql = require('mysql');
let mysqlConf = require('../config/mysqlConf');
let pool = mysql.createPool(mysqlConf.mysql);
let resResult = require('../config/resConf');

const userSqlMap = {
    userAdd: 'insert into user (username, password, mobile) values (?, ?, ?)',
    userVal: 'select password from user where username = ?',
    getUserById: 'select * from user where id = ?',
    delUserById: 'delete from user where id = ?',
    updateUser: 'update user set username = ?, password = ? where id = ?',
    getUserList: 'select * from user',
};

module.exports = {
    // addUser: function (user, callback) {
    //     pool.query (userSqlMap.addUser, [user.username, user.password], function (error, result) {
    //         if (error) throw error;
    //         callback (result.affectedRows > 0);
    //     });
    // },
    userVal: function (username, callback) {
        pool.query (userSqlMap.userVal, username, function (error, result) {
            if (error) throw error;
            callback (result[0]);
        });
    },
    userAdd: function (userData, callback) {
        pool.query (userSqlMap.userAdd, [userData.username, userData.password, userData.mobile], function (error, result) {
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
