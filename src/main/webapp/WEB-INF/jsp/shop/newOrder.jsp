<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
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
        <title>确认订单</title>

        <script src="./确认订单_files/kzcollector.min.js.下载"></script><script type="text/javascript" async="" src="./确认订单_files/vds.js.下载"></script><script type="text/javascript">
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
    <script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="main-99168a1d9a" src="./确认订单_files/main-99168a1d9a.js.下载"></script><script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="kzsdk" src="./确认订单_files/kzjssdk.js.下载"></script><script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="//api.map.baidu.com/api?v=2.0&amp;ak=2d6bd28bb5f4b4a16a034cf6c061f371&amp;callback=MapCallback&amp;s=1" src="./确认订单_files/api"></script></head>

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
        <div class="kz-sub-title">确认订单</div>

</nav>        

<form  id="saveOrder" action="/buy/saveOrder" method="POST">
<div class="myapp myapp-create-order" data-cid="57ddf459959f942b304bb6b9" data-val="{&quot;wishes&quot;: {&quot;58b2a09b584eda469f4b20c1&quot;: 1, &quot;590348d9d6fefc05cbd9a0d2&quot;: 1}}" data-data="{&quot;need_buyer_mobile&quot;: true, &quot;need_buyer_name&quot;: true, &quot;need_buyer_address&quot;: true}" data-order="{&quot;logistics&quot;: {}, &quot;original_price&quot;: 9499.0, &quot;create_client_ip&quot;: null, &quot;tel&quot;: &quot;18888888888&quot;, &quot;is_distribution&quot;: null, &quot;refund_id&quot;: null, &quot;refund_reject_reason&quot;: null, &quot;payer_name&quot;: null, &quot;current_stage_user_id&quot;: null, &quot;site_id&quot;: 7856731362, &quot;need_invoice&quot;: null, &quot;original_order_id&quot;: null, &quot;shop_id&quot;: &quot;V930WZWflCswS7av&quot;, &quot;current_stage&quot;: null, &quot;freight&quot;: 180.0, &quot;is_supplier&quot;: null, &quot;buyer_settings&quot;: {&quot;need_buyer_mobile&quot;: true, &quot;need_buyer_name&quot;: true, &quot;need_buyer_address&quot;: true}, &quot;message&quot;: &quot;&quot;, &quot;daily_serial_num&quot;: null, &quot;refund_reason&quot;: null, &quot;price_when_score&quot;: 9679.0, &quot;is_closed&quot;: null, &quot;payer_mobile&quot;: null, &quot;shop_tel&quot;: null, &quot;address_geo&quot;: [], &quot;user_id&quot;: &quot;WLKgK03NshiPaOUw&quot;, &quot;groupbuy_id&quot;: null, &quot;payment&quot;: null, &quot;distribution_order_id&quot;: null, &quot;hackday_notify_url&quot;: null, &quot;stage_times&quot;: [], &quot;is_takeout&quot;: null, &quot;is_commented&quot;: null, &quot;refund_state&quot;: null, &quot;refund_reject_time&quot;: null, &quot;is_allow_buy&quot;: true, &quot;type&quot;: null, &quot;price&quot;: 9679.0, &quot;channel&quot;: null, &quot;refund_failed_reason&quot;: null, &quot;score_used&quot;: 0, &quot;name&quot;: &quot;1&quot;, &quot;invoice_type&quot;: null, &quot;is_hackday&quot;: null, &quot;is_passed&quot;: null, &quot;shop_title&quot;: null, &quot;is_groupbuy&quot;: null, &quot;score_after_cash&quot;: 9679, &quot;print_records&quot;: [], &quot;coupon_list&quot;: [], &quot;custom_messages&quot;: {}, &quot;remarks&quot;: [], &quot;wallet_used&quot;: null, &quot;time_of_delivery&quot;: null, &quot;paytime&quot;: null, &quot;utime&quot;: &quot;2017-05-16T22:14:51.414914&quot;, &quot;is_coupon&quot;: null, &quot;invoice_title&quot;: null, &quot;refund_start_time&quot;: null, &quot;ctime&quot;: &quot;2017-05-16T22:14:51.415053&quot;, &quot;refund_finish_time&quot;: null, &quot;is_pure_score&quot;: null, &quot;_id&quot;: null, &quot;states&quot;: [], &quot;off_price&quot;: 0.0, &quot;is_groupbuy_header&quot;: null, &quot;commodities&quot;: [{&quot;coupon_desc&quot;: null, &quot;coupon_end_date&quot;: null, &quot;price&quot;: 2299.0, &quot;can_distribution&quot;: false, &quot;coupon_start_date&quot;: null, &quot;freight&quot;: 110.0, &quot;coupon_id&quot;: null, &quot;coupon_is_booking&quot;: null, &quot;enable_user_purchase_limit&quot;: false, &quot;title&quot;: &quot;D12\u4e28\u732b\u8033\u6905\u00b7\u9910\u6905\u00b7\u4e66\u684c\u6905&quot;, &quot;max_count_of_user_purchase&quot;: -1, &quot;enable_score&quot;: false, &quot;only_use_score&quot;: false, &quot;coupon_enable_refund&quot;: null, &quot;amount&quot;: 1, &quot;models&quot;: {&quot;\u6728\u6750&quot;: &quot;\u9ed1\u80e1\u6843&quot;, &quot;\u578b\u53f7&quot;: &quot;\u5c0f\u732b\u7248&quot;}, &quot;commodity_id&quot;: &quot;V930WZWflCswS7a5&quot;, &quot;coupon_auto_refund&quot;: null, &quot;type&quot;: 100, &quot;avatar&quot;: &quot;http://pic.kuaizhan.com/g2/M00/AE/E8/wKjmqlfjTuCAfogxAASIDqWjyWE0132974&quot;}, {&quot;coupon_desc&quot;: null, &quot;coupon_end_date&quot;: null, &quot;price&quot;: 7200.0, &quot;can_distribution&quot;: false, &quot;coupon_start_date&quot;: null, &quot;freight&quot;: 180.0, &quot;coupon_id&quot;: null, &quot;coupon_is_booking&quot;: null, &quot;enable_user_purchase_limit&quot;: false, &quot;title&quot;: &quot;D90\u4e28\u5199\u5b57\u684c\u00b7\u4e66\u684c&quot;, &quot;max_count_of_user_purchase&quot;: -1, &quot;enable_score&quot;: false, &quot;only_use_score&quot;: false, &quot;coupon_enable_refund&quot;: null, &quot;amount&quot;: 1, &quot;models&quot;: {&quot;\u6728\u6750&quot;: &quot;\u9ed1\u80e1\u6843&quot;}, &quot;commodity_id&quot;: &quot;V-Sf2IgqKmUPKAyh&quot;, &quot;coupon_auto_refund&quot;: null, &quot;type&quot;: 100, &quot;avatar&quot;: &quot;http://pic.kuaizhan.com/g2/M00/AD/31/CgpQVFfjTtaAKyHdAAO9UObTGvk1976885&quot;}], &quot;price_score_equal&quot;: 0.0, &quot;shop_avatar&quot;: null, &quot;current_stage_time&quot;: null, &quot;apply_price&quot;: null, &quot;use_score&quot;: null, &quot;system_remark&quot;: null, &quot;refund_price&quot;: null, &quot;address&quot;: &quot;\u5317\u4eac \u5317\u4eac\u5e02 \u4e1c\u57ce\u533a 111&quot;}" data-shop="{&quot;num_good_comment&quot;: null, &quot;tel&quot;: &quot;18500038388&quot;, &quot;freshness&quot;: 0, &quot;peak_payment&quot;: true, &quot;address&quot;: &quot;\u5317\u4eac \u671d\u9633\u533a&quot;, &quot;site_id&quot;: 7856731362, &quot;verified_stage&quot;: 666, &quot;qq_customer_num&quot;: &quot;76881825&quot;, &quot;keywords&quot;: &quot;&quot;, &quot;full_to_off&quot;: false, &quot;desc&quot;: &quot;&quot;, &quot;announcement_style&quot;: null, &quot;announcement&quot;: &quot;&quot;, &quot;close_time&quot;: null, &quot;open_time&quot;: null, &quot;average_consumption&quot;: null, &quot;title&quot;: &quot;D+\u5bb6\u5c45&quot;, &quot;detailed_address&quot;: null, &quot;verification_id&quot;: &quot;WGDFFFhO2nDDsVcQ&quot;, &quot;categories&quot;: [], &quot;enable_qq_customer_service&quot;: true, &quot;type&quot;: 1, &quot;city_code&quot;: 2004, &quot;alipay_payment&quot;: false, &quot;cover_style&quot;: 2, &quot;sort_weight&quot;: 0, &quot;wx_payment&quot;: false, &quot;is_certificated&quot;: false, &quot;num_bad_comment&quot;: null, &quot;boss&quot;: &quot;&quot;, &quot;is_default&quot;: null, &quot;total_delivery_score&quot;: null, &quot;verified_type&quot;: 2, &quot;total_commodity_score&quot;: null, &quot;is_online&quot;: true, &quot;geo&quot;: [], &quot;num_soso_comment&quot;: null, &quot;utime&quot;: &quot;2017-03-14T15:50:27.271000&quot;, &quot;province_code&quot;: 2, &quot;paid_orders_count&quot;: 0, &quot;ctime&quot;: &quot;2016-09-18T09:56:41.139000&quot;, &quot;sales_volume&quot;: 1, &quot;_id&quot;: &quot;V930WZWflCswS7av&quot;, &quot;cover&quot;: &quot;//pic.kuaizhan.com/g2/M01/82/15/CgpQVFjHoLaAE70mAAsOLTVDXzs3347519&quot;, &quot;disable_bottom_navbar&quot;: null, &quot;delivery_free&quot;: false, &quot;avatar&quot;: &quot;//pic.kuaizhan.com/g2/M00/83/CC/wKjmqljHoKOABdf0AAF2YfR6-143600326&quot;, &quot;layout_commodities&quot;: 3, &quot;gross_earnings&quot;: 70400, &quot;num_comment&quot;: null, &quot;is_recommended&quot;: false, &quot;hotness&quot;: 0, &quot;cash_on_delivery&quot;: false, &quot;disable_announcement&quot;: null}" data-is-groupbuy="false" data-is-distributional="false">
    <div class="info-wrp"><div class="address-wrp">
    <div class="icon-location "></div>
    <div class="content">
        <div class="row">
            <div class="name">1</div><div class="tel">18888888888</div>
        </div>
            <div class="row adr">北京北京市东城区111</div>
    </div>
