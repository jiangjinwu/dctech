package com.dctech.dcshop.buy.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dctech.base.model.AccountInfo;
import com.dctech.base.model.User;
import com.dctech.dctest.paper.model.Paper;

@Entity
public class Cart {

	Long cartId;
	Goods goods;
	/*Long paperId;*/
	User user;
	Integer buyNum;

	
	@Id
	@GeneratedValue
	public Long getCartId() {
		return cartId;
	}
	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}
	
	/*public Long getPaperId() {
		return paperId;
	}
	public void setPaperId(Long paperId) {
		this.paperId = paperId;
	}*/
	@ManyToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name="goodsId",insertable=true,updatable=false)
	public Goods getGoods() {
		return goods;
	}
	public void setGoods(Goods paper) {
		this.goods = paper;
	}
	
	

	
	@ManyToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name="userId",insertable=true,updatable=false)
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public Integer getBuyNum() {
		return buyNum;
	}
	
	public void setBuyNum(Integer buyNum) {
		this.buyNum = buyNum;
	}
	
	
}
