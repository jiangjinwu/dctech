<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../taglib.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1">
<title>Insert title here</title>
<link rel="stylesheet" href="${rootURL}resources/css/styles.css" >
	<link rel="stylesheet" type="text/css" href="${rootURL}resources/css/weui/weui.css" >
<style type="text/css">

.myapp-buyerwishes .shop-title {
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #272727;
    padding: 0 12px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
}

.myapp-buyerwishes .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    background: #ebebeb;
    border-top: 1px solid #ddd;
}

bottom .btn-buy {
    height: 49px;
    line-height: 49px;
    top: -1px;
}
</style>

<script type="text/javascript" src="${rootURL}resources/jquery/jquery-1.10.2.js"></script>
</head>
<body>
<nav class="kz-header " data-val="{&quot;use_nav_in_club&quot;: true, &quot;site_name&quot;: &quot;D+\u5bb6\u5c45&quot;, &quot;site_theme&quot;: {&quot;color-b&quot;: &quot;#FFFFFF&quot;, &quot;color-t&quot;: &quot;#ba9e92&quot;}, &quot;font_icon_url&quot;: &quot;//kzcdn.itc.cn/res/skin/css/fonts/icomoon.ttf?v=5.0&quot;, &quot;site_url&quot;: &quot;https://dplus.kuaizhan.com/&quot;, &quot;entrance_id&quot;: &quot;7417136771&quot;, &quot;theme&quot;: {&quot;color-b&quot;: &quot;#333333&quot;, &quot;color-t&quot;: &quot;#ffffff&quot;}, &quot;nav&quot;: {&quot;opacity&quot;: 1, &quot;display_name&quot;: false, &quot;navtype&quot;: &quot;mod-themenav2-type2&quot;, &quot;items&quot;: [{&quot;link_res_type&quot;: 0, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u9996\u9875&quot;, &quot;selected&quot;: false, &quot;link&quot;: &quot;javascript:;&quot;, &quot;link_res_name&quot;: &quot;&quot;, &quot;icon&quot;: &quot;\ue020&quot;}, {&quot;link_res_type&quot;: 3, &quot;link_res_id&quot;: &quot;4318173349&quot;, &quot;title&quot;: &quot;DHOME&quot;, &quot;selected&quot;: false, &quot;link&quot;: &quot;https://dplus.kuaizhan.com/33/49/p36880095935524&quot;, &quot;link_res_name&quot;: &quot;DHOME&quot;, &quot;icon&quot;: &quot;\ue027&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u5b9a\u5236\u670d\u52a1&quot;, &quot;link&quot;: &quot;http://www.dijiajiaju.com/dingzhi.html&quot;, &quot;link_res_name&quot;: &quot;URL:http://www.dijiajiaju.com/dingzhi.html&quot;, &quot;icon&quot;: &quot;\ue01a&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u54c1\u724c\u7269\u8bed&quot;, &quot;selected&quot;: false, &quot;link&quot;: &quot;http://www.dijiajiaju.com/story.html&quot;, &quot;link_res_name&quot;: &quot;URL:http://www.dijiajiaju.com/story.html&quot;, &quot;icon&quot;: &quot;\ue01b&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u52a0\u5165\u6211\u4eec&quot;, &quot;selected&quot;: false, &quot;link&quot;: &quot;http://www.dijiajiaju.com/recruit2.html&quot;, &quot;link_res_name&quot;: &quot;URL:http://www.dijiajiaju.com/recruit2.html&quot;, &quot;icon&quot;: &quot;\ue015&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;\u8bbe\u8ba1\u5408\u4f5c&quot;, &quot;link&quot;: &quot;http://www.dijiajiaju.com/hezuo.html&quot;, &quot;link_res_name&quot;: &quot;URL:http://www.dijiajiaju.com/hezuo.html&quot;, &quot;icon&quot;: &quot;\ue023&quot;}, {&quot;link_res_type&quot;: 1, &quot;link_res_id&quot;: 0, &quot;title&quot;: &quot;APP\u4e0b\u8f7d&quot;, &quot;link&quot;: &quot;http://app.kuaizhan.com/download/7856731362&quot;, &quot;link_res_name&quot;: &quot;URL:http://app.kuaizhan.com/download/7856731362&quot;, &quot;icon&quot;: &quot;\ue00b&quot;}], &quot;nav_icon_more&quot;: true, &quot;body_class&quot;: &quot;main-t2&quot;, &quot;use_global_nav&quot;: true, &quot;display_list_icon&quot;: true, &quot;display_logo&quot;: true, &quot;edit_css&quot;: &quot;&quot;, &quot;__theme_class__&quot;: &quot;p-color-grey-6&quot;, &quot;header_align&quot;: &quot;left&quot;, &quot;__theme_color__&quot;: {&quot;name&quot;: &quot;color-grey-6&quot;, &quot;value&quot;: &quot;#ffffff&quot;}, &quot;line_or_box&quot;: &quot;&quot;, &quot;expand_or_collapse&quot;: &quot;&quot;, &quot;cell_more&quot;: false, &quot;nav_theme_type&quot;: &quot;t2&quot;, &quot;display_login_entrance&quot;: true}, &quot;use_nav_in_shop&quot;: true, &quot;entrance_type&quot;: 3, &quot;logo_url&quot;: &quot;//pic.kuaizhan.com/g1/M00/85/8E/wKjmqVg217mACcySAAAaSAtL0lg4302170&quot;}" data-role="kz-header" style="background-color: #ba9e92; color: #FFFFFF">
    <!-- 不是店铺首页时显示返回按钮 -->
    <div class="kz-header-return"></div>

    <div class="more" data-role="kz-header-more"></div>
        <div class="logo" data-role="jump-to-home" style="background-image: url( http://pic.kuaizhan.com/g2/M01/19/85/wKjmqlgS-HKAfCCVAAAU6DJA5bE3682022 ); background-size: 100% 100%;"></div>
        <div class="kz-sub-title">购物车</div>

