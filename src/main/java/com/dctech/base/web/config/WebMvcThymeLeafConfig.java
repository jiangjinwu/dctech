/**
 * 
 */
package com.dctech.base.web.config;

import java.util.Properties;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.extras.springsecurity4.dialect.SpringSecurityDialect;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;

/**
 * @author Siva
 * 
 */
//@Configuration
//@ComponentScan(basePackages = { "com.dctech.base.web","com.dctech.*.*.controller"}) 
//@EnableWebMvc
public class WebMvcThymeLeafConfig extends WebMvcConfigurerAdapter
{

	@Override
	public void addViewControllers(ViewControllerRegistry registry)
	{
		super.addViewControllers(registry);
	}

/*	@Bean
	public ViewResolver resolver()
	{
		InternalResourceViewResolver url = new InternalResourceViewResolver();
		url.setPrefix("/WEB-INF/jsp/");
		url.setSuffix(".jsp");
		return url;
	}*/
	
	
	   @Bean // 配置生成模板解析器  
	    public ITemplateResolver templateResolver() {  
	        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();  
	        // ServletContextTemplateResolver需要一个ServletContext作为构造参数，可通过<span style="font-family: Arial, Helvetica, sans-serif;">WebApplicationContext 的方法获得</span>  
	        ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(  
	                webApplicationContext.getServletContext());  
	        templateResolver.setPrefix("/WEB-INF/thymeleaf/");  
	        templateResolver.setSuffix(".html");  
	        // templateResolver.setCharacterEncoding("UTF-8");  
	        // 设置模板模式,也可用字符串"HTML"代替,此处不建议使用HTML5,原因看下图源码  
	        templateResolver.setTemplateMode(TemplateMode.HTML);  
	        return templateResolver;  
	    }  

	    @Bean // 生成模板引擎并为模板引擎注入模板解析器  
	    public TemplateEngine templateEngine() {  
	        SpringTemplateEngine templateEngine = new SpringTemplateEngine();  
	        templateEngine.addDialect(new SpringSecurityDialect());
	        templateEngine.setTemplateResolver(templateResolver());  
	        return templateEngine;  
	    }  
	  
	/*    @Bean // 生成视图解析器并未解析器注入模板引擎  
	    public ViewResolver viewResolver(TemplateEngine templateEngine) {  
	        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();  
	        viewResolver.setContentType("text/html; charset=utf-8");  
	        viewResolver.setTemplateEngine(templateEngine);  
	        return viewResolver;  
	    }  
	    */
	    
	    @Bean
	    public ThymeleafViewResolver viewResolver(){
	        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
	        viewResolver.setTemplateEngine(templateEngine());
	        viewResolver.setOrder(1);
	        viewResolver.setViewNames(new String[]{"*.html",".htm","*"});
	        return viewResolver;
	    }
	   
	   
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry)
	{
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer)
	{
		configurer.enable();
	}
	
	 @Bean  
	    public LocaleResolver localeResolver()  
	  
	    {  
	        return new SessionLocaleResolver();  
	    }  
	  
	    /** 
	     * 拦截器：拦截请求的地址 
	     * @return 
	     */  
	    @Bean  
	    public LocaleChangeInterceptor localeChangeInterceptor()  
	    {  
	        LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();  
	        localeChangeInterceptor.setParamName("lang");  
	        return localeChangeInterceptor;  
	    }  

	@Bean(name = "messageSource")
	public MessageSource configureMessageSource()
	{
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:i18n/messages");
		messageSource.setCacheSeconds(5);
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
	}

	@Bean
	public SimpleMappingExceptionResolver simpleMappingExceptionResolver()
	{
		SimpleMappingExceptionResolver b = new SimpleMappingExceptionResolver();
		Properties mappings = new Properties();
		mappings.put("org.springframework.dao.DataAccessException", "error");
		b.setExceptionMappings(mappings);
		return b;
	}
}