</div>
<div class="icon-enter"></div>
<div class="bottom-bg"></div></div>

    <div class="buyer-wrp">
    </div>



    <div class="custom-msg-wrp">
    </div>


    <div class="order-wrp">
        <a href="javascript:;" data-href="/shop/shops/V930WZWflCswS7av/jump-to">
            <div class="order-header">
                <span class="icon-header"></span>
                <span class="title">D+家居</span>
                <span class="icon-enter"></span>
            </div>
        </a>
        <div class="container">
            <div class="commodity-list">
                <div class="commodity-item clearfix" data-role="commodity-item">
                    <div class="pic">
                        <img src="./确认订单_files/152x152">
                        <!-- 优惠券商品 -->
                        <!-- 拼团商品 -->
                        <!-- 积分商品 -->
                    </div>
                    <div class="commodity-item-info">
                        <div class="name">D12丨猫耳椅·餐椅·书桌椅</div>
                        <div class="price">¥2299</div>
                        <div class="amount">X1</div>
                        <div class="models">
                        木材:黑胡桃；型号:小猫版
                        </div>
                    </div>

                </div>
                <div class="commodity-item clearfix" data-role="commodity-item">
                    <div class="pic">
                        <img src="./确认订单_files/152x152(1)">
                        <!-- 优惠券商品 -->
                        <!-- 拼团商品 -->
                        <!-- 积分商品 -->
                    </div>
                    <div class="commodity-item-info">
                        <div class="name">D90丨写字桌·书桌</div>
                        <div class="price">¥7200</div>
                        <div class="amount">X1</div>
                        <div class="models">
                        木材:黑胡桃
                        </div>
                    </div>

                </div>
            </div>

            <div class="freight-wrp clearfix">
                <label class="label">运费</label>
                <span class="price">¥180</span>

            </div>

            <div class="message-wrp clearfix">
                <label class="label">给卖家留言</label>
                <span class="message"></span>
                <span class="icon-enter"></span>
            </div>

            <div class="allprice">
                <span>共<i class="num">2</i>件商品</span>,<span>合计</span>
                <b class="price">¥<em class="int">9679</em>.<span class="decimal">00</span></b>
            </div>
        </div>
    </div>
    <div class="kz_agreement f-0">
                <span>卖家已开启“第三方支付” </span><span class="und f-24">点此了解更多电商内容</span>
    </div>


    <div class="bottom-wrp clearfix">
        <div class="btn-pay">提交订单</div>
        <div class="price-all">
            <span>合计</span>
            <b class="price">¥<em class="int">9679</em>.<span class="decimal">00</span></b>
        </div>
    </div>