</nav>

<div class="myapp myapp-buyerwishes" data-shop="{&quot;num_good_comment&quot;: null, &quot;tel&quot;: &quot;18500038388&quot;, &quot;freshness&quot;: 0, &quot;is_default&quot;: null, &quot;address&quot;: &quot;\u5317\u4eac \u671d\u9633\u533a&quot;, &quot;site_id&quot;: 7856731362, &quot;verified_stage&quot;: 666, &quot;qq_customer_num&quot;: &quot;76881825&quot;, &quot;keywords&quot;: &quot;&quot;, &quot;full_to_off&quot;: false, &quot;desc&quot;: &quot;&quot;, &quot;announcement_style&quot;: null, &quot;announcement&quot;: &quot;&quot;, &quot;close_time&quot;: null, &quot;open_time&quot;: null, &quot;average_consumption&quot;: null, &quot;title&quot;: &quot;D+\u5bb6\u5c45&quot;, &quot;detailed_address&quot;: null, &quot;verification_id&quot;: &quot;WGDFFFhO2nDDsVcQ&quot;, &quot;categories&quot;: [], &quot;enable_qq_customer_service&quot;: true, &quot;type&quot;: 1, &quot;city_code&quot;: 2004, &quot;alipay_payment&quot;: false, &quot;sort_weight&quot;: 0, &quot;peak_payment&quot;: true, &quot;wx_payment&quot;: false, &quot;is_certificated&quot;: false, &quot;num_bad_comment&quot;: null, &quot;boss&quot;: &quot;&quot;, &quot;cover_style&quot;: 2, &quot;total_delivery_score&quot;: null, &quot;verified_type&quot;: 2, &quot;total_commodity_score&quot;: null, &quot;is_online&quot;: true, &quot;geo&quot;: [], &quot;num_soso_comment&quot;: null, &quot;utime&quot;: &quot;2016-11-10T14:01:33.652000&quot;, &quot;province_code&quot;: 2, &quot;paid_orders_count&quot;: 0, &quot;ctime&quot;: &quot;2016-09-18T09:56:41.139000&quot;, &quot;sales_volume&quot;: 1, &quot;_id&quot;: &quot;V930WZWflCswS7av&quot;, &quot;cover&quot;: &quot;http://pic.kuaizhan.com/g1/M00/A2/69/CgpQU1fdJpaAdKpdAAjMktVWYlM0342751&quot;, &quot;disable_bottom_navbar&quot;: null, &quot;delivery_free&quot;: false, &quot;avatar&quot;: &quot;http://pic.kuaizhan.com/g2/M01/19/85/wKjmqlgS-HKAfCCVAAAU6DJA5bE3682022&quot;, &quot;layout_commodities&quot;: 3, &quot;gross_earnings&quot;: 70400, &quot;num_comment&quot;: null, &quot;is_recommended&quot;: false, &quot;hotness&quot;: 0, &quot;cash_on_delivery&quot;: false, &quot;disable_announcement&quot;: null}">
           
           <form id="orderForm" action="newOrder">
            <div class="wishes-list" data-id="V930WZWflCswS7av">
                <div class="shop-title">
                    <div class="choice-all">
                        <div class="choice"></div>
                    </div>
                    <span>D+家居</span>
                    <span class="edit">编辑</span>
                    <span class="edit-finish">完成</span>
                </div>
                <div class="item  clearfix" data-id="58b2a09b584eda469f4b20c1" data-now_unit_price="2299.0" data-now_amount="50">
                
                
                <c:forEach var="cart" items="${cartList }">
                    <div class="item-wrp clearfix">
                       <div ><input class="weui-check" type="checkbox">  <i class="weui-icon-checked"></i></div>
                       
                        <div class="icon-error"></div>
                        <div class="pic">
                            <img src="./购物车_files/wKjmqlfjTuCAfogxAASIDqWjyWE0132974">
                        </div>
                        <div class="title">${cart.goods.name}</div>
                        <div class="price" data-price="2299.0">¥${cart.goods.price}</div>
                        <div class="num" data-amount="1">X${cart.buyNum}</div>
                        <div class="num-box clearfix">
                            <div class="less disable"><span></span></div>
                            <div class="cur">
                                <div class="cur-wrp">1</div>
                            </div>
                            <div class="add "><span></span></div>
                        </div>
                        <div class="model">
                        木材:黑胡桃; 型号:小猫版</div>

                        <div class="error-text"></div>
                    </div>
                    </c:forEach>
                    <div class="btn-del-item"><span>删除</span></div>
                </div>

            </div>
</form>
    <div class="bottom">
        <div class="all-price">
            <div class="all">合计:</div>
            <div class="price">¥0</div>
        </div>
        <div class="btn-del f-bold">删除</div>
        <div class="btn-buy f-bold">去结算</div>
    </div>

</div>

<script data-main="/resources/js/main.js" src="/resources/components/requirejs/require.js"></script>
<script>
$(function(){
	alert($(".btn-buy"));
	$(".btn-buy").click(function(){
		alert("xx");
		$("#orderForm").submit();
	});
	
});

</script>
</body>
</html>