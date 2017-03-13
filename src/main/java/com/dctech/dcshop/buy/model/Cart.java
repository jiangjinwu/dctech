package com.dctech.dcshop.buy.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dctech.base.model.AccountInfo;
import com.dctech.dctest.paper.model.Paper;

@Entity
public class Cart {

	Long cartId;
	Paper paper;
	Long paperId;
	AccountInfo accountInfo;
	Integer buyNum;
	Long accountId;
	
	@Id
	@GeneratedValue
	public Long getCartId() {
		return cartId;
	}
	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}
	
	public Long getPaperId() {
		return paperId;
	}
	public void setPaperId(Long paperId) {
		this.paperId = paperId;
	}
	@ManyToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name="paperId",insertable=false,updatable=false)
	public Paper getPaper() {
		return paper;
	}
	public void setPaper(Paper paper) {
		this.paper = paper;
	}
	
	
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	
	@ManyToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name="accountId",insertable=false,updatable=false)
	public AccountInfo getAccountInfo() {
		return accountInfo;
	}
	public void setAccountInfo(AccountInfo accountInfo) {
		this.accountInfo = accountInfo;
	}
	
	public Integer getBuyNum() {
		return buyNum;
	}
	public void setBuyNum(Integer buyNum) {
		this.buyNum = buyNum;
	}
	
	
}
