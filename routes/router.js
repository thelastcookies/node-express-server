var express = require('express');
var router = express.Router();
let userApi = require('../api/userApi');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Express' });
});
router.post('/signin/userVal', function(req, res, next) {
    console.log(req);
    let username = req.body.username;
    let password = req.body.password;
    userApi.userVal(username, function (dbPassword) {
        if(!dbPassword || dbPassword.password !== password) {
            res.send(false)
        }
        else {
            res.send(true);
        }
    })
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

module.exports = router;
