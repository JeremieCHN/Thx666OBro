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
