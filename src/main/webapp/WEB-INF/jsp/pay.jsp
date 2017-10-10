<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
</head>
<body>


${params}

wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '${params.appId}', // 必填，公众号的唯一标识
    timestamp:'${params.timeStamp}' , // 必填，生成签名的时间戳
    nonceStr: '${params.nonceStr}', // 必填，生成签名的随机串
    signature: '${params.jsSign}',// 必填，签名，见附录1
    jsApiList: ['getBrandWCPayRequest'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

<script>
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '${params.appId}', // 必填，公众号的唯一标识
    timestamp:'${params.timeStamp}' , // 必填，生成签名的时间戳
    nonceStr: '${params.nonceStr}', // 必填，生成签名的随机串
    signature: '${params.jsSign}',// 必填，签名，见附录1
    jsApiList: ['getBrandWCPayRequest'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
function pay(){
	wx.ready(function(){
		wx.chooseWXPay({
			 "appId":"${params.appId}",     //公众号名称，由商户传入     
	           "timeStamp":"${params.timeStamp}",         //时间戳，自1970年以来的秒数     
	           "nonceStr":"${params.nonceStr}", //随机串     
	           "package":"prepay_id=${params.prepay_id}",     
	           "signType":"MD5",         //微信签名方式：     
	           "paySign":"${params.paySign2}", //微信签名 
		    success: function (res) {
		        // 支付成功后的回调函数
		    },cencel:function(res){
				alert('cencel pay');
			},
			fail: function(res){
				alert('pay fail');
				alert(JSON.stringify(res));
			}
		});
	});
}
</script>


<input type="button" onclick="pay()" value="支付"></button>
</body>
</html>