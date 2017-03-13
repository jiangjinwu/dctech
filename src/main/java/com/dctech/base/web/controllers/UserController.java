/**
 * 
 */
package com.dctech.base.web.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dctech.base.config.CustomAuthenticationProvider;
import com.dctech.base.model.User;
import com.dctech.base.services.UserService;
import com.dctech.base.web.config.SecurityUser;
import com.dctech.base.web.webEntities.JsonHolder;

/**
 * @author Siva
 *
 */
@Controller
public class UserController 
{
	private static UserService userService;
	
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
	
	@RequestMapping("/login/form")
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
	        
	        if(user ==null ||!StandardPasswordEncoder.encode(password).equals(user.getPassword())){
	        	 return new JsonHolder().setSuccess(false).setMsg("");
	        }
	       
	            Authentication authentication = myAuthenticationManager.authenticate(authRequest); //调用loadUserByUsername
	            SecurityContextHolder.getContext().setAuthentication(authentication);
	            HttpSession session = request.getSession();
	            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext()); // 这个非常重要，否则验证后将无法登陆
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
	
	
	
	
	
	@RequestMapping("/welcome")
	public String home(Model model){
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    if (principal instanceof UserDetails) 
	    {
	    	String email = ((UserDetails) principal).getUsername();
	    	User loginUser = userService.findUserByEmailOrPhone(email);
	    	
	    	model.addAttribute("currentUser", new SecurityUser(loginUser));
	    }
		return "welcome";
	}
}

