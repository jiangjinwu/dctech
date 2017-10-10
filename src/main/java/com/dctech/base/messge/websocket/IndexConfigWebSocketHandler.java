package com.dctech.base.messge.websocket;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.dctech.base.constants.BaseConstants;
import com.dctech.base.messge.websocket.BaseWSSHolder;

public class IndexConfigWebSocketHandler implements WebSocketHandler{
	 private static final Logger logger = LoggerFactory.getLogger(IndexConfigWebSocketHandler.class);

	    @Override
	    public void afterConnectionEstablished(WebSocketSession webSocketSession) throws Exception {
	        logger.debug("indexconfig connect to the websocket success......");
	    }

	    /**
	     * 处理前端发起的订阅信息
	     * 订阅列表中的id包含fmt前缀
	     *
	     * @param session
	     * @param message
	     * @throws Exception
	     */
	    @Override
	    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
	        String jsontext = (String) message.getPayload();
	        logger.info("收到统计项订阅:::" + jsontext);
	        
	        Object objUser =  session.getHandshakeAttributes().get(BaseConstants.SESSION_WEBSOCKET_LOGINED_USER);
	        
	        /*Object objUser = session.getAttributes().get(
	                IBMSConstant.SESSION_WEBSOCKET_LOGINED_USER);*/
	        if (objUser == null) {
	            // 取不到session中的用户信息
	            throw new RuntimeException("会话中无用户信息");
	        }
	        JSONObject jsonObject = JSONObject.parseObject(jsontext);
	        Object optType = jsonObject.get("optType");//状态字段
	        String data = jsonObject.getString("data");//数据字段
	        //将数据字段解析成SubscribeBO列表
	        List<SubscribeBO> subscribeBOs = JSON.parseArray(data, SubscribeBO.class);
	        boolean ignoreSession = false;
	        if (subscribeBOs == null || subscribeBOs.size() == 0) {
	            if ("pausePush".equals(optType)) {
	                //如果data为空，并且optType==pausePush，关闭该session的所有推送
	                this.removeReader(session);
	            }
	            return;
	        }
	        if (optType != null && "hb".equals(optType)) {
	            //心跳
	            return;
	        }
	        if (optType != null && "pausePush".equals(optType)) {
	            //暂时关闭推送
	            ignoreSession = true;
	        }


	        for (int i = 0; i < subscribeBOs.size(); i++) {
	            SubscribeBO item = subscribeBOs.get(i);
	            String id = item.getSubscribeId();
	            String type = item.getSubscribeTypeId();
	            if (StringUtils.isEmpty(id) || StringUtils.isEmpty(type)) {
	                continue;
	            }
	            /*if(SubscribeType.WEATHER.getCode().equals(type)){
	                //如果是天气预报,构造唯一的天气订阅
	                item.setSubscribeData(JOBDATA_KEY_WEATHER);
	                item.setSubscribeId(JOBDATA_KEY_WEATHER);
	            }*/
	            //根据类型不同，选择不同的存储空间
	     BaseWSSHolder holder =this.getHolderByType(type);
	            //根据SubscribeBO获取已订阅的session列表
	            List<WebSocketSession> sessions = holder.getSessionBySubscribe(item);
	            boolean exists = false;
	            for (WebSocketSession wss : sessions) {
	                //将本次session与session列表进行比对，已存在则 exists = true;
	                if (wss.equals(session)) {
	                    exists = true;
	                }
	            }
	            String msg = "关注";
	            if (ignoreSession == true) {
	                msg = "取消关注";
	            }
	            logger.info("websocket会话：" + session + msg + "了："
	                    + /*SubscribeType.getDes(item.getSubscribeTypeId()) + "  " +*/ item.getSubscribeData());
	            //如果session列表中不存在本次session，则加入
	            if (exists == false && ignoreSession == false) {
	                holder.putSession(session, item);
	            }
	            if (exists == true && ignoreSession == true) {
	                //暂时关闭推送
	                sessions.remove(session);
	            }
	        }
	    }


	    @Override
	    public void handleTransportError(WebSocketSession webSocketSession, Throwable throwable) throws Exception {
	        if (webSocketSession.isOpen()) {
	            webSocketSession.close();
	        }
	        logger.debug("indexconfig websocket connection closed......");
	    }

	    @Override
	    public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus closeStatus) throws Exception {
	        logger.debug("indexconfig websocket connection closed......");
	    }

	    @Override
	    public boolean supportsPartialMessages() {
	        return false;
	    }

	    /**
	     * 根据类型获取session holder
	     *
	     * @param type
	     * @return
	     * @throws Exception
	     */
	    private BaseWSSHolder getHolderByType(String type) throws Exception {
	       /* SubscribeType subscribeType = SubscribeType.getByCode(type);*/
	        BaseWSSHolder holder = DeviceWSSHolder.getInstance();
	      /* if (subscribeType == null) {
	            throw new Exception("数据传入错误");
	        }
	        switch (subscribeType) {
	            case :
	                //设备数量
	                holder = DeviceWSSHolder.getInstance();
	                break;
	            
	        }
	        if (holder == null) {
	            logger.error("不存在对应的存储：" + type);
	            throw new Exception("不存在对应的存储：" + type);
	        }*/
	        return holder;
	    }

	    private void removeReader(WebSocketSession session) {
	      /*  AlarmDeviceWSSHolder.getInstance().removeReader(session, null);*/
	        DeviceWSSHolder.getInstance().removeReader(session, null);
	       /* PointWSSHolder.getInstance().removeReader(session, null);
	        StateDeviceWSSHolder.getInstance().removeReader(session, null);
	        WeatherWSSHolder.getInstance().removeReader(session, null);*/
	    }
}
