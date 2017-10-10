package com.tenpay.util;

import java.util.Random;

import javax.servlet.http.HttpServletRequest;

public class WXUtil {
	
	public static String getNonceStr() {
		Random random = new Random();
		return MD5Util.MD5Encode(String.valueOf(random.nextInt(10000)), "GBK");
	}

	public static String getTimeStamp() {
		return String.valueOf(System.currentTimeMillis() / 1000);
	}
	
	public static boolean isWeiXin(HttpServletRequest request){
		boolean isWeiXin= false;
		String ua = ((HttpServletRequest) request).getHeader("user-agent")  
		        .toLowerCase();  
		if (ua.indexOf("micromessenger") > 0) {// 是微信浏览器  
			isWeiXin = true;  
		}  
		
		return isWeiXin;
	}
	
}
