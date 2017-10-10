package com.dctech.base.messge.websocket;

import java.util.List;

import org.springframework.web.socket.WebSocketSession;

public interface BaseWSSHolder {
	  public void putSession(WebSocketSession s, SubscribeBO subscribeBO);
	  public void removeReader(WebSocketSession reader, SubscribeBO subscribeBO);
	  public List<WebSocketSession> getSessionBySubscribe(SubscribeBO subscribeBO);
}
