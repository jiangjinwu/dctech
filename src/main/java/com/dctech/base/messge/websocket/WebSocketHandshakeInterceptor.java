package com.dctech.base.messge.websocket;

import java.net.InetSocketAddress;
import java.net.URI;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.dctech.base.constants.BaseConstants;
import com.dctech.base.model.User;
import com.dctech.base.utils.UserHolder;

public class WebSocketHandshakeInterceptor implements HandshakeInterceptor {
	private static Logger logger = LoggerFactory
            .getLogger(HandshakeInterceptor.class);

    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
            ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
        if (request instanceof ServletServerHttpRequest) {
//            ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
//            HttpSession session = servletRequest.getServletRequest()
//                    .getSession(true);
            // 保存session中已登录的用户到websocket的上下文环境中。在推送消息的时候，需要根据当前登录用户获取点位权限
            final User user = UserHolder.getCurrentUser();
            attributes.put(BaseConstants.SESSION_WEBSOCKET_LOGINED_USER, user);
            // if (session != null) {
            // // 使用userName区分WebSocketHandler，以便定向发送消息
            // String userName = (String) session
            // .getAttribute(Constants.SESSION_USERNAME);
            // if(userName==null){
            // userName = "qianshihua";
            // }
            // attributes.put(Constants.WEBSOCKET_USERNAME, userName);
            // }
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request,
            ServerHttpResponse response, WebSocketHandler wsHandler,
            Exception exception) {
        URI uri = request.getURI();
        InetSocketAddress remoteAddress = request.getRemoteAddress();
        String msg = "afterHandshake*******************\r\nuri:" + uri + ";\r\nremoteAddress;" + remoteAddress;
        System.err.println(msg);
        logger.debug(msg);

    }
}
