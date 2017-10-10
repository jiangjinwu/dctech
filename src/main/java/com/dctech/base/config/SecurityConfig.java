/**
 * 
 */
package com.dctech.base.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

/**
 * @author Siva
 *
 */
@Configuration
@EnableWebSecurity
////@EnableGlobalMethodSecurity(prePostEnabled = true) 
////@ImportResource("classpath:applicationContext-security.xml")
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
	@Autowired
    private AuthenticationProvider authenticationProvider; 
	
	
	@Autowired
    private AuthenticationDetailsSource<HttpServletRequest, WebAuthenticationDetails> authenticationDetailsSource;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Override
    protected void configure(AuthenticationManagerBuilder registry) throws Exception {
		/*
        registry
        .inMemoryAuthentication()
        .withUser("siva")  // #1
          .password("siva")
          .roles("USER")
          .and()
        .withUser("admin") // #2
          .password("admin")
          .roles("ADMIN","USER");
        */
        
       // registry.jdbcAuthentication().dataSource(dataSource);
		registry.userDetailsService(customUserDetailsService);
		registry.authenticationProvider(authenticationProvider);
    }


	  @Override
	  public void configure(WebSecurity web) throws Exception {
	    web
	      .ignoring()
	         .antMatchers("/resources/**")
	         .antMatchers("/common/*")
	         .antMatchers("/welcome**").antMatchers("/gettoken**"); // #3
	  }

	  @Override
	  protected void configure(HttpSecurity http) throws Exception {
	    http
	    .csrf().disable()
	    .authorizeRequests()
	        .antMatchers("/login","/login/form**","/register","/logout","/passport/main/api/*","/welcome**").permitAll() // #4
	       // .antMatchers("/admin","/admin/**").hasRole("ADMIN") // #6
	       // .anyRequest().authenticated() // 7
	        .and()
	    .formLogin()  // #8
	        .loginPage("/login/form.html") // #9
	        .loginProcessingUrl("/loginprocess")
	        .failureUrl("/login/form?error")
	        .authenticationDetailsSource(authenticationDetailsSource)
	        .permitAll(); // #5
	  }
}
