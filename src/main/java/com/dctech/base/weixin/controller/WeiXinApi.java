package com.dctech.base.weixin.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/weixin/api")
public class WeiXinApi {
	
	
	
	@Autowired
	private Environment env;
	
	@Value("${weixin.appid}")
	String appId;
	
	Logger logger = LoggerFactory.getLogger(WeiXinApi.class);

	@RequestMapping("index.html")
	@ResponseBody
	public String index(String signature,String timestamp,String nonce,String echostr){
		
		return echostr;
	}
	
	@RequestMapping("bind")
	@ResponseBody
	public String bind(HttpServletRequest req, HttpServletResponse res) throws IOException{
		
		logger.debug(String.format("req.getServerName():%s", req.getServerName()));
		logger.debug(String.format("req.getServletPath():%s", req.getServletPath()));
		 
		 
		if(req.getAttribute("code")==null){
			String redirect_uri= java.net.URLEncoder.encode(req.getServerName()+"/weixin/api/bind", "utf-8");
			
			
			
			appId = env.getProperty("weixin.appid");
			
			
			String url = "https://open.weixin.qq.com/connect/qrconnect?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_login&state=123#wechat_redirect" ;
			url = String.format(url, appId,redirect_uri);
			  
			res.sendRedirect(url);
		} 
		
		return "";
	}
	
}
