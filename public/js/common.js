// 登出
function signOut () {
    clearCookie();
    window.location.href = "/";
}

// 删除商品
function deleteProduct (product_id) {
    $.ajax({
        url: '/deleteProduct',
        data: {"product_id": product_id},
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let res = data.data;
            console.log(res);
            if (!res.valStatus) {
                alert ("用户名或密码错误");
                return ;
            }
            alert('删除成功！');
            window.location.reload();
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


// 取消订单
function orderCancel(orderId) {
    $.ajax({
        url: '/orderCancel',
        data: {
            "orderId": orderId
        },
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let res = data.data;
            console.log(res);
            if (!res.valStatus) {
                alert ("用户名或密码错误");
                return ;
            }
            alert('删除成功！');
            window.location.reload();
        },
        error: function (XMLHttpRequset, textStatus, errorThrown) {
            console.log (XMLHttpRequset);
            console.log (textStatus);
            console.log (errorThrown);
        }
    });
}
