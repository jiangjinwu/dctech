package com.dctech.base.web.controllers;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jdom.JDOMException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dctech.base.web.controllers.UserController;
import com.tenpay.util.XMLUtil;

@Controller
public class WeiXinNotify {

	@RequestMapping("/api/notify/weixin/payNotify")
	public void payNotify(HttpServletRequest request,HttpServletResponse response){
		Logger logger = LoggerFactory.getLogger("dctech.pay");
		String inputLine;
		String notityXml = "";
		String resXml = "";
		try {
			while ((inputLine = request.getReader().readLine()) != null) {
			notityXml += inputLine;
			}
			request.getReader().close();
			} catch (Exception e) {
			e.printStackTrace();
			}
		logger.info("notityXml:"+notityXml);
		
		Map xmlResult=new HashMap();
		try {
			xmlResult = XMLUtil.doXMLParse(notityXml);
		} catch (JDOMException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if("SUCCESS".equals(xmlResult.get("result_code"))){
			//支付成功
			resXml = "<xml>" + "<return_code><![CDATA[SUCCESS]]></return_code>"
			+ "<return_msg><![CDATA[OK]]></return_msg>" + "</xml> ";
			}else{
			resXml = "<xml>" + "<return_code><![CDATA[FAIL]]></return_code>"
			+ "<return_msg><![CDATA[报文为空]]></return_msg>" + "</xml> ";
			}
			 
		BufferedOutputStream out;
		try {
			out = new BufferedOutputStream(
					response.getOutputStream());
			out.write(resXml.getBytes());
			out.flush();
			out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
	}
	
}
