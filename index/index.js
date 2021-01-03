const layer = layui.layer,
    form = layui.form;
//<!--------------本地没有token则返回登陆界面>
if (localStorage.getItem("token") == null) {
    location.href = '../login.html';
}


//<!--------------长时间未操作删除过期token>
function comp(xhr) {
    // complete函数，在ajax请求完成（无论成功还是失败）之后触发

    // xhr.responseJSON  就是返回的数据

    if (xhr.responseJSON && xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {

        // 删除 过期 token
        localStorage.removeItem('token');
        // 跳转到登录页面
        location.href = '/login.html';
    }

}

//<!-------------------------获取用户信息>
//查看文档
$.ajax({
    url: 'http://ajax.frontend.itheima.net/my/userinfo',
    type: 'get',
    headers: {
        'Authorization': localStorage.getItem("token")
    },
    success: (res) => {
        if (res.status === 0) {
            //<!---------------配置用户名--------------!>
            const username = res.data.nickname || res.data.username;
            $('.username').text(username);
            //<!-------------------配置图片-------------------!>
            if (res.data.user_pic) {
                $('.layui-nav-img').show().prop('src', res.data.user_pic);
                $(".avatar").hide();
            } else {
                const bigOne = username.substr(0, 1).toUpperCase();
                $(".avatar").text(bigOne).show().css("display", "inline-block");
                $('.layui-nav-img').hide();
            }
        }
    },
    complete: (xhr) => {
        comp(xhr);
    }
});
//<!-------------------退出功能，点击退出，弹出确认弹出，确认次后跳转到登陆界面----------!>
$('#logout').on('click', function() {
    layer.confirm("确认退出吗？", (num) => {
        // 如果点击了确定，删除token，页面跳转
        localStorage.removeItem('token');
        location.href = '/login.html';
    })
});