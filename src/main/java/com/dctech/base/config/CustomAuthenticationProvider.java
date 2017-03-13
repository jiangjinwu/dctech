package com.dctech.base.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
    @Override
    public Authentication authenticate(Authentication authentication) 
            throws AuthenticationException {
        CustomWebAuthenticationDetails details = (CustomWebAuthenticationDetails) authentication.getDetails();  // 如上面的介绍，这里通过authentication.getDetails()获取详细信息
        // System.out.println(details); details.getRemoteAddress(); details.getSessionId(); details.getToken();
        // 下面是验证逻辑，验证通过则返回UsernamePasswordAuthenticationToken，
        // 否则，可直接抛出错误（AuthenticationException的子类，在登录验证不通过重定向至登录页时可通过session.SPRING_SECURITY_LAST_EXCEPTION.message获取具体错误提示信息）
        //details.getVerifyCode()
        
       /* if (true) {
            return new UsernamePasswordAuthenticationToken("","");
        } */
        
        UserDetails userDetails = (UserDetails)customUserDetailsService.loadUserByUsername(authentication.getName());
 /*       try{*/
        UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(
                userDetails, authentication.getCredentials(),userDetails.getAuthorities());
        /*}catch(AuthenticationException  e){
        	unsuccessfulAuthentication();
        }
        */
        return result;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}
