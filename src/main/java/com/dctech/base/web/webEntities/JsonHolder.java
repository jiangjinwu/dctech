package com.dctech.base.web.webEntities;

import java.util.List;

public class JsonHolder {

	String msg;
	List datas;
	boolean success;
	String code;
	
	
	
	
	public JsonHolder(String msg, boolean success, String code) {
		super();
		this.msg = msg;
		this.success = success;
		this.code = code;
	}
	
	public JsonHolder( boolean success, String msg) {
		super();
		this.msg = msg;
		this.success = success;
	}
	
	public JsonHolder(String msg) {
		super();
		this.msg = msg;
	}
	
	public JsonHolder(String msg,String code) {
		super();
		this.msg = msg;
		this.code = code;
	}
	
	public JsonHolder() {
		super();
		this.msg = msg;
	}
	
	public String getMsg() {
		return msg;
	}
	public JsonHolder setMsg(String msg) {
		this.msg = msg;
		return this;
	}
	public List getDatas() {
		return datas;
	}
	public JsonHolder setDatas(List datas) {
		this.datas = datas;
		return this;
	}
	public boolean isSuccess() {
		return success;
	}
	public JsonHolder setSuccess(boolean success) {
		this.success = success;
		return this;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	
}
