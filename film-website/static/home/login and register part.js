function login_register_part() {
    // 绑定组件的事件，这些在不同状态下不会有影响
    $("#login").click(function(event) { // 切换登录的按钮
        if ($("#login").html() == "已有账号，去登录") {
            $("#login").html("还没有账号，去注册");
            $("#login+button").html("登录");
        } else {
            $("#login").html("已有账号，去登录");
            $("#login+button").html("注册");
        }
    });

    $("#close").click(function() { // 关闭弹窗
        if ($("#login-register").css("visibility") == "visible") {
            $("#login-register").css("visibility", "hidden");
            $("body").css("height", "auto");
            $("body").css("overflow", "unset");
            document.onmousewheel = function() {
                return true;
            };
        }
    });

    $('#lo').click(function(event) {
        get_url = "/logout";
        $.get(get_url, function(data, textStatus, xhr) {
                if (textStatus == "success") { // 登录或注册成功
                    alert('logout');
                    location.href = 'http://localhost:5000/';
                    //alert('the message has already seen to the telnumber');
                }
            }
        ).error(function(err, data) {
                alert('error');
        });
    });

    $('#getcode').click(function(event) {
        username_input = $("input[name='phonenum']").val();

        post_url = "/check_tel";


        $.post(post_url, {
                username: username_input,
            }, function(data, textStatus, xhr) {
                if (textStatus == "success") { // 登录或注册成功
                    //alert('please login');
                    alert('the message has already seen to the telnumber');
                }
            }
            
        ).error(function(err, data) {
                alert('error');
        });

    });

    $("#login+button").click(function(event) { // 注册或登录
        //$("#login+button").attr('disabled', 'disabled');

        // 包装数据  .html()拿不到值
        username_input = $("input[name='phonenum']").val();
        password_input = $("input[name='password']").val();
        check_word_input = $("input[name='check-word']").val();

        // TODO: 未完善
        if ($("#login+button").html() == "注册")
            //post_url = "/register";
            post_url = "/register";
        else
            post_url = "/login";


        $.post(post_url, {
                username: username_input,
                password: password_input,
                check_word: check_word_input
            }, function(data, textStatus, xhr) {
                //alert(data);
                //alert(textStatus);
                
                if (textStatus == "success") { // 登录或注册成功
                    alert('login success');
                    //alert('the message has already seen to the telnumber');
                    location.href = 'http://localhost:5000/';
                    //windows.location('http://localhost:5000/login');
                    //document.cookie = data.split(";")[0];
                }
                //
                //login_status();
                //return false;
            }
            
        ).error(function(err, data) {
                //alert(data);
                alert('error');
        });

        //return false;

    });

    $("#logout button").click(function(event) { // 切换到未登录
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // 删除cookie
        logout_status();
    });

    // 已经登录的情况下的事件绑定
    function login_status() {
        $("#head-icon").click(null);
        $("#head-icon").mouseover(function(event) {
            $("#logout").css('visibility', 'visible');
        });
        $("#logout").mouseleave(function(event) {
            $("#logout").css('visibility', 'hidden');
        });
    }

    // 未登录的情况下的事件绑定
    function logout_status() {
        $("#head-icon").mouseover(null); // 删除鼠标覆盖事件
        $("#head-icon").click(function() { // 增加点击弹窗事件
            if ($("#login-register").css("visibility") == "hidden") {
                $("#login-register").css("visibility", "visible");
                $("body").css({
                    'height': '100vh',
                    'overflow-y': 'hidden',
                    'overflow-x': 'scroll'
                });
                document.onmousewheel = function() {
                    return false;
                };
            }
        });
    }

    // 检查cookie是否已经登录
    if (document.cookie.length != 0) {
        cookies = document.cookie.split(";");
        cookies.each(function(index, cookie) {
            if (cookie.index("username=") == 0)
                username = cookie.substring("username=".length, cookie.length);
        });
    }

    if (typeof(username) != "undefined") { // 已登录
        // 请求头像
        // url_get = "?username=" + username;
        // $.get(url_get, function(data) {
        //     $("#head-icon").attr('src', data);
        // });
        login_status();
    } else { // 未登录
        $("#login-register").css('visibility', 'hidden');
        logout_status();
    }

    $('#up').click(function(event){
        //alert('159');
        // 判断上传文件类型
        objFile = $("input[name='test']").val();
        //alert(objFile);
        //$('#j_imgPic').attr('src', objFile);
        objType = objFile.substring(objFile.lastIndexOf(".")).toLowerCase();
        //alert(objType);
        formData = new FormData();
        file = document.getElementById('j_imgfile').files[0];
        //alert(file);
        //formData = $('picForm').formSerialize();
        formData.append('file', file);
        //alert($('#picForm')[0]);
        //alert(formData);
        //console.log(objType);
        if(!(objType == '.jpg'||objType == '.png'))
        {
            alert("请上传jpg、png类型图片");
            return false;
        }else{
            alert('loading');
            post_url = "/upload";
            $.ajax({
                url: post_url ,
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    //alert('success');
                    //alert(data.imgSrc);
                    $('#j_imgPic').attr('src', data.imgSrc);
                    /*if(data.msg == 'ok'){
                        $('#addUpdateMode').modal('toggle');
                        layer.alert('保存成功', function(index){
                            $("#queryForm").submit();
                            layer.close(index);
                        });

                    }else if(data.msg == 'error'){
                        layer.alert('保存失败');
                    }*/
                },
                error: function (data) {
                    alert('出现错误');
                    //$('#addUpdateMode').modal('toggle');
                }
            });
            //alert('end');
            return false;
        }
    });
}
