/**
 * 
 */
package com.dctech.base.web.controllers;

import java.io.IOException;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dctech.base.config.CustomAuthenticationProvider;
import com.dctech.base.model.User;
import com.dctech.base.services.UserService;
import com.dctech.base.web.config.SecurityUser;
import com.dctech.base.web.webEntities.JsonHolder;
import com.dctech.dctest.paper.model.Paper;
import com.dctech.dctest.paper.service.PaperService;
import com.tenpay.client.TenpayHttpClient;
import com.tenpay.util.ConstantUtil;
import com.tenpay.util.WXUtil;

/**
 * @author Siva
 *
 */
@Controller
public class UserController 
{
	
	Logger logger = LoggerFactory.getLogger(UserController.class);
	private static UserService userService;
	
	@Autowired
	PaperService paperService;
	
	  @Autowired
	    private CustomAuthenticationProvider myAuthenticationManager;
	
	@Autowired
	public void setUserService(UserService userService) {
		UserController.userService = userService;
	}
	
	public static User getCurrentUser()
	{
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    if (principal instanceof UserDetails) 
	    {
	    	String email = ((UserDetails) principal).getUsername();
	    	User loginUser = userService.findUserByEmail(email);
	    	return new SecurityUser(loginUser);
	    }

	    return null;
	}
	
	@RequestMapping("/login/form.html")
	public String loginform(){
		
		return "login";
	}
	
	@RequestMapping("/login")
	@ResponseBody
	public JsonHolder login(String username,String password,String picvcode,HttpServletRequest request){
		
		String serverpicCode ="";
		
			if(request.getSession().getAttribute("imagecode")!=null){
				serverpicCode=request.getSession().getAttribute("imagecode").toString();
			}
		    if(!picvcode.equalsIgnoreCase(serverpicCode)){
	            return new   JsonHolder("验证码错误！","1001").setSuccess(false).setMsg("验证码错误！");
	        } 
	        username = username.trim();
	        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
	        
	        StandardPasswordEncoder StandardPasswordEncoder = new StandardPasswordEncoder();
	        
	        User  user = userService.findUserByEmailOrPhone(username);
	        
	        
	        
	        /*
	        if(user ==null ||!StandardPasswordEncoder.matches(password,user.getPassword())){
	        	 return new JsonHolder().setSuccess(false).setMsg("");
	        }*/
	       
	            Authentication authentication = myAuthenticationManager.authenticate(authRequest); //调用loadUserByUsername
	            SecurityContextHolder.getContext().setAuthentication(authentication);
	            HttpSession session = request.getSession();
	            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext()); // 这个非常重要，否则验证后将无法登陆
	            session.setAttribute("UserInfo", user); // 这个非常重要，否则验证后将无法登陆
	            return new JsonHolder(true,"登陆成功");
	        
		
		
		 
	}
	
/*	@RequestMapping("/register")
	public String register(User user){
		userService.create(user);
		return "redirect:form/login";
	}
	*/
	
	@RequestMapping("/passport/main/api/register")
	public String register(User user){
		userService.create(user);
		return "redirect:form/login";
	}
	
	@RequestMapping("/passport/main/api/pwd_reset")
	@ResponseBody
	public JsonHolder pwdReset(User user){
		User dbUser =userService.findUserByEmailOrPhone(user.getPhone());
		
		if(null ==dbUser){
			return new JsonHolder(false,"不存在此用户");
		}else{
			StandardPasswordEncoder standardPasswordEncoder = new StandardPasswordEncoder();
			dbUser.setPassword(standardPasswordEncoder.encode(user.getPassword()));
			userService.update(dbUser);
		}
		
		return new JsonHolder(true,"密码重置成功！");
	}
	
	
	@RequestMapping("/welcome2")
	public String welcome(HttpServletRequest request, HttpServletResponse response,String code, Model model) throws IOException{
	
		
		return "welcome";
	}
	
	
	@RequestMapping("/welcome")
	public String home(HttpServletRequest request, HttpServletResponse response,String code, Model model) throws IOException{
		/*Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User loginUser=null;
	    if (principal instanceof UserDetails) 
	    {
	    	String email = ((UserDetails) principal).getUsername();
	    	  loginUser = userService.findUserByEmailOrPhone(email);
	    	
	    	model.addAttribute("currentUser", new SecurityUser(loginUser));
	    }*/
	    
	    
	   if(WXUtil.isWeiXin(request)){
	    	String wxCode ="";
	    	logger.info("request url:"+request.getRequestURL().toString());
	    	logger.info("code:"+code);
	    	if(!StringUtils.hasText(code)){
	    		logger.info("in code:"+request.getAttribute("code"));
				String redirect_uri= java.net.URLEncoder.encode("http://citymgr.nongrengongshe.com/gettoken", "utf-8");
				
				String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect" ;
				url = String.format(url, ConstantUtil.APP_ID,redirect_uri);
				  
				response.sendRedirect(url);
			}
	    	/*else{
				TenpayHttpClient client = new TenpayHttpClient();
				 
				String openId = client.getOpenId(code);
				HttpSession session = request.getSession();
	            session.setAttribute("openId", openId); 
	            model.addAttribute("openId",openId);
				if(loginUser!=null && StringUtils.isEmpty(loginUser.getOpenId())){
					loginUser.setOpenId(openId);
					userService.update(loginUser);
				}
			}*/
	   }
	   PageRequest pageRequest = new PageRequest(0, 10);
		
		Specification specification = new Specification<Paper> () {  
			@Override
			   public Predicate toPredicate(Root<Paper> root,  
			    CriteriaQuery<?> query, CriteriaBuilder cb) {  
			    Path<String> namePath = root.get("name");
			   
			   /* query.where(cb.like(namePath, "%111%"));*/ //杩欓噷鍙互璁剧疆浠绘剰鏉℃煡璇㈡潯浠�  
			     
			    return null;  
			   }
			  };
		
		List<Paper> paperList = paperService.getPageList(pageRequest,specification);
		model.addAttribute("paperList", paperList);
	    
		return "welcome";
	}
	
	@RequestMapping("/gettoken")
	public String getToken(HttpServletRequest request, HttpServletResponse response,String code,Model model){
		TenpayHttpClient client = new TenpayHttpClient();
		String openId = client.getOpenId(code);
		HttpSession session = request.getSession();
        session.setAttribute("openId", openId); 
		model.addAttribute("openId",openId);
		return "welcome";
	}
}

