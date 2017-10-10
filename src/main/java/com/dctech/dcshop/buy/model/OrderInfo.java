package com.dctech.dcshop.buy.model;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dctech.base.model.AccountInfo;
import com.dctech.base.model.User;

@Entity
public class OrderInfo {

	Long orderId;
	Date postDate;
	User user;
	Integer orderStatus;
	Integer payStatus;
	Float payMoney;
	Float orderMoney;
	String orderSn;
	Float shipFee=0f;
	Float discountTotal=0f;
	
	/*Address address;*/
	
	@Id
	@GeneratedValue
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public Date getPostDate() {
		return postDate;
	}
	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}
	 
	
	@ManyToOne
	@JoinColumn(name="userId",referencedColumnName="id")
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Integer getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
	}
	public Integer getPayStatus() {
		return payStatus;
	}
	public void setPayStatus(Integer payStatus) {
		this.payStatus = payStatus;
	}
	public Float getPayMoney() {
		 return orderMoney-discountTotal+shipFee;
	}
	public void setPayMoney(Float payMoney) {
		this.payMoney = payMoney;
	}
	public Float getOrderMoney() {
		return orderMoney;
	}
	public void setOrderMoney(Float orderMoney) {
		this.orderMoney = orderMoney;
	}
	public String getOrderSn() {
		return orderSn;
	}
	public void setOrderSn(String orderSn) {
		this.orderSn = orderSn;
	}
	
	
	
	
	
	public Float getShipFee() {
		return shipFee;
	}
	public void setShipFee(Float shipFee) {
		this.shipFee = shipFee;
	}
	public Float getDiscountTotal() {
		return discountTotal;
	}
	public void setDiscountTotal(Float discountTotal) {
		this.discountTotal = discountTotal;
	}
	public String createOrderSn(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmssSSS");
		String date = sdf.format(new Date());
		this.setOrderSn(date);
		return date;
	}
	
	
	/*public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}*/
	
	
	
}