</div>
</form>
        <script src="./确认订单_files/lib-cca36f8c72.js.下载"></script>

        <script src="./确认订单_files/raven.min.js.下载"></script>
        
        <script data-main="/shop/scripts/main-99168a1d9a.js" src="./确认订单_files/require.js.下载"></script>

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
            <div class="avatar " data-role="jump-to-personal"><img src="./确认订单_files/128x128"></div>
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
<div class="zyl-areachoice">                            <div class="zyl-areachoice-header">                                <div class="zyl-areachoice-close">取消</div>                                <div class="zyl-areachoice-confirm">确认</div>                                <div class="zyl-areachoice-text">请选择地址</div>                            </div>                            <div class="zyl-areachoice-main">                                <div class="zyl-areachoice-row zyl-areachoice-row-p"><div class="zyl-areachoice-item">北京</div><div class="zyl-areachoice-item">天津</div><div class="zyl-areachoice-item">河北</div><div class="zyl-areachoice-item">山西</div><div class="zyl-areachoice-item">内蒙古</div><div class="zyl-areachoice-item">辽宁</div><div class="zyl-areachoice-item">吉林</div><div class="zyl-areachoice-item">黑龙江</div><div class="zyl-areachoice-item">上海</div><div class="zyl-areachoice-item">江苏</div><div class="zyl-areachoice-item">浙江</div><div class="zyl-areachoice-item">安徽</div><div class="zyl-areachoice-item">福建</div><div class="zyl-areachoice-item">江西</div><div class="zyl-areachoice-item">山东</div><div class="zyl-areachoice-item">河南</div><div class="zyl-areachoice-item">湖北</div><div class="zyl-areachoice-item">湖南</div><div class="zyl-areachoice-item">广东</div><div class="zyl-areachoice-item">广西</div><div class="zyl-areachoice-item">海南</div><div class="zyl-areachoice-item">重庆</div><div class="zyl-areachoice-item">四川</div><div class="zyl-areachoice-item">贵州</div><div class="zyl-areachoice-item">云南</div><div class="zyl-areachoice-item">西藏</div><div class="zyl-areachoice-item">陕西</div><div class="zyl-areachoice-item">甘肃</div><div class="zyl-areachoice-item">青海</div><div class="zyl-areachoice-item">宁夏</div><div class="zyl-areachoice-item">新疆</div><div class="zyl-areachoice-item">香港</div><div class="zyl-areachoice-item">澳门</div><div class="zyl-areachoice-item">台湾</div><div class="zyl-areachoice-item">国外</div></div>                                <div class="zyl-areachoice-row zyl-areachoice-row-n"></div>                                <div class="zyl-areachoice-row zyl-areachoice-row-a"></div>                            </div>                            <div class="zyl-areachoice-midline"></div>                            <div class="zyl-areachoice-mask">                                 <div class="zyl-swipe-row" data-role="zyl-areachoice-row-p"></div>                                <div class="zyl-swipe-row" data-role="zyl-areachoice-row-n"></div>                                <div class="zyl-swipe-row" data-role="zyl-areachoice-row-a"></div>                            </div>                            </div><div class="myapp app-add-position-utils">
    <div class="header common-header clearfix">
        <div class="icon-return"></div>
        <div class="serchwrp">
            <div class="icon-serch"></div>
            <input data-role="map_serch" placeholder="小区/写字楼/学校等">
        </div>
        <div class="btn-serch">搜索</div>
    </div>

    <div id="baidu-map"></div>
    <div class="row">
        <div class="icon-pointer"></div>
        <div class="label">当前位置：</div>
        <div class="text" data-role="mypointer_text">请选择</div>
    </div>

    <div class="btn-confirm">确认</div>
