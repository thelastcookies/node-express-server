var express = require('express');
var router = express.Router();
let userServer = require('../server/userServer');
let productServer = require('../server/productServer');
let orderServer = require('../server/orderServer');

// pages
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});
router.get('/order', function(req, res, next) {
    res.render('order/order-list', { title: 'Express' });
});
router.get('/order/detail', function(req, res, next) {
    res.render('order/order-detail', { title: 'Express' });
});
router.get('/products', function(req, res, next) {
    res.render('products/product-list', { title: 'Express' });
});
router.get('/products/edit', function(req, res, next) {
    res.render('products/product-edit', { title: 'Express' });
});
router.get('/products/detail', function(req, res, next) {
    res.render('products/product-detail', { title: 'Express' });
});
router.get('/user', function(req, res, next) {
    res.render('user/user-detail', { title: 'Express' });
});
router.get('/user/modify', function(req, res, next) {
    res.render('user/user-modify', { title: 'Express' });
});
router.get('/error', function(req, res, next) {
    res.render('error', { title: 'Express' });
});

// api
// 用户登录验证
router.post('/userVal', function(req, res, next) {
    console.log(req);
    let username = req.body.username;
    let password = req.body.password;
    userServer.userVal(username, function (dbPassword) {
        if (!dbPassword || dbPassword.password !== password) {
            res.send(false)
        }
        else {
            res.send(true);
        }
    })
});

// 用户注册
router.post('/userAdd', function(req, res, next) {
    console.log(req);
    let userData = {
        username: req.body.username,
        password: req.body.password,
        mobile: req.body.mobile
    }
    userServer.userAdd(userData, function (data) {
        res.send (data);
    })
});

// 产品新建和修改
router.post('/productModify', function(req, res, next) {
    console.log(req);
    let productData = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        details: req.body.details,
        image: req.body.image,
        username: req.body.username
    };
    productServer.productAdd(productData, function (data) {
        res.send (data);
    })
});


module.exports = router;
