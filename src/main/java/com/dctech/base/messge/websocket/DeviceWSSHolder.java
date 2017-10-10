package com.dctech.base.messge.websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.socket.WebSocketSession;

public class DeviceWSSHolder implements BaseWSSHolder{
	private Map<SubscribeBO, List<WebSocketSession>> sessions;

    private DeviceWSSHolder() {
    }

    private static class SingletonHolder {
        public final static DeviceWSSHolder holder = new DeviceWSSHolder();
    }

    public static DeviceWSSHolder getInstance() {
        return SingletonHolder.holder;
    }

    /**
     * 保存统计ID和websocket会话的关系
     *
     * @param s
     * @param subscribeBO
     */
    @Override
    public void putSession(WebSocketSession s, SubscribeBO subscribeBO) {
        if (getInstance().sessions == null) {
            getInstance().sessions = new HashMap<SubscribeBO, List<WebSocketSession>>();
        }
        if (getInstance().sessions.get(subscribeBO) == null) {
            getInstance().sessions.put(subscribeBO,
                    new ArrayList<WebSocketSession>());
        }
        final List<WebSocketSession> list = getInstance().sessions.get(subscribeBO);
        list.add(s);
    }

    @Override
    public void removeReader(WebSocketSession reader, SubscribeBO subscribeBO) {
        if (getInstance().sessions != null && reader != null) {
            if (subscribeBO != null) {
                //移除该session的某个具体订阅
                List<WebSocketSession> readers = this.getSessionBySubscribe(subscribeBO);
                if (readers.size() > 0 && readers.contains(reader)) {
                    readers.remove(reader);
                }
            } else {
                //移除该session的所有订阅
                for (Map.Entry<SubscribeBO, List<WebSocketSession>> entry :
                        getInstance().sessions.entrySet()) {
                    List<WebSocketSession> readers = entry.getValue();
                    //确定有session订阅
                    if (readers.size() > 0 && readers.contains(reader)) {
                        readers.remove(reader);
                        break;
                    }
                }
            }
        }
    }

    /**
     * 根据统计ID获取websocket的会话信息
     *
     * @param subscribeBO
     * @return
     */
    @Override
    public List<WebSocketSession> getSessionBySubscribe(SubscribeBO subscribeBO) {
        if (getInstance().sessions == null) {
            getInstance().sessions = new HashMap<SubscribeBO, List<WebSocketSession>>();
        }
        if (getInstance().sessions.get(subscribeBO) == null) {
            getInstance().sessions.put(subscribeBO,
                    new ArrayList<WebSocketSession>());
        }
        return getInstance().sessions.get(subscribeBO);
    }

    /**
     * 获取所有有session订阅的业务ID
     * 业务ID带de前缀
     * @return
     */
    public List<String> getEffectDataIds() {
        List<String> ids = new ArrayList<String>();
        if (getInstance().sessions != null) {
            for (Map.Entry<SubscribeBO, List<WebSocketSession>> entry :
                    getInstance().sessions.entrySet()) {
                List<WebSocketSession> readers = entry.getValue();
                //确定有session订阅
                if (readers != null && readers.size() > 0) {
                    SubscribeBO bo = entry.getKey();
                    ids.add(bo.getSubscribeData());//真正的业务id
                }
            }
        }
        //String idsStr = Joiner.on(",").join(ids);
        return ids;
    }

    /**
     * 根据SubscribeBO获取一条订阅信息
     * @param condition
     * @return
     */
    public Map.Entry<SubscribeBO, List<WebSocketSession>> getItemBySubscribeBO(SubscribeBO condition) {
        if (getInstance().sessions != null && condition != null) {
            for (Map.Entry<SubscribeBO, List<WebSocketSession>> entry :
                    getInstance().sessions.entrySet()) {
                if (entry.getKey().equals(condition)) {
                    return entry;
                }
            }
        }
        return null;
    }

    /*public SubscribeBO getSubscribeByData(Long data) {
        Set<SubscribeBO> boSet = getInstance().sessions.keySet();
        for (SubscribeBO bo : boSet) {

            System.out.println(str);
        }

        List<Long> ids = Lists.newArrayList();
        if (getInstance().sessions != null) {
            for (Map.Entry<SubscribeBO, List<WebSocketSession>> entry :
                    getInstance().sessions.entrySet()) {
                List<WebSocketSession> readers = entry.getValue();
                //确定有session订阅
                if (readers != null && readers.size() > 0) {
                    SubscribeBO bo = entry.getKey();
                    ids.add(Long.parseLong(bo.getData()));//真正的业务id
                }
            }
        }
        //String idsStr = Joiner.on(",").join(ids);
        return ids;
    }*/
}
