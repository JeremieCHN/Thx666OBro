window.onload = function() {
    login_register_part();
    // 事件绑定
    var choices = $("#choices").children("p");
    $(choices[0]).click(function() {
        if (!$(choices[0]).hasClass("cinema-comment-selected")) {
            $(choices[0]).addClass("cinema-comment-selected");
            $(choices[1]).removeClass("cinema-comment-selected");
            $("#cinema-part").css("visibility", "visible");
            $("#comment-part").css("visibility", "hidden");
        }
    });
    $(choices[0]).click();
    $(choices[1]).click(function() {
        if (!$(choices[1]).hasClass("cinema-comment-selected")) {
            $(choices[1]).addClass("cinema-comment-selected");
            $(choices[0]).removeClass("cinema-comment-selected");
            $("#cinema-part").css("visibility", "hidden");
            $("#comment-part").css("visibility", "visible");
        }
    });

    // TODO: 获取各种信息啊
    var movie_name = window.location.href.split('?')[1];
    $.get('/get', function (data) {
        play_video("http://player.youku.com/player.php/sid/XMjc5ODU5OTU3Ng==/v.swf");
    });

    $("#star-bar").click(function() {
        var x = event.pageX - $("#star-bar").offset().left;
        $("#star-bar-bottom").width(x);
        $("#star-bar-top").width(270-x);
        x = x - 19;
        var score = Math.ceil(x / 24) - 1;
        var dec = x - score * 24;
        if (dec > 15)
            score += 1;
        else
            score += dec /15;
        if (score >= 10)
            $("#your-score").html("10.0");
        else
            $("#your-score").html(score.toFixed(1));
    });
};
