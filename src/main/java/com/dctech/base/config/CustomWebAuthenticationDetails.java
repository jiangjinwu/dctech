package com.dctech.base.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.authentication.WebAuthenticationDetails;

public class CustomWebAuthenticationDetails extends WebAuthenticationDetails {
    /**
     * 
     */
    private static final long serialVersionUID = 6975601077710753878L;
    private final String token;
    private final String verifyCode;

    public CustomWebAuthenticationDetails(HttpServletRequest request) {
        super(request);
        token = request.getParameter("token");
        verifyCode=request.getParameter("verifyCode");
    }

    public String getToken() {
        return token;
    }

    
    
    public String getVerifyCode() {
		return verifyCode;
	}

	@Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(super.toString()).append("; Token: ").append(this.getToken());
        return sb.toString();
    }
}
