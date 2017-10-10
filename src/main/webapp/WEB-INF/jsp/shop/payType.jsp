<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<!-- saved from url=(0109)https://dplus.kuaizhan.com/shop/shops/57ddf459959f942b304bb6af/order-pay/20170530224304425149?wx_native=false -->
<html style="font-size: 48px;"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1">
        <meta name="format-detection" content="telephone=no">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <link rel="shortcut icon" type="image/x-icon" href="http://kzcdn.itc.cn/res/homepage/favicon.ico">

 
        
        <link rel="stylesheet" href="${rootURL}/resources/css/main-f05f544147.css">
        <link rel="stylesheet" href="${rootURL}/resources/css/swiper.min.css">
        <script type="text/javascript" src="${rootURL}/resources/jquery/jquery-1.10.2.js"></script>
        <title>订单支付</title>

        <script src="./订单支付_files/kzcollector.min.js.下载"></script><script type="text/javascript" async="" src="./订单支付_files/vds.js.下载"></script><script type="text/javascript">
            var SOHUZ = {"wwwurl":"//www.kuaizhan.com","staticurl":"//kzcdn.itc.cn","pfileurl":"//pfile.kuaizhan.com","cluburl":"//club.kuaizhan.com","page":{}, "api": {}};

            SOHUZ.page.site_id='7856731362';
            SOHUZ.page.shop_id='57ddf459959f942b304bb6af';

        </script>

        <script type="text/javascript">
            var _vds = _vds || [];
            window._vds = _vds;
            (function(){
                _vds.push(['setAccountId', '9943039a9dbce654']);
                (function() {
                    var vds = document.createElement('script');
                    vds.type='text/javascript';
                    vds.async = true;
                    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(vds, s);
                })();
            })();
        </script>
    <script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="main-1b7c5f157c" src="./订单支付_files/main-1b7c5f157c.js.下载"></script><script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="kzsdk" src="./订单支付_files/kzjssdk.js.下载"></script></head>

    <body>
        <script type="text/javascript">
            // 屏幕宽度大于480被认为是pc
            var width = document.body.clientWidth;
            var fs = width/10 > 48 ? 48 : width/10;
            document.getElementsByTagName('html')[0].style.fontSize = fs + 'px';
            console.log(fs);
        </script>
        <script>
            SOHUZ.page.is_shop_verified = true;
        </script>
        <!-- 统一头部 是否在电商开启头部 (kuaizhan app 中 browser_env_type为2: ios,3: android) 店铺未审核页面没有传header_info -->
            <script>
            SOHUZ.page.is_kz_header_used = true;
                SOHUZ.page.current_user = {
                    nick :  '手机用户7920',
                    avatar : 'http://pic.kuaizhan.com/g2/M00/51/87/CgpQVFeN_NOAJozEAAEsM98TPJE060.png/imageView/v1/thumbnail/128x128',
                    birthday : '',
                    sex : (function(){
                        if('None' == 'M'){
                            return '男';
                        }else if('None' == 'F'){
                            return '女';
                        }else{
                            return '';
                        }
                    })()
                }
            </script>
