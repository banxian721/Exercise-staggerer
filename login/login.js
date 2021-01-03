const form = layui.form,
    layer = layui.layer;

//<!------------点击‘去注册账号’-------------!>
$("#goto-register").on('click', function() {
    $("#login").hide();
    $("#register").show();
});
//<!-------------点击‘已有账号，去登录’--------!>
$("#goto-login").on('click', function() {
    $("#register").hide();
    $("#login").show();
});
//<!-----------注册----------!>
$("#register form").on('submit', function(e) {
    e.preventDefault();
    const params = $(this).serialize();
    $.ajax({
        type: 'post',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: params,
        success: (res) => {
            layer.msg(res.message);
            if (res.status == 0) {
                //成功，自动跳转到登陆页面
                $("#register").hide();
                $("#login").show();
            } else {
                //不成功，用户名被占用，清空用户名框
                $("#username").val('');
            }
        }
    })
});
//<!---------------------表单验证---------------------!>
form.verify({
    changdu: [/^\S{6,12}$/, '输入的密码不符合要求'],
    yanzheng: function(val) {
        if ($("#password").val() != val) {
            return '两次密码输入的不一样';
        }
    }
});
//<!------------登陆---------->
$("#logForm").on('submit', function(e) {
    e.preventDefault();
    const params = $(this).serialize();
    $.ajax({
        type: 'post',
        url: "http://ajax.frontend.itheima.net/api/login",
        data: params,
        success: (res) => {
            console.log(res);
            layer.msg(res.message);
            if (res.status == 0) {
                location.href = '../index.html';
                localStorage.setItem('token', res.token);
            }
        }
    })
});