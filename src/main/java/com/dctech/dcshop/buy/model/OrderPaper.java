package com.dctech.dcshop.buy.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dctech.dctest.paper.model.Paper;


@Entity
public class OrderPaper {
	
	Long orderPaperId;
	Paper paper;
	Date expireDate;
	boolean isExpired;
	
	@Id
	@GeneratedValue
	public Long getOrderPaperId() {
		return orderPaperId;
	}
	public void setOrderPaperId(Long orderPaperId) {
		this.orderPaperId = orderPaperId;
	}
	
	@ManyToOne
	@JoinColumn(name="paperId")
	public Paper getPaper() {
		return paper;
	}
	public void setPaper(Paper paper) {
		this.paper = paper;
	}
	public Date getExpireDate() {
		return expireDate;
	}
	public void setExpireDate(Date expireDate) {
		this.expireDate = expireDate;
	}
	public boolean isExpired() {
		return isExpired;
	}
	public void setExpired(boolean isExpired) {
		this.isExpired = isExpired;
	}
	
	
	
}
