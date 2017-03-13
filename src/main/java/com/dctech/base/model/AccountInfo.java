package com.dctech.base.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;


@Entity
public class AccountInfo implements Serializable {

	Long accountId;
	String accountName;
	String unionId;
	String passWord;
	String phone;
	Date createDate;
	Integer accountType;
	boolean enable;
	private Collection<Role> roles;
	User userInfo;

	public AccountInfo() {
		 
	}

	
	@Id
	@GeneratedValue
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	public String getAccountName() {
		return accountName;
	}
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}
	public Integer getAccountType() {
		return accountType;
	}
	public void setAccountType(Integer accountType) {
		this.accountType = accountType;
	}
	
	
	
	public String getUnionId() {
		return unionId;
	}
	
	public void setUnionId(String unionId) {
		this.unionId = unionId;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	@ManyToOne
	@JoinColumn( name="user_id")
	public User getUser() {
		return userInfo;
	}
	public void setUser(User userInfo) {
		this.userInfo = userInfo;
	}


	public boolean isEnable() {
		return enable;
	}


	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	@ManyToMany
	@JoinTable( 
	        name = "accounts_roles", 
	        joinColumns = @JoinColumn(
	          name = "account_id"), 
	        inverseJoinColumns = @JoinColumn(
	          name = "role_id")) 
	public Collection<Role> getRoles() {
		return roles;
	}


	public void setRoles(Collection<Role> roles) {
		this.roles = roles;
	}
	 
	
	
	
	
}