</div><div class="myapp app-add-address-utils">
    <div class="header common-header">
        <div class="icon-return"></div>
        添加收货地址
        <!--<div class="more"></div>-->
    </div>
    <div class="setting-list" data-address-type="0">
        <div class="row">
            <div class="title">收件人</div>
            <div class="input">
                <input data-role="name" placeholder="请输入姓名">
            </div>
        </div>
        <div class="row">
            <div class="title">联系电话</div>
            <div class="input">
                <input data-role="mobile" placeholder="请输入手机号">
            </div>
        </div>
        <div class="row">
            <div class="title">所在地区</div>
            <div class="input area">
                <input data-role="area_holder" placeholder="选择省份\城市\区县" readonly="readonly">
                <span data-role="area"></span>
            </div>
        </div>
        <div class="row">
            <div class="title">所在地址</div>
            <textarea data-role="detail" class="shop-address-detail" placeholder="详细地址（如所在地区不准确，请补全）"></textarea>
        </div>
    </div>
    <div class="defaut">
        <div class="sui-choice" data-role="set_default"></div>
        <div class="text">设为默认地址</div>
    </div>

    <div class="btn-new-address">保存</div>

</div><div class="myapp app-edit-message">
    <div class="content">
        <textarea placeholder="请输入不超过50个字"></textarea>
    </div>
    <div class="btn-confirm">确定</div>