<nav class="kz-header " data-val="{&quot;use_nav_in_club&quot;: true, &quot;site_name&quot;: &quot;D+\u5bb6\u5c45&quot;, &quot;site_theme&quot;: {&quot;color-b&quot;: &quot;#FFFFFF&quot;, &quot;color-t&quot;: &quot;#ba9e92&quot;}, &quot;font_icon_url&quot;: &quot;//kzcdn.itc.cn/res/skin/css/fonts/icomoon.ttf?v=5.0&quot;, &quot;site_url&quot;: &quot;https://dplus.kuaizhan.com/&quot;, &quot;entrance_id&quot;: &quot;7417136771&quot;, &quot;theme&quot;: {&quot;color-b&quot;: &quot;#333333&quot;, &quot;color-t&quot;: &quot;#ffffff&quot;}, &quot;nav&quot;: {&quot;opacity&quot;: 1, &quot;line_or_box&quot;: &quot;&quot;, &quot;display_name&quot;: false, &quot;navtype&quot;: &quot;mod-themenav2-type2&quot;, &quot;items&quot;: [{&quot;link_res_type&quot;: 0, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u9996\u9875&quot;, &quot;selected&quot;: false, &quot;link&quot;: &quot;javascript:;&quot;, &quot;link_res_name&quot;: &quot;&quot;, &quot;icon&quot;: &quot;\ue020&quot;}, {&quot;link_res_type&quot;: 3, &quot;link_res_id&quot;: &quot;4318173349&quot;, &quot;title&quot;: &quot;DHOME&quot;, &quot;selected&quot;: false, &quot;link&quot;: &quot;https://dplus.kuaizhan.com/33/49/p36880095935524&quot;, &quot;link_res_name&quot;: &quot;DHOME&quot;, &quot;icon&quot;: &quot;\ue027&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u5b9a\u5236\u670d\u52a1&quot;, &quot;link&quot;: &quot;http://www.dijiajiaju.com/dingzhi.html&quot;, &quot;link_res_name&quot;: &quot;URL:http://www.dijiajiaju.com/dingzhi.html&quot;, &quot;icon&quot;: &quot;\ue01a&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u54c1\u724c\u7269\u8bed&quot;, &quot;selected&quot;: false, &quot;link&quot;: &quot;http://www.dijiajiaju.com/story.html&quot;, &quot;link_res_name&quot;: &quot;URL:http://www.dijiajiaju.com/story.html&quot;, &quot;icon&quot;: &quot;\ue01b&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u52a0\u5165\u6211\u4eec&quot;, &quot;selected&quot;: false, &quot;link&quot;: &quot;http://www.dijiajiaju.com/recruit2.html&quot;, &quot;link_res_name&quot;: &quot;URL:http://www.dijiajiaju.com/recruit2.html&quot;, &quot;icon&quot;: &quot;\ue015&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u8bbe\u8ba1\u5408\u4f5c&quot;, &quot;link&quot;: &quot;http://www.dijiajiaju.com/hezuo.html&quot;, &quot;link_res_name&quot;: &quot;URL:http://www.dijiajiaju.com/hezuo.html&quot;, &quot;icon&quot;: &quot;\ue023&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;APP\u4e0b\u8f7d&quot;, &quot;link&quot;: &quot;http://app.kuaizhan.com/download/7856731362&quot;, &quot;link_res_name&quot;: &quot;URL:http://app.kuaizhan.com/download/7856731362&quot;, &quot;icon&quot;: &quot;\ue00b&quot;}], &quot;nav_icon_more&quot;: true, &quot;body_class&quot;: &quot;main-t2&quot;, &quot;use_global_nav&quot;: true, &quot;display_list_icon&quot;: true, &quot;display_logo&quot;: true, &quot;edit_css&quot;: &quot;&quot;, &quot;__theme_class__&quot;: &quot;p-color-grey-6&quot;, &quot;header_align&quot;: &quot;left&quot;, &quot;__theme_color__&quot;: {&quot;name&quot;: &quot;color-grey-6&quot;, &quot;value&quot;: &quot;#ffffff&quot;}, &quot;guid&quot;: &quot;HEADER_ca816f6f-7368-2558-3b90-022660b79939&quot;, &quot;expand_or_collapse&quot;: &quot;&quot;, &quot;cell_more&quot;: false, &quot;nav_theme_type&quot;: &quot;t2&quot;, &quot;display_login_entrance&quot;: true}, &quot;use_nav_in_shop&quot;: true, &quot;entrance_type&quot;: 3, &quot;logo_url&quot;: &quot;//pic.kuaizhan.com/g1/M01/09/E9/wKjmqVjvSJmAEaRTAAAegXOacTA2779670&quot;, &quot;is_published&quot;: true}" data-role="kz-header" style="background-color: #ba9e92; color: #FFFFFF">
    <!-- 不是店铺首页时显示返回按钮 -->
    <div class="kz-header-return"></div>

    <div class="more" data-role="kz-header-more"></div>
        <div class="logo" data-role="jump-to-home" style="background-image: url( //pic.kuaizhan.com/g2/M00/83/CC/wKjmqljHoKOABdf0AAF2YfR6-143600326 ); background-size: 100% 100%;"></div>
        <div class="kz-sub-title">订单支付</div>

