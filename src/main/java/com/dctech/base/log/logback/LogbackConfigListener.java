package com.dctech.base.log.logback;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;


@WebListener
public class LogbackConfigListener implements ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent event) {
		LogbackWebConfigurer.initLogging(event.getServletContext());

	}

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		  LogbackWebConfigurer.shutdownLogging(event.getServletContext());

	}

}
