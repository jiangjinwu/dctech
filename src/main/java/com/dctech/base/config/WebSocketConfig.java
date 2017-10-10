package com.dctech.base.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.dctech.base.messge.websocket.IndexConfigWebSocketHandler;
import com.dctech.base.messge.websocket.WebSocketHandshakeInterceptor;

public class WebSocketConfig implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		//registry.addHandler(systemWebSocketHandler(),"/point/webSocketServer.do").addInterceptors(new WebSocketHandshakeInterceptor())
//      .setAllowedOrigins("http://localhost:8087","http://10.16.38.21:8087","http://localhost:63342")
      ;

/*   registry.addHandler(systemWebSocketHandler(), "/point/sockjs/webSocketServer.do").addInterceptors(new WebSocketHandshakeInterceptor())
              .withSockJS();*/

      registry.addHandler(indexConfigWebSocketHandler(),"/app/indexConfig/indexConfigWebSocket.do").addInterceptors(new WebSocketHandshakeInterceptor());
		
	}

	/*@Bean
    public WebSocketHandler systemWebSocketHandler(){
        return new IbmsWebSocketHandler();
    }*/

    @Bean
    public WebSocketHandler indexConfigWebSocketHandler(){
        return new IndexConfigWebSocketHandler();
    }
	
}