</nav>        
<div class="myapp myapp-order-pay" data-is-distributional="False">
    <div style="display:none" class="js-wx-openid">None</div>

    <div class="pay-title">
        <span class="label">订单金额</span>
        <span class="price"><i>￥</i>${order.orderMoney}</span>
    </div>

    <div class="score_get">完成在线支付将获得<span class="price">8040</span>个积分</div>


    <div class="pay-wrp">
        <div class="pay-header">请选择支付方式
            <span class="price"><i>￥</i>${order.payMoney}</span>
        </div>
        <div class="pay-list" data-is-peak="True">
                <div class="item alipay_peak">
                    <div class="pic"></div>
                    <div class="content">
                        <div class="name">支付宝支付</div>
                        <div class="tip">推荐有支付宝账号的买家使用</div>
                    </div>
                </div>
                <div class="item wechat_peak">
                    <div class="pic"></div>
                    <div class="content">
                        <div class="name">微信支付</div>
                        <div class="tip">推荐安装微信5.0及以上版本的买家使用</div>
                    </div>
                </div>

        </div>
    </div>
    <div class="wxpay-code">
        <p class="f14" style="margin-bottom: 12px;">微信扫码支付</p>
        <p class="f12" style="margin-bottom: 10px;">遇到不允许跨号支付？</p>
        <div class="wxpay-img"></div>
        <p class="f13" style="margin-top: 15px;">长按图片【识别二维码】付款</p>
    </div>

    <div class="wx-qrcode-wrp">
        <div class="qrcode">
            <img class="wxqrimg" src="https://dplus.kuaizhan.com/shop/shops/57ddf459959f942b304bb6af/order-pay/20170530224304425149?wx_native=false">
        </div>
        <div class="text">请保存图片用微信扫码支付</div>
        <div class="jump-to-wechat" style="display:none" data-role="jump-to-wechat">保存二维码并打开微信扫码</div>
    </div>

    <div class="alipay-wrp">
        <div class="bg"></div>
        <div class="pic"></div>
        <div class="text">
            <p>请点击右上角</p>
            <p>用Safari或其他浏览器打开支付</p>
        </div>
    </div>
</div>


        <script src="./订单支付_files/lib-b86dc891f3.js.下载"></script>

        <script src="./订单支付_files/raven.min.js.下载"></script>
        
        <script data-main="/shop/scripts/main-1b7c5f157c.js" src="./订单支付_files/require.js.下载"></script>

        <script>
            (function(i,s,o,g,r,a,m) {
                i['KZAnalyticsObject'] = r; i[r] = i[r] || function() {(i[r].q = i[r].q || []).push(arguments);};
                a = s.createElement(o); m = s.getElementsByTagName(o)[0]; a.sync = 1; a.src = g;
                m.parentNode.insertBefore(a, m);
            })(window, document, "script", "//pv.kuaizhan.com/kzcollector.min.js?0.3", "kaq");

                kaq('create', '7856731362');
                kaq('set', 'traceKey', '57ddf459959f942b304bb6af');
                kaq('set', 'pageType', 102);
                kaq('set', 'shopType', '1');
                kaq('send', 'pageview');
                kaq('send', 'timing', 5);
        </script>
        <!--前端监控-->
        <script>
            Raven.config('https://f6c5154ca6424bad8d82d74bfabd9409@sentryjs.kuaizhan.com/6').install();
        </script>
    


<div id="slider" class="slider kz-header-slider">
    <div class="info-wrp" style="background-color: #ba9e92; color: #FFFFFF">
        <div class="info">
            <div class="avatar " data-role="jump-to-personal"><img src="./订单支付_files/128x128"></div>
            <div class="detail">
                <span class="nick">手机用户7920</span>
                <span></span>
                
            </div>
        </div>
    </div>
    <ul class="list">
        <li class="item index">
            <a href="https://dplus.kuaizhan.com/">
                <div class="icon kz-icon-shop"></div>
                <div class="text">首页</div>
            </a>
        </li>
        <li class="item index">
            <a href="https://dplus.kuaizhan.com/clubv2/me/notices">
                <div class="icon kz-icon-remind"></div>
                <div class="text">提醒</div>
            </a>
        </li>
        <li class="item my">
            <a href="http://dplus.kuaizhan.com/auth/me?site_id=7856731362">
                <div class="icon kz-icon-me"></div>
                <div class="text">我的</div>
            </a>
        </li>
        <li class="item share">
            <div class="icon kz-icon-share"></div>
            <div class="text">分享</div>
        </li>
    </ul>

    <ul class="list list-shop">
        <li class="item shopinfo">
            <a href="https://dplus.kuaizhan.com/shop/shops/57ddf459959f942b304bb6af/describe">
                <div class="icon kz-icon-intro"></div>
                <div class="text">店铺简介</div>
            </a>
        </li>
        <li class="item buycar">
            <a href="https://dplus.kuaizhan.com/shop/shops/57ddf459959f942b304bb6af/buyer-wishes">
                <div class="icon kz-icon-cart"></div>
                <div class="text">购物车</div>
            </a>
        </li>
    </ul>
    <div class="smask"></div>
    

   
  
</div>

<spring:message  code="shopingCar" />



<script>
$(".wechat_peak").click(function(){
	$.ajax({url:'paytest3',
	success:function(){
		alert("xx");
	}		
	}
	);
});


</script>
</body></html>