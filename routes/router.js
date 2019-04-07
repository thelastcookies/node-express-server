var express = require('express');
var router = express.Router();
let userServer = require('../server/userServer');
let productServer = require('../server/productServer');
let orderServer = require('../server/orderServer');

// pages
router.get('/', function(req, res, next) {
  res.render('index', { username: req.cookies.username });
});
router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});
router.get('/order', function(req, res, next) {
    res.render('order/order-list', { username: req.cookies.username });
});
router.get('/order/detail', function(req, res, next) {
    res.render('order/order-detail', { username: req.cookies.username });
});
//　主页获取商品列表
router.get('/productsList', function(req, res, next) {
    console.log(req);
    productServer.productList(function (data) {
        res.send (data);
    })
});
// 根据用户呈现出售物品列表
router.get('/products/list/:username', function(req, res, next) {
    let username = req.params.username;
    productServer.getProductsByUSER(username, function (data) {
        res.render('products/product-list', { username: username, userProducts: data.data });
    });
});
// 商品发布
router.get('/products/edit', function(req, res, next) {
    res.render('products/product-edit', { username: req.cookies.username, product: {} });
});
// 商品修改
router.get('/products/edit/:productid', function(req, res, next) {
    let productid = req.params.productid;
    productServer.getProductByID(productid, function (productData) {
        res.render('products/product-edit', { username: req.cookies.username, product: productData.data });
    });
});
// 查看商品详情
router.get('/products/detail/:productid', function(req, res, next) {
    let productid = req.params.productid;
    productServer.getProductByID(productid, function (productData) {
        res.render('products/product-detail', { username: req.cookies.username, product: productData.data });
    });
});
router.get('/user/:username', function(req, res, next) {
    let username = req.params.username;
    userServer.getUserByName(username, function (userData) {
        res.render('user/user-detail', { username: req.cookies.username, user: userData.data });
    });
});
router.get('/user/:username/modify', function(req, res, next) {
    let username = req.params.username;
    userServer.getUserByName(username, function (userData) {
        res.render('user/user-modify', { username: req.cookies.username, user: userData.data });
    });
});
router.get('/error', function(req, res, next) {
    res.render('error.ejs', { username: req.cookies.username });
});

// api
// 用户登录验证
router.post('/userVal', function(req, res, next) {
    console.log(req);
    let username = req.body.username;
    let password = req.body.password;
    userServer.userVal(username, password, function (data) {
        res.send (data);

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

// 商品新建和修改
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
