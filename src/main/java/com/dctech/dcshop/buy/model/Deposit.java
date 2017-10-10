package com.dctech.dcshop.buy.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Deposit {

	@Id
	@GeneratedValue
	Long depositId;
	Long userId;
	public Long getDepositId() {
		return depositId;
	}
	public void setDepositId(Long depositId) {
		this.depositId = depositId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Float getMoney() {
		return money;
	}
	public void setMoney(Float money) {
		this.money = money;
	}
	public Float getMoneyBefore() {
		return moneyBefore;
	}
	public void setMoneyBefore(Float moneyBefore) {
		this.moneyBefore = moneyBefore;
	}
	public Float getMoneyAfter() {
		return moneyAfter;
	}
	public void setMoneyAfter(Float moneyAfter) {
		this.moneyAfter = moneyAfter;
	}
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}
	Float money;
	Float moneyBefore;
	Float moneyAfter;
	Date applyDate;
}
