package com.dctech.base.web.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dctech.base.model.User;
import com.dctech.base.repositories.UserRepository;
import com.dctech.base.server.notice.NoticeServer;
import com.dctech.base.web.RandomValidateCode;

@Controller
@RequestMapping("/passport/main/api")
public class WebCommonController {
	@Autowired
	UserRepository userRepository;
	
	@Value("${sms-account:123}")
	private String account;
	
 
	@Autowired
	NoticeServer noticeServer;
	
	
	 @RequestMapping("/verifyCode")
	    @ResponseBody
	    public String getSysManageLoginCode(HttpServletResponse response,
	            HttpServletRequest request) {
	        response.setContentType("image/jpeg");// 设置相应类型,告诉浏览器输出的内容为图片
	        response.setHeader("Pragma", "No-cache");// 设置响应头信息，告诉浏览器不要缓存此内容
	        response.setHeader("Cache-Control", "no-cache");
	        response.setHeader("Set-Cookie", "name=value; HttpOnly");//设置HttpOnly属性,防止Xss攻击
	        response.setDateHeader("Expire", 0);
	        RandomValidateCode randomValidateCode = new RandomValidateCode();
	        try {
	            randomValidateCode.getRandcode(request, response,"imagecode");// 输出图片方法
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return "";
	    }
	 
	 @RequestMapping("mobileCheck")
	 @ResponseBody
	 public Map mobileCheck(String mobile){
		 
		 Map result = new HashMap();
		User user =  userRepository.findUserByPhone(mobile);
		
		if(null ==user){
			result.put("exists", false);
		}else{
			result.put("has_password", StringUtils.hasText(user.getPassword()));
			result.put("exists", true);
		}
		 
		 return result;
	 }
	 
	 
	 @RequestMapping("/notice")
	public String   notice(NoticeServer noticeServer,String userCode){
		 
		 String mobile_code = new String(((Math.random()*9+1)*100000)+"");
		noticeServer.process(userCode, mobile_code);
		return "";
	 }
	 
	 @RequestMapping("/sms")
	 @ResponseBody
		public String sms(String mobile,HttpServletRequest request){
		 String mobile_code = new String(((Math.random()*9+1)*100000)+"");
		  request.getSession().setAttribute("mobile_code", mobile_code);
			noticeServer.process(mobile, mobile_code);
			return "redirect:form/login";
		}
}
