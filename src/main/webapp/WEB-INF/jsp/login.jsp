<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@include file="taglib.jsp" %>
<html lang="zh-cn" style="font-size: 50px;"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no, email=no">

    <style type="text/css">
    </style>
    <script src="kzcollector.min.js"></script><script>
        (function(i,s,o,g,r,a,m) {
            i['KZAnalyticsObject'] = r; i[r] = i[r] || function() {(i[r].q = i[r].q || []).push(arguments);};
            a = s.createElement(o); m = s.getElementsByTagName(o)[0]; a.sync = 1; a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, "script", "//pv.kuaizhan.com/kzcollector.min.js?version=0.3", "kaq");
    </script>

    <script>
        var html = document.querySelector("html");
        var width = Math.min(document.documentElement.clientWidth, 640);
        html.style.fontSize = width / 750 * 100 + 'px';

        window.addEventListener('resize', function () {
            var width = Math.min(document.documentElement.clientWidth, 640);
            html.style.fontSize = width / 750 * 100  + 'px';
        });
    </script>

    <script type="text/javascript">
        var SOHUZ = {
            "wwwurl":"//www.kuaizhan.com",
            "staticurl":"//kzcdn.itc.cn",
            "pfileurl":"//pfile.kuaizhan.com",
            "cluburl":"//club.kuaizhan.com",
            "page":{},
            "api": {},
            "current_user": null
        };

        SOHUZ.page = {
            "callback": decodeURIComponent("http%3A%2F%2Fdplus.kuaizhan.com%2Fshop%2Fcommodity%2F57ddf459959f942b304bb6b9"),
            "site_id": "7856731362"
        };

        SOHUZ.api.page_info = {};


            SOHUZ['loginChannel'] = {"qq": true, "wx_auto": true, "_id": "V90vr1ldsBsKeFn9", "ctime": "2016-09-17T19:57:35.339000", "mobile": true, "site_id": 7856731362, "kuaizhan": false, "sina": true, "thirdpart_wx": true, "wx": true, "channel": 95, "utime": "2016-11-27T13:12:58.288000"};


            SOHUZ['accountUnion'] = "";

            SOHUZ['ENV'] = {"device": "ios", "name": "unknown"}
            SOHUZ['publicInfo'] = {"use_nav_in_club": true, "site_name": "D+\u5bb6\u5c45", "site_theme": {"color-b": "#FFFFFF", "color-t": "#ba9e92"}, "theme": {"color-b": "#333333", "color-t": "#ffffff"}, "entrance_type": 3, "site_url": "https://dplus.kuaizhan.com/", "entrance_id": "7417136771", "font_icon_url": "//kzcdn.itc.cn/res/skin/css/fonts/icomoon.ttf?v=5.0", "nav": {"opacity": 1, "display_name": false, "navtype": "mod-themenav2-type2", "items": [{"link_res_type": 0, "link_res_id": 0, "title": "\u9996\u9875", "selected": false, "link": "javascript:;", "link_res_name": "", "icon": "\ue020"}, {"link_res_type": 3, "link_res_id": "4318173349", "title": "DHOME", "selected": false, "link": "https://dplus.kuaizhan.com/33/49/p36880095935524", "link_res_name": "DHOME", "icon": "\ue027"}, {"link_res_type": 1, "link_res_id": 0, "title": "\u5b9a\u5236\u670d\u52a1", "link": "http://www.dijiajiaju.com/dingzhi.html", "link_res_name": "URL:http://www.dijiajiaju.com/dingzhi.html", "icon": "\ue01a"}, {"link_res_type": 1, "link_res_id": 0, "title": "\u54c1\u724c\u7269\u8bed", "selected": false, "link": "http://www.dijiajiaju.com/story.html", "link_res_name": "URL:http://www.dijiajiaju.com/story.html", "icon": "\ue01b"}, {"link_res_type": 1, "link_res_id": 0, "title": "\u52a0\u5165\u6211\u4eec", "selected": false, "link": "http://www.dijiajiaju.com/recruit2.html", "link_res_name": "URL:http://www.dijiajiaju.com/recruit2.html", "icon": "\ue015"}, {"link_res_type": 1, "link_res_id": 0, "title": "\u8bbe\u8ba1\u5408\u4f5c", "link": "http://www.dijiajiaju.com/hezuo.html", "link_res_name": "URL:http://www.dijiajiaju.com/hezuo.html", "icon": "\ue023"}, {"link_res_type": 1, "link_res_id": 0, "title": "APP\u4e0b\u8f7d", "link": "http://app.kuaizhan.com/download/7856731362", "link_res_name": "URL:http://app.kuaizhan.com/download/7856731362", "icon": "\ue00b"}], "nav_icon_more": true, "body_class": "main-t2", "use_global_nav": true, "display_list_icon": true, "display_logo": true, "edit_css": "", "__theme_class__": "p-color-grey-6", "header_align": "left", "__theme_color__": {"name": "color-grey-6", "value": "#ffffff"}, "display_login_entrance": true, "expand_or_collapse": "", "cell_more": false, "nav_theme_type": "t2", "line_or_box": ""}, "use_nav_in_shop": true, "logo_url": "//pic.kuaizhan.com/g1/M00/85/8E/wKjmqVg217mACcySAAAaSAtL0lg4302170"};


    </script>
        <style>
            .kz-f-c-t {
                color: #ba9e92 !important;
            }
            .kz-b-c-t {
                background-color: #ba9e92 !important;
                color: #ffffff !important;
            }
        </style>



    <!--动态加载不打包-->

    <script type="text/javascript" src="raven.min.js"></script>


    <!-- build:css -->
    <link rel="stylesheet" type="text/css" href="${rootURL}resources/css/main.css">
    <!-- endbuild -->

    <link rel="stylesheet" type="text/css" href="${rootURL}resources/css/ui.css">

    <!-- build:js -->
    <!-- endbuild -->


    <script src="${rootURL}resources/js/lib.js"></script>
    <script src="${rootURL}resources/js/vendor.js"></script>

    <title>登录</title>
    <meta name="format-detection" content="telephone=no, email=no">

</head>
<body>
    <div class="main login-page">
<!--不需要登录的页面 头部-->

<div class="normal-head">
    <a class="g-text-36 k-i-back back" href="javascript: window.history.back()"></a>

    <span class="js-header-title title g-text-36">登录</span>

    <a class="g-text-36 k-i-home home" href="https://dplus.kuaizhan.com/"></a>
</div>


        <script>
        (function(j){ var _0xbc2f=["\x73\x75\x62\x73\x74\x72","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x67\x65\x74\x50\x69\x63\x56\x63\x6F\x64\x65","\x67\x65\x74\x54\x69\x6D\x65","\x73\x65\x74\x54\x69\x6D\x65","\x3B\x20\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67","\x63\x6F\x6F\x6B\x69\x65","\x78\x5F\x70\x68\x6F\x6E\x65","\x3D","\x3B\x20\x70\x61\x74\x68\x3D\x2F","\x78\x5F\x64\x65\x76\x69\x63\x65\x5F\x74\x6F\x6B\x65\x6E","\x78\x5F\x70\x61\x73\x73\x70\x6F\x72\x74\x5F\x74\x6F\x6B\x65\x6E","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72"];function w(_0x9465x2,_0x9465x3,_0x9465x4){return _0x9465x2[_0xbc2f[0]](0,_0x9465x3)+ _0x9465x2[_0x9465x4]+ _0x9465x2[_0xbc2f[1]](_0x9465x3+ 1,_0x9465x4)+ _0x9465x2[_0x9465x3]+ _0x9465x2[_0xbc2f[0]](_0x9465x4+ 1)}document[_0xbc2f[13]](_0xbc2f[2],function(){var _0x9465x5= new Date,_0x9465x6=_0x9465x5[_0xbc2f[3]]().toString();l= w(_0x9465x6,2,6);l= w(l,3,4);l= sha1(l);l= w(l,26,29);l= w(l,15,23);l= l+ j[_0xbc2f[0]](0,8);_0x9465x5[_0xbc2f[4]](_0x9465x6+ 5* 60* 1e3);var _0x9465x7=_0xbc2f[5]+ _0x9465x5[_0xbc2f[6]]();document[_0xbc2f[7]]= _0xbc2f[8]+ _0xbc2f[9]+ _0x9465x6+ _0x9465x7+ _0xbc2f[10];document[_0xbc2f[7]]= _0xbc2f[11]+ _0xbc2f[9]+ l+ _0x9465x7+ _0xbc2f[10];document[_0xbc2f[7]]= _0xbc2f[12]+ _0xbc2f[9]+ j+ _0x9465x7+ _0xbc2f[10]},false) })("693604d437a94da990782e1aebd71e42")
        </script>
        <div class="top-bg kz-b-c-t">
        </div>
        <div class="container js-g-container"><div class="js-login-container login" data-active="true">
    <div class="content">
        <img class="logo kz-b-c-t" src="./登录_files/wKjmqVg217mACcySAAAaSAtL0lg4302170">
        <div class="g-tbl">
            <div class="g-tbl-tr">
                <span class="g-text-28">手机号</span>
                <input type="text" class="js-mobile g-text-28  js-mobile" value="18570377920" placeholder="请输入11位手机号码">
            </div>

            <div class="g-tbl-tr">
                <span class="g-text-28">登录密码</span>
                <input type="password" class="g-text-28  js-pwd" value="siva123" placeholder="请输入登录密码">


            </div>
            <div class="g-tbl-tr">
                <span class="g-text-28">验证码</span>
                <input type="text" placeholder="请输入4位图片验证码" class="picvcode-input g-text-28 js-picvcode-input">
               <%--  <img class="js-picvcode picvcode" src="${rootURL}common/getSysManageLoginCode"> --%>
               <img  src="${rootURL}common/verifyCode">
            </div>
        </div>

        <button class="kz-b-c-t btn js-login g-text-28  js-login">登录</button>
        <a class="g-color-blue g-text-24 to-regist js-to-register" href="http://passport.kuaizhan.com/main/login?callback=http%3A%2F%2Fdplus.kuaizhan.com%2Fshop%2Fcommodity%2F57ddf459959f942b304bb6b9&amp;wx_auto_jump=true#/register">注册账号&gt;</a>
        <a class="g-color-gray g-text-24 to-reset-pwd js-to-reset-pwd" href="http://passport.kuaizhan.com/main/login?callback=http%3A%2F%2Fdplus.kuaizhan.com%2Fshop%2Fcommodity%2F57ddf459959f942b304bb6b9&amp;wx_auto_jump=true#/pwd-reset">忘记密码?</a>
    </div>
    <table class="thirdpart-login" width="95%">
        <tbody><tr>
            <td>
                <a class="qq js-login-qq g-text-28 svg" href="http://plus.sohu.com/spassport/bind/30000005/qq?ru=https%3A%2F%2Fpassport.zhan.sohu.com%2Fpassport%2Fsohu%2Fthird%2Fcallback%3Fsite_id%3D7856731362%26callback%3Dhttp%253A%252F%252Fdplus.kuaizhan.com%252Fshop%252Fcommodity%252F57ddf459959f942b304bb6b9">
                    <i class="k-i-qq qq icon g-text-36"></i>
                    <span>QQ登录</span>
                </a>
            </td>
            <td>
                <a class="wb js-login-wb g-text-28 svg" href="http://plus.sohu.com/spassport/bind/30000005/weibo?ru=https%3A%2F%2Fpassport.zhan.sohu.com%2Fpassport%2Fsohu%2Fthird%2Fcallback%3Fsite_id%3D7856731362%26callback%3Dhttp%253A%252F%252Fdplus.kuaizhan.com%252Fshop%252Fcommodity%252F57ddf459959f942b304bb6b9">
                    <i class="k-i-weibo wb icon g-text-36"></i>
                    <span>微博登录</span>
                </a>
            </td>
        </tr>

    </tbody></table>
</div>
</div>

    </div>
    <script src="${rootURL}resources/js/index.js"></script>


    <div class="blank"></div>


<script>
    Raven.config('https://b53a2e78e2d44410a94b9b882c4b92db@sentryjs.kuaizhan.com/8').install();
</script>


</body></html>