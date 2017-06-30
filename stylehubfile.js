let initStyle = [
    {
        "pattern": "/weibo.com\\/[\\d]+\\/[\\w]+/",
        "styleText": ".WB_frame_b{display:none;}.WB_frame_c{width:100%;}.WB_media_wrap .media_box{float:none;}.WB_h5video{width:100%;height: 0;padding-bottom: 76%;}"
    }, {
        "pattern": "/weibo.com\\/tv\\/v\\/[\\w]+/",
        "styleText": ".weibo_player_fc_v2,.player_switch{display:none!important;}.weibo_player_fb,.weibo_player_fa{width:100%!important;}.weibo_player_fa{width:100%;height: 0!important;padding-bottom: 76%;}"
    }, {
        "pattern": "/www.miaopai.com\\/show\\/[\\w]+/",
        "styleText": ".cotentRight{display:none!important;}.box885{width: 990px!important;}.video_detail .video{height:100%!important;}\n        .contentLeft_detail,.MIAOPAI_player{width:100%!important;}.MIAOPAI_player .video-player{height: 0!important;\n    padding-bottom: 76%;}.video_detail .video{    position: absolute;}.contentLeft,.videoIntr+.video{    position: relative;}"
    }
]