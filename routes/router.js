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
    };
    userServer.userAdd(userData, function (data) {
        res.send (data);
    })
});

// 用户信息更新
router.post('/userUpdate', function (req, res, next) {
    console.log(req);
    let userData = {
        userid: req.body.userid,
        username: req.body.username,
        password: req.body.password,
        mobile: req.body.mobile,
        address: req.body.address,
        wechat: req.body.wechat,
        qq: req.body.QQ,
    };
    userServer.userUpdate(userData, function (data) {
        res.send (data);
    })
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
// 商品修改页面
router.get('/products/edit/:productid', function(req, res, next) {
    let productid = req.params.productid;
    productServer.getProductByID(productid, function (productData) {
        res.render('products/product-edit', { username: req.cookies.username, product: productData.data });
    });
});
// 新建商品
router.post('/newProduct', function (req, res, next) {
    let productData = {
        productName: req.body.productName,
        category: req.body.category,
        price: req.body.price,
        details: req.body.details,
        image: req.body.image,
        userid: req.body.userid
    };
    productServer.productAdd(productData, function (data) {
        res.send (data);
    });
});
// 编辑商品
router.post('/productUpdate', function (req, res, next) {
    let productData = {
        productName: req.body.productName,
        category: req.body.category,
        price: req.body.price,
        details: req.body.details,
        image: req.body.image,
        productId: req.body.productId
    };
    productServer.productUpdate(productData, function (data) {
        res.send (data);
    });
});
// 查看商品详情
router.get('/products/detail/:productid', function(req, res, next) {
    let productid = req.params.productid;
    productServer.getProductByID(productid, function (productData) {
        res.render('products/product-detail', { username: req.cookies.username, localUserID: req.cookies.userid, product: productData.data });
    });
});
// 删除商品
router.get('/delProductById', function(req, res, next) {
    let productid = req.query.productid;
    productServer.delProductById(productid, function (data) {
        res.send (data);
    });
});

router.get('/order/:username', function(req, res, next) {
    let userid = req.cookies.userid;
    orderServer.getOrderByUSER(userid, function (data) {
        res.render('order/order-list', { username: req.cookies.username, orderList: data.data });
    });
});
router.get('/order/detail/:detailid', function(req, res, next) {
    let detailid = req.params.detailid;
    orderServer.getOrderDetailById(detailid, function (data) {
        res.render('order/order-detail', { username: req.cookies.username, orderDetail: data.data });
    });
});
router.post('/orderCreate', function (req, res, next) {
    let productId = req.body.productId;
    let ownerId = req.body.ownerId;
    let buyerId = req.body.buyerId;
    orderServer.orderCreate(productId, ownerId, buyerId, function (data) {
        res.send (data);
    });
});
router.get('/setOrderStatus', function(req, res, next) {
    let order_id = req.query.order_id;
    let order_status = req.query.order_status;
    orderServer.setOrderStatus(order_id, order_status, function (data) {
        res.send (data);
    });
});
router.get('/orderDrop', function(req, res, next) {
    let orderId = req.query.orderId;
    orderServer.orderDrop(orderId, function (data) {
        res.send (data);
    });
});
router.get('/error', function(req, res, next) {
    res.render('error.ejs', { username: req.cookies.username });
});

module.exports = router;
