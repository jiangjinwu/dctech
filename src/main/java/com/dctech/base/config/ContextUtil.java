package com.dctech.base.config;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class ContextUtil implements ApplicationContextAware{

	  private static ApplicationContext applicationContext = null;
	
	@Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		this.applicationContext = context;
		
	}
	
	public  Object getBean(String name){
		return applicationContext.getBean(name);
	}

}
