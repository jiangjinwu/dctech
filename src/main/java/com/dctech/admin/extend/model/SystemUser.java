package com.dctech.admin.extend.model;



import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name="system_user_t")
public class SystemUser {

	int id;
	
	String user_id;
	int customerId;
	String account;
	String passWord;
	int isBind;
	int isLoginApp;
	int isvalid;
	int external_uid;
	Timestamp createtime;
	
	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	
	@Column(name="customer_id")
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	
	@Column(name="is_bind")
	public int getIsBind() {
		return isBind;
	}
	public void setIsBind(int isBind) {
		this.isBind = isBind;
	}
	
	@Column(name="is_login_app")
	public int getIsLoginApp() {
		return isLoginApp;
	}
	public void setIsLoginApp(int isLoginApp) {
		this.isLoginApp = isLoginApp;
	}
	public int getExternal_uid() {
		return external_uid;
	}
	public void setExternal_uid(int external_uid) {
		this.external_uid = external_uid;
	}
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}
	public int getIsvalid() {
		return isvalid;
	}
	public void setIsvalid(int isvalid) {
		this.isvalid = isvalid;
	}
	
	
	
}
