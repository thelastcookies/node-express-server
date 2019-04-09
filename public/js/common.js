// 登出
function signOut () {
    clearCookie();
    window.location.href = "/";
}

// 删除商品
function deleteProduct (product_id) {
    $.ajax({
        url: '/delProductById',
        data: {"productid": product_id},
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                alert ("未能完成删除");
                return ;
            }
            alert('删除成功！');
            let username = getCookie('username');
            window.location.href="/products/list/" + username;
        },
        error: function (XMLHttpRequset, textStatus, errorThrown) {
            console.log (XMLHttpRequset);
            console.log (textStatus);
            console.log (errorThrown);
        }
    });
}

// 订单状态改变
function setOrderStatus(order_id, order_status) {
    $.ajax({
        url: '/setOrderStatus',
        data: {
            "order_id": order_id,
            "order_status": order_status
        },
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let res = data.data;
            console.log(res);
            if (!data.status) {
                alert('成功！');
                window.location.reload();
            } else {
                alert('网络错误！');
            }
        },
        error: function (XMLHttpRequset, textStatus, errorThrown) {
            console.log (XMLHttpRequset);
            console.log (textStatus);
            console.log (errorThrown);
        }
    });
}

// 新建订单
function orderCreate(productId, ownerId, buyerId) {
    $.ajax({
        url: '/orderCreate',
        data: {
            "productId": productId,
            "ownerId": ownerId,
            "buyerId": buyerId,
        },
        type: 'post',
        dataType: 'json',
        success: function (data) {
            let res = data.data;
            console.log(res);
            if (data.status) {
                alert ("下单失败！");
                return ;
            }
            alert('下单成功!');
            let username = getCookie('username');
            window.location.href="/order/" + username;
        },
        error: function (XMLHttpRequset, textStatus, errorThrown) {
            console.log (XMLHttpRequset);
            console.log (textStatus);
            console.log (errorThrown);
        }
    });
}

// 取消订单
function orderDrop(orderId) {
    $.ajax({
        url: '/orderDrop',
        data: {
            "orderId": orderId
        },
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                alert ("未能取消订单");
                return ;
            }
            alert('取消订单成功！');
            let username = getCookie('username');
            window.location.href="/order/" + username;
        },
        error: function (XMLHttpRequset, textStatus, errorThrown) {
            console.log (XMLHttpRequset);
            console.log (textStatus);
            console.log (errorThrown);
        }
    });
}
