package com.dctech.base.utils;

import org.springframework.security.core.context.SecurityContextHolder;

import com.dctech.base.model.User;

public class WebUtil {

	public static User getCurrentUser(){
		return (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}
}
