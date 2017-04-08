<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@include file="taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="${rootURL}resources/jquery/jquery-1.10.2.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<title>Insert title here</title>
</head>
<body>


<script type="text/javascript">

wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '${sign}',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});


$(function(){
	onBridgeReady();
});

function onBridgeReady(){
	alert("ready");
	   WeixinJSBridge.invoke(
	       'getBrandWCPayRequest', {
	           "appId":"wx2421b1c4370ec43b",     //å¬ä¼å·åç§°ï¼ç±åæ·ä¼ å¥     
	           "timeStamp":"1395712654",         //æ¶é´æ³ï¼èª1970å¹´ä»¥æ¥çç§æ°     
	           "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //éæºä¸²     
	           "package":"prepay_id=u802345jgfjsdfgsdg888",     
	           "signType":"MD5",         //å¾®ä¿¡ç­¾åæ¹å¼ï¼     
	           "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //å¾®ä¿¡ç­¾å 
	       },
	       function(res){     
	           if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // ä½¿ç¨ä»¥ä¸æ¹å¼å¤æ­åç«¯è¿å,å¾®ä¿¡å¢éééæç¤ºï¼res.err_msgå°å¨ç¨æ·æ¯ä»æååè¿å    okï¼ä½å¹¶ä¸ä¿è¯å®ç»å¯¹å¯é ã 
	       }
	   ); 
	}
	if (typeof WeixinJSBridge == "undefined"){
	   if( document.addEventListener ){
	       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	   }else if (document.attachEvent){
	       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	   }
	}else{
	   onBridgeReady();
	}

</script>
</body>
</html>