window.onload = function () {
    login_register_part();

    // 先获取数据再进行bind
    function toLi(movieName, posterURL) {
        return '<li><button class="buy-ticket">选座购票</button><div class="poster-message"><p>' + movieName + '</p></div><div class="shade"></div><img src="' + posterURL + '"></li>';
    }

<<<<<<< HEAD
    $.get('/getFilmList?type="0"', function (data, textStatus) {
=======
    function li_shade(lis) { // 阴影事件
        for (var i = lis.length - 1; i >= 0; i--) {
            (function (li) {
                li.mouseover(function () {
                    var bros = li.siblings();
                    for (var j = bros.length - 1; j >= 0; j--) {
                        $(bros[j]).children(".shade").css("visibility", "visible");
                    }
                });
                li.mouseleave(function () {
                    var bros = li.siblings();
                    for (var j = bros.length - 1; j >= 0; j--) {
                        $(bros[j]).children(".shade").css("visibility", "hidden");
                    }
                });
            })($(lis[i]));
        }
    }

    function DirectionClick(num, direct) {
        return function () {
            var ul, liCount;
            if (num === 0) {
                var showing = $("#showing-list");
                ul = showing.children("ul");
                liCount = ul.children("li").length;
            } else {
                var coming = $("#show-soon-list");
                ul = coming.children("ul");
                liCount = ul.children("li").length;
            }
            // 页面容量和左边藏了几个
            var maxCount = $(".list-part")[0].clientWidth / 210;
            var hidCount = 0 - parseInt(ul.css("margin-left")) / 210;
            if (liCount <= maxCount) // 页面上的就是全部
                return;

            if (direct === "left" && liCount - hidCount > maxCount) { // 左边还能藏
                ul.css("margin-left", (0 - (hidCount + 1) * 210) + "px");
            } else if (direct === "right" && hidCount > 0) {
                ul.css("margin-left", (0 - (hidCount - 1) * 210) + "px");
            }
        };
    }

    var left_buttons = $(".left-button");
    var right_buttons = $(".right-button");

    // 网络请求
    $.get('/getFilmList?type=0', function (data, textStatus) {
>>>>>>> 609273acca7535140049ab4026f12c2753c4fe04
        if (textStatus === "success") {
            var movies = eval(data);
            var ul = $("#showing-list").children("ul.poster-part");
            movies.each(function (index, el) {
                ul.append(toLi(el.film_name, el.picture_url));
            })
        }
        var buy_buttons = $("#showing-list .buy-ticket");
        for (i = buy_buttons.length - 1; i >= 0; i--) {
            $(buy_buttons[i]).click(
                (function (i) {
                    return function () {
                        var d = $(buy_buttons[i]);
                        d = d.next();
                        p = $(d.children());
                        window.location.href="/detail?movie_name=" + p.text();
                    };
                })(i));
        }
    });

    $.get('/getFilmList?type="1"', function (data, textStatus) {
        if (textStatus === "success") {
            var movies = eval(data);
            var ul = $("#showing-list").children("ul.poster-part");
            movies.each(function (index, el) {
                ul.append(toLi(el.film_name, el.picture_url));
            })
        }
        var buy_buttons = $("#showing-list .buy-ticket");
        for (i = buy_buttons.length - 1; i >= 0; i--) {
            $(buy_buttons[i]).click(
                (function (i) {
                    return function () {
                        var d = $(buy_buttons[i]);
                        d = d.next();
                        p = $(d.children());
                        window.location.href="/detail?movie_name=" + p.text();
                    };
                })(i));
        }
    });



    function DirectionClick(num, direct) {
        return function () {
            var ul, liCount;
            if (num === 0) {
                var showing = $("#showing-list");
                ul = showing.children("ul");
                liCount = showing.children("li").length;
            } else {
                var coming = $("#show-soon-list");
                ul = coming.children("ul");
                liCount = coming.children("li").length;
            }
            // 页面容量和左边藏了几个
            var maxCount = $(".list-part")[0].clientWidth / 210;
            var hidCount = 0 - parseInt(ul.css("margin-left")) / 210;
            if (liCount <= maxCount) // 页面上的就是全部
                return;

            if (direct === "left" && liCount - hidCount > maxCount) { // 左边还能藏
                ul.css("margin-left", (0 - (hidCount + 1) * 210) + "px");
            } else if (direct === "right" && hidCount > 0) {
                ul.css("margin-left", (0 - (hidCount - 1) * 210) + "px");
            }
        };
    }

    var left_buttons = $(".left-button");
    var right_buttons = $(".right-button");
    left_buttons[0].onclick = DirectionClick(0, "right");
    right_buttons[0].onclick = DirectionClick(0, "left");
    left_buttons[1].onclick = DirectionClick(1, "right");
    right_buttons[1].onclick = DirectionClick(1, "left");

    function show_preview() {
        $("#video-part-poster").removeClass("show").addClass("hidden");
        $("#video-part-message").removeClass("show").addClass("hidden");
    }

    $("#video-part-poster").click(show_preview);
    $("#video-part-message").click(show_preview);

    var lis = $("li");
    for (var i = lis.length - 1; i >= 0; i--) {
        (function (li) {
            li.mouseover(function () {
                var bros = li.siblings();
                for (var j = bros.length - 1; j >= 0; j--) {
                    $(bros[j]).children(".shade").css("visibility", "visible");
                }
            });
            li.mouseleave(function () {
                var bros = li.siblings();
                for (var j = bros.length - 1; j >= 0; j--) {
                    $(bros[j]).children(".shade").css("visibility", "hidden");
                }
            });
        })($(lis[i]));
    }
};
