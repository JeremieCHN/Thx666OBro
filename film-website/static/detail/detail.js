window.onload = function () {
    login_register_part();
    function play_video(video_url) {
    movie_name = $("#movie-name").html();

    $("#play").click(function(event) {
        $("#play-video").css('visibility', 'visible');
        $("body").css({
            'height': '100vh',
            'overflow-y': 'hidden',
            'overflow-x': 'scroll'
        });
        $("#play-video p").after("<embed src='"+ video_url +"' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>");
    });

    $("#play-video > p").click(function(event) {
        $("#play-video").css('visibility', 'hidden');
        $("#play-video embed").remove();
        $("body").css("height", "auto");
        $("body").css("overflow", "unset");
    });
}

    // TODO: 获取各种信息啊
    var movie_name = window.location.href.split('=')[1];
    $.get('/getFilmProfile?film_name=' + movie_name, function (data) {
        $("#video-poster img").attr("src", data.picture_url);
        $("#movie-name").html(data.film_name);
        $("#introduce span").html(data.film_detail);
        $("#movie-language span").html(data.film_ename);
        $("#directior span").html(data.show_date);
        $("#actors span").html(data.score);
        play_video(data.video_url);
    });

    $.get('/get_comment?film_name=' + movie_name, function (data, textStatus) {
        if (textStatus === "success") {
            var comments = data.data;
            comments.forEach(function (el) {
                var date = new Date(el.timeStamp);
                var dateStr = date.getYear() + date.getMonth() + date.getDay() + " " + date.getHours() + ":" + date.getMinutes();
                $("#comment-part ul").append('<li>' +
                    '<p><span class="comment-user">' + el.username + '</span><span class="comment-time"></span></p>' +
                    '<p class="comment-detail">' + el.content + '</p>' +
                    '</li>');
            });
        }
    });

    $("#release-comment button").click(function () {
        var username = $("#avatar-part > p > span").html();
        if (username !== "12345678900") {
            $.post("/add_comment", {
                username: username,
                film_name: decodeURI(movie_name),
                content: $("textarea").val()
            }, function (data, textStatus) {
                if (textStatus === "success")
                    alert("评论成功");
            })
        } else {
            alert("请先登录");
        }
    });


    $("#star-bar").click(function () {
        var x = event.pageX - $("#star-bar").offset().left;
        $("#star-bar-bottom").width(x);
        $("#star-bar-top").width(270 - x);
        x = x - 19;
        var score = Math.ceil(x / 24) - 1;
        var dec = x - score * 24;
        if (dec > 15)
            score += 1;
        else
            score += dec / 15;
        if (score >= 10)
            $("#your-score").html("10.0");
        else
            $("#your-score").html(score.toFixed(1));
    });


};
