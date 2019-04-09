let mysql = require('mysql');
let mysqlConf = require('../config/mysqlConf');
let pool = mysql.createPool(mysqlConf.mysql);
let resResult = require('../config/resConf');
let moment = require('moment');


const orderSqlMap = {
    orderCreate: 'call order_create (?, ?, ?)',
    getOrderDetailById: 'call order_detail (?)',
    getOrderByUSER: 'call get_order_by_user(?)',
    setOrderStatus: 'update `order` set status = ? where orderid = ?',
    orderDrop: 'call order_drop (?)',
};

module.exports = {
    orderCreate: function (productId, ownerId, buyerId, callback) {
        pool.query (orderSqlMap.orderCreate, [productId, ownerId, buyerId], function (error, result) {
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
    getOrderByUSER: function (userID, callback) {
        pool.query (orderSqlMap.getOrderByUSER, userID, function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            if (res.status === 0 && result.length) {
                // result[0].TIME = moment(result[0].TIME).format('YYYY-MM-DD HH:mm:ss');
                // result[1].TIME = moment(result[1].TIME).format('YYYY-MM-DD HH:mm:ss');
                let buyList = result[0];
                let sellList = result[1];
                buyList.forEach(function (item) {
                    item.TIME = moment(item.TIME).format('YYYY-MM-DD HH:mm:ss');
                });
                sellList.forEach(function (item) {
                    item.TIME = moment(item.TIME).format('YYYY-MM-DD HH:mm:ss');
                });
                res.setData({
                    sellList: sellList,
                    buyList: buyList
                });
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
    setOrderStatus: function (orderid, status, callback) {
        pool.query (orderSqlMap.setOrderStatus, [status, orderid], function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            res.setData(result);
            callback (res);
        });
    },
    orderDrop: function (orderId, callback) {
        pool.query (orderSqlMap.orderDrop, orderId, function (error, result) {
            let res = new resResult();
            res.setStatus(error ? error.errno : 0);
            res.setErrMsg(error ? error.message: result.message);
            res.setData(result[0]);
            callback (res);
        });
    }
};
