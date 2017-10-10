package com.tenpay.entitys;

import java.io.IOException;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class UnifiedOrder {

	String appid;
	String mch_id;
	String nonce_str;
	String sign;
	String body;
	String out_trade_no;
	String total_fee;
	String notify_url;
	String trade_type;
	String openid;
	
	
	
	String detail;



	public String getAppid() {
		return appid;
	}



	public void setAppid(String appid) {
		this.appid = appid;
	}



	public String getMch_id() {
		return mch_id;
	}



	public void setMch_id(String mch_id) {
		this.mch_id = mch_id;
	}



	public String getNonce_str() {
		return nonce_str;
	}



	public void setNonce_str(String nonce_str) {
		this.nonce_str = nonce_str;
	}



	public String getSign() {
		return sign;
	}



	public void setSign(String sign) {
		this.sign = sign;
	}



	public String getBody() {
		return body;
	}



	public void setBody(String body) {
		this.body = body;
	}



	public String getOut_trade_no() {
		return out_trade_no;
	}



	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}



	public String getTotal_fee() {
		return total_fee;
	}



	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
	}



	public String getNotify_url() {
		return notify_url;
	}



	public void setNotify_url(String notify_url) {
		this.notify_url = notify_url;
	}



	public String getTrade_type() {
		return trade_type;
	}



	public void setTrade_type(String trade_type) {
		this.trade_type = trade_type;
	}



	public String getDetail() {
		return detail;
	}



	public void setDetail(String detail) {
		this.detail = detail;
	}
	
	
	public String getOpenid() {
		return openid;
	}



	public void setOpenid(String openid) {
		this.openid = openid;
	}



	public String toXml(){
		
		StringBuilder sb = new StringBuilder();
		sb.append("<?xml version='1.0' encoding='UTF-8'?>");
		sb.append("<xml>");
		sb.append("<appid>").append(this.appid).append("</appid>");
		sb.append("<openid>").append(this.openid).append("</openid>");
		sb.append("<body>").append(this.body).append("</body>");
		sb.append("<mch_id>").append(this.mch_id).append("</mch_id>");
		sb.append("<nonce_str>").append(this.nonce_str).append("</nonce_str>");
		sb.append("<notify_url>").append(this.notify_url).append("</notify_url>");
		sb.append("<out_trade_no>").append(this.out_trade_no).append("</out_trade_no>");
		sb.append(" <total_fee>").append(this.total_fee).append("</total_fee>");
		sb.append(" <trade_type>").append(this.trade_type).append("</trade_type>");
		sb.append(" <sign>").append(this.sign).append("</sign>");
		sb.append("</xml>");
		
		/*
		String xmlString ="";
		StringReader sr = new StringReader(sb.toString());   
		  
		InputSource is = new InputSource(sr); 
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();   
		DocumentBuilder builder;
		try {
			builder = factory.newDocumentBuilder();
			Document doc = builder.parse(is);
			xmlString = doc.toString();
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SAXException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return xmlString;*/
		return sb.toString();
		
	}
	
	
}
