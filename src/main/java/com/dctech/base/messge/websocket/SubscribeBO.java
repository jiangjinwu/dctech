package com.dctech.base.messge.websocket;

import com.alibaba.fastjson.annotation.JSONField;

public class SubscribeBO {
	 @JSONField(name="statisticsId")
	    private String subscribeId;
	    @JSONField(name="statisticsTypeId")
	    private String subscribeTypeId;
	    @JSONField(name="statisticsData")
	    private String subscribeData;
	    @JSONField(name="statisticsValue")
	    private String subscribeValue;


	    public SubscribeBO() {
	    }

	    public SubscribeBO(String subscribeTypeId, String subscribeData) {
	        this.subscribeTypeId = subscribeTypeId;
	        this.subscribeData = subscribeData;
	    }

	    public SubscribeBO(String subscribeId, String subscribeTypeId, String subscribeData) {
	        this.subscribeId = subscribeId;
	        this.subscribeTypeId = subscribeTypeId;
	        this.subscribeData = subscribeData;
	    }

	    public String getSubscribeId() {
	        return subscribeId;
	    }

	    public void setSubscribeId(String subscribeId) {
	        this.subscribeId = subscribeId;
	    }

	    public String getSubscribeTypeId() {
	        return subscribeTypeId;
	    }

	    public void setSubscribeTypeId(String subscribeTypeId) {
	        this.subscribeTypeId = subscribeTypeId;
	    }

	    public String getSubscribeData() {
	        return subscribeData;
	    }

	    public void setSubscribeData(String subscribeData) {
	        this.subscribeData = subscribeData;
	    }

	    public String getSubscribeValue() {
	        return subscribeValue;
	    }

	    public void setSubscribeValue(String subscribeValue) {
	        this.subscribeValue = subscribeValue;
	    }

	    @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;

	        SubscribeBO bo = (SubscribeBO) o;

	        if (!subscribeTypeId.equals(bo.subscribeTypeId)) return false;
	        return subscribeData != null ? subscribeData.equals(bo.subscribeData) : bo.subscribeData == null;

	    }

	    @Override
	    public int hashCode() {
	        int result = subscribeTypeId.hashCode();
	        result = 31 * result + (subscribeData != null ? subscribeData.hashCode() : 0);
	        return result;
	    }
}
