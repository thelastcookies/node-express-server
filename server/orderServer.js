let mysql = require('mysql');
let mysqlConf = require('../config/mysqlConf');
let pool = mysql.createPool(mysqlConf.mysql);
let resResult = require('../config/resConf');
let moment = require('moment');


const orderSqlMap = {
    orderCreate: 'insert into order (productname, produciid, ownerid, buyerid, status) values (?, ?, ?, ?, ?)',
    getOrderDetailById: 'call order_detail (?)',
    getOrderByUSER: 'select * from `order` where ownerid = ? or buyerid = ?',
    setOrderStatus: 'update order set status = ? where orderid = ?',
    delOrderById: 'delete from order where orderid = ?',
};

module.exports = {
    orderCreate: function (username, password, callback) {
        pool.query (orderSqlMap.orderCreate, username, function (error, result) {
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
    getOrderDetailById: function (orderid, callback) {
        pool.query (orderSqlMap.getOrderDetailById, orderid, function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            result[3][0].PIC = result[3][0].PIC.toString('utf8');
            result[0][0].TIME = moment(result[0][0].TIME).format('YYYY-MM-DD HH:mm:ss');
            res.setData({
                order: result[0][0],
                buyer: result[1][0],
                owner: result[2][0],
                product: result[3][0]
            });
            callback (res);
        });
    },
    getOrderByUSER: function (userID, callback) {
        pool.query (orderSqlMap.getOrderByUSER, [userID, userID], function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            if (res.status === 0) {
                result[0].TIME = moment(result[0].TIME).format('YYYY-MM-DD HH:mm:ss');
                let sellList = [];
                let buyList = [];
                result.forEach(function (item, index) {
                    if (item.OWNERID == userID)
                        sellList.push(item);
                    else
                        buyList.push(item);
                });
                res.setData({
                    sellList: sellList,
                    buyList: buyList
                });
            }
            callback (res);
        });
    },
    setOrderStatus: function (username, callback) {
        pool.query (orderSqlMap.setOrderStatus, username, function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            res.setData(result[0]);
            callback (res);
        });
    },
    delOrderById: function (username, callback) {
        pool.query (orderSqlMap.delOrderById, username, function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            res.setData(result[0]);
            callback (res);
        });
    }
};