</div><script src="./确认订单_files/getscript"></script><div class="myapp app-choice-address">
    <div class="header common-header">
        <div class="icon-return"></div>
        选择收货地址
    </div>
    <div class="address-list">
                <a class="item hover" href="javascript:;" data-id="WQhcIFhO2lgSdD_I" data-val="{&quot;province&quot;:&quot;北京&quot;,&quot;geo_address&quot;:null,&quot;user_id&quot;:&quot;WLKgK03NshiPaOUw&quot;,&quot;ctime&quot;:&quot;2017-05-02T18:14:56.939000&quot;,&quot;district&quot;:&quot;东城区&quot;,&quot;province_code&quot;:1,&quot;mobile&quot;:&quot;18888888888&quot;,&quot;geo&quot;:[],&quot;utime&quot;:&quot;2017-05-02T18:14:56.939000&quot;,&quot;detail&quot;:&quot;111&quot;,&quot;is_default&quot;:true,&quot;postcode&quot;:null,&quot;district_code&quot;:1,&quot;_id&quot;:&quot;WQhcIFhO2lgSdD_I&quot;,&quot;type&quot;:0,&quot;city&quot;:&quot;北京市&quot;,&quot;city_code&quot;:1,&quot;name&quot;:&quot;1&quot;}">
                    <div class="item-wrp">
                        <div class="choice-address"></div>
                        <div class="row">
                            <div class="content clearfix"><div class="name">1</div> <div class="tel">18888888888</div></div>
                        </div>
                        <div class="row">
                            <div class="content">
                                <span class="default">[默认]</span>
                                
                                北京北京市东城区111
                            </div>
                        </div>
                    </div>
                    <div class="del-wrp">
                        <span>删除</span>
                    </div>
                </a>
    </div>
    <a class="btn-new-address btn-red f-bold" href="javascript:;"><span>添加新地址</span></a>
    
    <script>
    $(".btn-pay").click(function(){
    	/* $.ajax({url:'/buy/saveOrder',
    	data:{payMoney:'12'},
    	success:function(){
    		 $('#iosDialog1').fadeIn(200);
    	}
    	
    	}); */
    	$("#saveOrder").submit();
    	
    });
    
    
    </script>
</div>

 <<!-- div id="dialogs">
        BEGIN dialog1
        <div class="js_dialog" id="iosDialog1" style="display: none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">弹窗标题</strong></div>
                <div class="weui-dialog__bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">辅助操作</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">主操作</a>
                </div>
            </div>
        </div>
 -->

</body></html>